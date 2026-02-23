import { Request } from "./requests/Request.js";
export declare class MorkApiClient {
    baseUrl: string;
    constructor(baseUrl?: string);
    static new(baseUrl?: string): MorkApiClient;
    dispatch<T>(request: Request<T>): Promise<string>;
}
//# sourceMappingURL=client.d.ts.map