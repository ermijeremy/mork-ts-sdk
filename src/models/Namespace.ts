export class Namespace {
    path: string[];

    constructor(path: string[] = []) {
        this.path = path;
    }

    static new(): Namespace {
        return new Namespace();
    }

    static fromPathString(pathStr: string): Namespace {
        const components = pathStr.split('/').filter(s => s.length > 0);
        return new Namespace(components);
    }

    currentName(): string {
        if (this.path.length === 0) {
            return "root";
        }
        return this.path[this.path.length - 1];
    }

    dataTag(): string {
        return `__${this.currentName()}data__`;
    }

    withNamespace(value: string): string {
        let result = value;
        result = `(${this.dataTag()} ${result})`;

        for (let i = this.path.length - 1; i >= 0; i--) {
            const name = this.path[i];
            result = `(${name} ${result})`;
        }

        return `(__root__ ${result})`;
    }
}
