import { Application } from "@backend/core/application";
import { injectable, InjectionScope } from "@backend/core/injectable";
import express from "express";

export const ROOT_METADATA = "root";

export function controller<T extends new (...args: any[]) => Controller>(
    root: string = "",
    options?: {
        scope?: InjectionScope;
    }
) {
    return function (target: T) {
        Reflect.defineMetadata(ROOT_METADATA, root, target.prototype);
        injectable(options)(target as any);
    };
}

export abstract class Controller {
    protected readonly root: string;

    constructor() {
        this.root = Reflect.getMetadata(ROOT_METADATA, Object.getPrototypeOf(this));
        if (this.root === undefined) {
            throw new Error("Controllers should have the controller decorator");
        }
    }

    protected get request(): express.Request {
        return Application.request;
    }

    protected get response(): express.Response {
        return Application.response;
    }
}
