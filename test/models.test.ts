import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Namespace } from '../src/models/Namespace.js';
import { TransformDetails } from '../src/models/TransformDetails.js';
import { SetOperationInput } from '../src/models/SetOperationInput.js';

describe('Models', () => {
    describe('Namespace', () => {
        it('should create namespace from path string', () => {
            const ns = Namespace.fromPathString('folder/subfolder/file');
            assert.deepStrictEqual(ns.path, ['folder', 'subfolder', 'file']);
        });

        it('should return current name', () => {
            const ns = Namespace.fromPathString('a/b/c');
            assert.strictEqual(ns.currentName(), 'c');
        });

        it('should handle root namespace', () => {
            const ns = new Namespace([]);
            assert.strictEqual(ns.currentName(), 'root');
        });

        it('should generate data tag correctly', () => {
            const ns = Namespace.fromPathString('test');
            // updated to match Rust format (__name + data__)
            const pattern = /__testdata__/;
            assert.match(ns.dataTag(), pattern);
        });

        it('should format withNamespace correctly', () => {
            const ns = Namespace.fromPathString('test');
            const result = ns.withNamespace('value');
            // (__root__ (test (__testdata__ value)))
            assert.match(result, /^\(__root__ \(test \(__testdata__ value\)\)\)$/);
        });
    });

    describe('TransformDetails', () => {
        it('should initialize with defaults', () => {
            const details = new TransformDetails();
            assert.deepStrictEqual(details.patterns, ['$x']);
            assert.deepStrictEqual(details.templates, ['$x']);
        });

        it('should update patterns', () => {
            const details = new TransformDetails();
            details.withPatterns(['$a', '$b']);
            assert.deepStrictEqual(details.patterns, ['$a', '$b']);
        });

        it('should update templates', () => {
            const details = new TransformDetails();
            details.withTemplates(['$result']);
            assert.deepStrictEqual(details.templates, ['$result']);
        });
    });

    describe('SetOperationInput', () => {
        it('should create new instance', () => {
            const input = SetOperationInput.new(['src1', 'src2'], ['target']);
            assert.deepStrictEqual(input.source, ['src1', 'src2']);
            assert.deepStrictEqual(input.target, ['target']);
        });

        it('should update source', () => {
            const input = new SetOperationInput();
            input.withSource(['s1']);
            assert.deepStrictEqual(input.source, ['s1']);
        });

        it('should update target', () => {
            const input = new SetOperationInput();
            input.withTarget(['t1']);
            assert.deepStrictEqual(input.target, ['t1']);
        });
    });
});
