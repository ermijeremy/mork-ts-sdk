export class MorkApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || (typeof process !== "undefined" ? process.env.METTA_KG_MORK_URL : undefined) || "/mork";
    }
    static new(baseUrl) {
        return new MorkApiClient(baseUrl);
    }
    async dispatch(request) {
        const url = `${this.baseUrl}${request.path()}`;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), request.timeout());
        const init = {
            method: request.method(),
            signal: controller.signal,
        };
        const body = request.body();
        if ((request.path().startsWith("/upload/") || request.path() === "/transform")) {
            if (typeof body === 'string') {
                init.headers = { "Content-Type": "text/plain" };
                init.body = body;
            }
        }
        else if (body !== null) {
            init.headers = { "Content-Type": "application/json" };
            init.body = JSON.stringify(body);
        }
        try {
            // console.log(`Sending request to Mork API: ${init.method} ${url}`);                              
            const response = await fetch(url, init);
            clearTimeout(id);
            if (!response.ok) {
                console.error(`Error sending request to Mork API: ${response.statusText}`);
                throw new Error(`Status: ${response.status}`);
            }
            return await response.text();
        }
        catch (e) {
            clearTimeout(id);
            console.error(`Error sending request to Mork API: ${e}`);
            throw e;
        }
    }
}
//# sourceMappingURL=client.js.map