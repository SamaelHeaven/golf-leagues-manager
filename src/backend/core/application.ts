import { ROOT_METADATA } from "@backend/core/controller";
import { HTTP_METHODS, HTTPMethod } from "@backend/core/http-method";
import { Middleware } from "@backend/core/middleware";
import { normalizeURL } from "@backend/core/normalize-url";
import { Route } from "@backend/core/route";
import { AsyncLocalStorage } from "async_hooks";
import compression from "compression";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import * as fs from "node:fs";
import * as https from "node:https";
import "reflect-metadata";

dotenv.config();

type Storage = {
    request: express.Request;
};

export class Application {
    public static readonly host = process.env.HOST || "localhost";
    public static readonly port = Number(process.env.EXPRESS_PORT);
    public static readonly externalPort = Number(process.env.EXTERNAL_WEB_PORT);

    private static readonly express: Express = express();
    private static readonly storage = new AsyncLocalStorage();
    private static readonly routes: Route[] = [];
    private static readonly middlewares: Middleware[] = [];
    private static readonly databaseUrl = `mongodb://${process.env.DATABASE_CONTAINER}:${process.env.MONGO_PORT}/database`;
    private static readonly serverOptions = {
        cert: fs.readFileSync(process.env.CERTIFICATE_CRT_PATH!),
        key: fs.readFileSync(process.env.CERTIFICATE_KEY_PATH!)
    };
    private static readonly cspPolicy = {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'"],
            fontSrc: ["'self'"],
            connectSrc: ["*"],
            frameAncestors: ["'none'"],
            objectSrc: ["'none'"],
            baseUri: ["'none'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: []
        }
    };

    private constructor() {}

    public static get request(): express.Request {
        return this.store.request;
    }

    public static get response(): express.Response {
        return this.store.request.res!;
    }

    private static get store(): Storage {
        return this.storage.getStore() as Storage;
    }

    public static launch(callback?: () => void) {
        this.express.use(morgan("combined"));
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(helmet.contentSecurityPolicy(this.cspPolicy));
        this.express.use((req, res, next) => this.normalizeRequest(req, res, next));
        this.express.use(express.static("public"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use((req, res, next) => this.middleware(req, res, next));
        this.addRoutes();
        mongoose
            .connect(this.databaseUrl)
            .then(() =>
                https.createServer(this.serverOptions, this.express).listen(this.port, callback)
            );
    }

    public static addRoute(route: Route) {
        this.routes.push(route);
    }

    public static addMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    private static async middleware(
        req: express.Request,
        _res: express.Response,
        next: () => void | Promise<void>
    ) {
        return this.storage.run(
            {
                request: req
            },
            next
        );
    }

    private static normalizeRequest(
        req: express.Request,
        res: express.Response,
        next: () => void | Promise<void>
    ) {
        const normalizedUrl = normalizeURL(req.url);
        if (req.url !== normalizedUrl) {
            res.redirect(307, normalizedUrl);
            return;
        }
        if (req.path === "/favicon.ico") {
            req.url = "/assets/favicons/favicon.ico";
        }
        return next();
    }

    private static addRoutes() {
        for (const route of this.routes) {
            const root = route.metadata ? Reflect.getMetadata(ROOT_METADATA, route.metadata) : null;
            for (const method of route.method === "*"
                ? (Object.keys(HTTP_METHODS) as HTTPMethod[])
                : [route.method]) {
                this.express[method](normalizeURL(`${root || ""}/${route.path}`), () => {
                    const middlewares = this.middlewares.filter(
                        m => m.metadata === route.metadata && m.key === route.key
                    );
                    const executeMiddleware = (index: number) => {
                        const next =
                            index === middlewares.length - 1
                                ? () => route.callback()
                                : () => executeMiddleware(index + 1);
                        middlewares[index].callback(next);
                        return;
                    };
                    middlewares.length ? executeMiddleware(0) : route.callback();
                });
            }
        }
        this.routes.splice(0, this.routes.length);
    }
}
