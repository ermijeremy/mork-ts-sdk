// Base request implementation to handle common defaults
export class BaseRequest {
    timeout() {
        return 20000; // 20 seconds
    }
    body() {
        return null;
    }
}
//# sourceMappingURL=Request.js.map