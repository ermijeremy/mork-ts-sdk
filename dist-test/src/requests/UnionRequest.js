import { TransformRequest } from "./TransformRequest.js";
import { Namespace } from "../models/Namespace.js";
import { StatusRequest } from "./StatusRequest.js";
export class UnionRequest {
    constructor(input) {
        this.input = input;
    }
    static new(input) {
        return new UnionRequest(input);
    }
    async execute(client) {
        if (this.input.target.length !== 1) {
            throw new Error("Union requires exactly 1 target namespace.");
        }
        const requestPath = this.input.target[0];
        for (const sourceNs of this.input.source) {
            const patternNs = Namespace.fromPathString(sourceNs);
            const targetNs = Namespace.fromPathString(requestPath);
            const pattern = patternNs.withNamespace("$x");
            const template = targetNs.withNamespace("$x");
            const transformCodeStr = `(transform (, ${pattern}) (, ${template}))`;
            const helperRequest = new (class extends TransformRequest {
                transformCode() {
                    return transformCodeStr;
                }
            })();
            await client.dispatch(helperRequest);
            // Poll status endpoint
            await this.poll(requestPath, client);
        }
        return true;
    }
    async poll(path, client) {
        const startTime = Date.now();
        const timeoutDuration = 40000; // 40 seconds
        const checkRequest = StatusRequest.new()
            .namespace(path)
            .pattern("$x");
        while (true) {
            if (Date.now() - startTime > timeoutDuration) {
                throw new Error("Request Timeout");
            }
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const result = await client.dispatch(checkRequest);
                const statusResponse = JSON.parse(result);
                if (statusResponse.status === "pathClear") {
                    break;
                }
            }
            catch (e) { }
        }
        return true;
    }
}
//# sourceMappingURL=UnionRequest.js.map