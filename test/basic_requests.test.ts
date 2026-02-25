import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ClearRequest } from '../src/requests/ClearRequest.js';
import { ExploreRequest } from '../src/requests/ExploreRequest.js';
import { ExportRequest } from '../src/requests/ExportRequest.js';
import { ImportRequest } from '../src/requests/ImportRequest.js';
import { UploadRequest } from '../src/requests/UploadRequest.js';

describe('Standard Requests', () => {

    describe('ClearRequest', () => {
        it('should create new ClearRequest with defaults', () => {
            const req = ClearRequest.new();
            assert.strictEqual(req.method(), 'GET');
        });
        
        it('should set namespace and expr (if methods exist)', () => {
            const req = ClearRequest.new().namespace('test').expr('something');
            assert.deepStrictEqual(req.namespaceObj.path, ['test']);
            assert.strictEqual(req.exprVal, 'something');
        });
    });

    describe('ExploreRequest', () => {
        it('should set namespace and pattern', () => {
            const req = ExploreRequest.new()
                .namespace('my/space')
                .pattern('($x)');
            
            assert.strictEqual(req.patternVal, '($x)');
            assert.deepStrictEqual(req.namespaceObj.path, ['my', 'space']);
        });
    });

    describe('ExportRequest', () => {
        it('should set fields correctly', () => {
            const req = ExportRequest.new()
                .namespace('ns')
                .pattern('pat');
            req.templateVal = 'tem';
            
            assert.strictEqual(req.patternVal, 'pat');
            assert.strictEqual(req.templateVal, 'tem');
        });
    });

    describe('ImportRequest', () => {
        it('should set fields', () => {
            const req = ImportRequest.new().namespace('ns');
            assert.deepStrictEqual(req.namespaceObj.path, ['ns']);
        });
    });

    describe('UploadRequest', () => {
        it('should set fields', () => {
            const req = UploadRequest.new()
                .namespace('ns')
                .pattern('pat');
            req.templateVal = 'temp';
            req.dataVal = 'data';

            assert.strictEqual(req.patternVal, 'pat');
            assert.strictEqual(req.templateVal, 'temp');
            assert.strictEqual(req.dataVal, 'data');
        });
    });
});
