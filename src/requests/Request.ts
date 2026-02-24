// Interface for Request
export interface Request<T = any> {
    method(): string;
    path(): string;
    body(): T | null;
    timeout(): number; // milliseconds
}

// Base request implementation to handle common defaults
export abstract class BaseRequest<T = any> implements Request<T> {
    timeout(): number {
        return 20000; // 20 seconds
    }
    abstract method(): string;
    abstract path(): string;
    body(): T | null {
        return null;
    }
}
