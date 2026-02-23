export interface Request<T = any> {
    method(): string;
    path(): string;
    body(): T | null;
    timeout(): number;
}
export declare abstract class BaseRequest<T = any> implements Request<T> {
    timeout(): number;
    abstract method(): string;
    abstract path(): string;
    body(): T | null;
}
//# sourceMappingURL=Request.d.ts.map