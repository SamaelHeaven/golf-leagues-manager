import { ContainerBuilder, Container as DiodContainer, Identifier } from "diod";

export class Container {
    public static readonly builder = new ContainerBuilder();

    private static instance: DiodContainer | null = null;

    private constructor() {}

    public static get<T>(identifier: Identifier<T>): T {
        return (this.instance ??= this.builder.build()).get(identifier);
    }
}
