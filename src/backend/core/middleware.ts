import { Application } from "@backend/core/application";
import { Controller } from "@backend/core/controller";

export type Middleware = {
    callback: (next: Function) => any;
    key: string;
    metadata: any;
};

export function middleware<T extends Controller>(middleware: (next: Function) => any) {
    return function (target: T, key: string, _descriptor: PropertyDescriptor) {
        Application.addMiddleware({
            callback: middleware,
            key,
            metadata: target
        });
    };
}
