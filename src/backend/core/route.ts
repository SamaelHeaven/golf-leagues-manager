import { Application } from "@backend/core/application";
import { Container } from "@backend/core/container";
import { Controller } from "@backend/core/controller";
import { HTTPMethod } from "@backend/core/http-method";

export type Route = {
    method: HTTPMethod | "*";
    path: string;
    key: string;
    callback: () => void | Promise<void>;
    metadata: any;
};

export function route<T extends Controller>(method: HTTPMethod | "*", path: string = "") {
    return function (target: T, key: string, _descriptor: PropertyDescriptor) {
        Application.addRoute({
            method,
            path,
            key,
            metadata: target,
            callback() {
                const controller = Container.get((target as any).constructor) as any;
                return controller[key]();
            }
        });
    };
}
