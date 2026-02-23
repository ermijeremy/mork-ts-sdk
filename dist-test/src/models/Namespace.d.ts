export declare class Namespace {
    path: string[];
    constructor(path?: string[]);
    static new(): Namespace;
    static fromPathString(pathStr: string): Namespace;
    currentName(): string;
    dataTag(): string;
    withNamespace(value: string): string;
}
//# sourceMappingURL=Namespace.d.ts.map