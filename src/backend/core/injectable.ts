import { Container } from "@backend/core/container";

export enum InjectionScope {
    Transient = "Transient",
    InstancePerRequest = "InstancePerRequest",
    Singleton = "Singleton"
}

export function injectable<
    T extends abstract new (...args: any[]) => T,
    I extends new (...args: any[]) => InstanceType<T>
>(options?: { scope?: InjectionScope; token?: T; factory?: () => InstanceType<I> }) {
    return (target: I) => {
        const scope = options?.scope || InjectionScope.Singleton;
        const token = options?.token || target;
        const factory = options?.factory;
        Container.builder
            .register(token)
            [`use${factory ? "Factory" : ""}`](factory || (target as any))
            [`as${scope}`]();
    };
}
