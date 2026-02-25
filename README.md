# MORK TypeScript SDK

TypeScript client SDK for the MORK (Metta KG) HTTP API. Ships typed request builders and a small HTTP client so you can transform, import, export, and explore graph data from Node.js or browser environments with native `fetch`.

## Requirements
- Node.js 18+ (uses the built-in `fetch` and `AbortController`)
- MORK base URL from `METTA_KG_MORK_URL` or pass it directly to the client constructor

## Install

```bash
npm install mork-ts-sdk
```

## Quick start

```ts
import {
	MorkApiClient,
	Namespace,
	TransformDetails,
	TransformRequest,
	UploadRequest,
	ExportFormat,
	ExportRequest,
} from "mork-ts-sdk";

const client = MorkApiClient.new();

// Build a transform request
const transform = TransformRequest.new()
	.namespace("team/graph")
	.transformDetails(
		TransformDetails.new()
			.withPatterns(["(Person $x)"])
			.withTemplates(["(Employee $x)"])
	);

// Dispatch to the MORK API (returns raw response text)
const transformResult = await client.dispatch(transform);

// Upload data
const upload = UploadRequest.new()
	.namespace("team/graph")
	.pattern("(Person $name $role)")
	.template("(Employee $name $role)")
	.data("(Person Alice Engineer)");
await client.dispatch(upload);

// Export data in JSON
const exportReq = ExportRequest.new()
	.namespace("team/graph")
	.pattern("(Employee $name $role)")
	.template("(Employee $name $role)")
	.format(ExportFormat.Json);
const json = await client.dispatch(exportReq);
```

## Request builders
- `TransformRequest`: construct `(transform ...)` payloads.
- `ImportRequest`: import from a URI using a template.
- `ReadRequest`: export a single pattern/template pair.
- `ExploreRequest`: explore from a pattern and token.
- `UploadRequest`: upload raw text to a pattern/template.
- `ExportRequest`: export with optional format and `max_write`.
- `ClearRequest`: clear facts matching an expression.

See [src/index.ts](src/index.ts) for the complete surface area and defaults (e.g., 20s timeout on requests).
