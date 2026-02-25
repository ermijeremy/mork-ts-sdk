export class Namespace {
    constructor(path = []) {
        this.path = path;
    }
    static new() {
        return new Namespace();
    }
    static fromPathString(pathStr) {
        const components = pathStr.split('/').filter(s => s.length > 0);
        return new Namespace(components);
    }
    currentName() {
        if (this.path.length === 0) {
            return "root";
        }
        return this.path[this.path.length - 1];
    }
    dataTag() {
        return `__${this.currentName()}data__`;
    }
    withNamespace(value) {
        let result = value;
        result = `(${this.dataTag()} ${result})`;
        for (let i = this.path.length - 1; i >= 0; i--) {
            const name = this.path[i];
            result = `(${name} ${result})`;
        }
        return `(__root__ ${result})`;
    }
}
//# sourceMappingURL=Namespace.js.map