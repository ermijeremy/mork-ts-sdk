import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CompositionRequest } from '../src/requests/CompositionRequest.js';
import { IntersectionRequest } from '../src/requests/IntersectionRequest.js';
import { SetOperationInput } from '../src/models/SetOperationInput.js';
import { Namespace } from '../src/models/Namespace.js';
function getUnionTransformCodes(input) {
    const codes = [];
    if (input.target.length !== 1)
        return codes;
    const requestPath = input.target[0];
    for (const sourceNs of input.source) {
        const patternNs = Namespace.fromPathString(sourceNs);
        const targetNs = Namespace.fromPathString(requestPath);
        const pattern = patternNs.withNamespace("$x");
        const template = targetNs.withNamespace("$x");
        codes.push(`(transform (, ${pattern}) (, ${template}))`);
    }
    return codes;
}
describe('Set Operation Tests', () => {
    // test_composition_transform
    it('test_composition_transform', () => {
        const input = SetOperationInput.new(["ns1", "ns2"], ["ns3"]);
        const req = CompositionRequest.create(input);
        const code = req.transformCode();
        // Check pattern 1
        assert.match(code, /\(__root__ \(ns1 \(__ns1data__ \$0\)\)\)/);
        // Check pattern 2
        assert.match(code, /\(__root__ \(ns2 \(__ns2data__ \$1\)\)\)/);
        // Check template
        assert.match(code, /\(transform \(\, \(__root__ \(ns1 \(__ns1data__ \$0\)\)\) \(__root__ \(ns2 \(__ns2data__ \$1\)\)\)\) \(\, \(__root__ \(ns3 \(__ns3data__ \$0 \$1\)\)\)\)\)/);
    });
    // test_intersection_transform
    it('test_intersection_transform', () => {
        const input = SetOperationInput.new(["ns1", "ns2"], ["ns3"]);
        const req = IntersectionRequest.create(input);
        const code = req.transformCode();
        assert.match(code, /\(transform \(\, \(__root__ \(ns1 \(__ns1data__ \$x\)\)\) \(__root__ \(ns2 \(__ns2data__ \$x\)\)\)\) \(\, \(__root__ \(ns3 \(__ns3data__ \$x\)\)\)\)\)/);
    });
    // test_union_transform
    it('test_union_transform', () => {
        const input = SetOperationInput.new(["ns1", "ns2"], ["ns3"]);
        const transformInputs = getUnionTransformCodes(input);
        assert.strictEqual(transformInputs.length, 2);
        const code1 = transformInputs[0];
        assert.match(code1, /\(transform \(\, \(__root__ \(ns1 \(__ns1data__ \$x\)\)\)\) \(\, \(__root__ \(ns3 \(__ns3data__ \$x\)\)\)\)\)/);
        const code2 = transformInputs[1];
        assert.match(code2, /\(transform \(\, \(__root__ \(ns2 \(__ns2data__ \$x\)\)\)\) \(\, \(__root__ \(ns3 \(__ns3data__ \$x\)\)\)\)\)/);
    });
});
//# sourceMappingURL=set_operations.test.js.map