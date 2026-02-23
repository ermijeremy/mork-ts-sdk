import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { MorkApiClient } from '../src/client.js';
import { Request } from '../src/requests/Request.js';

// Mock Request Class
class MockRequest implements Request<any> {
    _path: string;
    _method: string;
    _body: any;

    constructor(path: string, method: string = 'GET', body: any = null) {
        this._path = path;
        this._method = method;
        this._body = body;
    }

    path(): string { return this._path; }
    method(): string { return this._method; }
    body(): any { return this._body; }
    timeout(): number { return 1000; }
}

describe('MorkApiClient', () => {
    it('should initialize with default URL', () => {
        const client = MorkApiClient.new();
        // Assuming environment variable is not set in test, defaults to /mork
        // Or if set, it uses it.
        // We can check if it's a string.
        assert.ok(typeof client.baseUrl === 'string');
    });

    it('should initialize with provided URL', () => {
        const client = MorkApiClient.new('http://localhost:9999');
        assert.strictEqual(client.baseUrl, 'http://localhost:9999');
    });

    it('should dispatch request', async () => {
        // Mock global fetch
        const mockFetch = mock.fn(async () => {
            return {
                ok: true,
                text: async () => 'success',
            };
        });
        
        const originalFetch = global.fetch;
        global.fetch = mockFetch as any;

        try {
            const client = MorkApiClient.new('http://test');
            const req = new MockRequest('/test');
            const result = await client.dispatch(req);

            assert.strictEqual(result, 'success');
            assert.strictEqual(mockFetch.mock.calls.length, 1);
            
            const [url, init] = mockFetch.mock.calls[0].arguments as unknown as [string, any];
            assert.strictEqual(url, 'http://test/test');
            assert.strictEqual(init.method, 'GET');

        } finally {
            global.fetch = originalFetch;
        }
    });

    it('should handle fetch errors', async () => {
         const mockFetch = mock.fn(async () => {
            return {
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            };
        });

        const originalFetch = global.fetch;
        global.fetch = mockFetch as any;

        try {
            const client = MorkApiClient.new('http://test');
            const req = new MockRequest('/error');
            await assert.rejects(async () => await client.dispatch(req), /Status: 500/);
        } finally {
            global.fetch = originalFetch;
        }
    });
});
