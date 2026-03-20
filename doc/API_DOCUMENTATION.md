# Mork TS SDK API Documentation

The `mork-ts-sdk` provides a TypeScript interface for interacting with the Mork API. This documentation covers the client, models, and request objects available in the SDK.

## Table of Contents

- [Client](#client)
- [Models](#models)
  - [Namespace](#namespace)
  - [TransformDetails](#transformdetails)
  - [SetOperationInput](#setoperationinput)
  - [ExportFormat](#exportformat)
- [Requests](#requests)
  - [ReadRequest](#readrequest)
  - [TransformRequest](#transformrequest)
  - [ImportRequest](#importrequest)
  - [ExploreRequest](#explorerequest)
  - [UploadRequest](#uploadrequest)
  - [ExportRequest](#exportrequest)
  - [ClearRequest](#clearrequest)
  - [StatusRequest](#statusrequest)
  - [Set Operations](#set-operations) (Union, Intersection, Composition)

---

## Client

### `MorkApiClient`

The main entry point for interacting with the Mork API.

#### Initialization
```typescript
import { MorkApiClient } from 'mork-ts-sdk';

// Default initialization (looks for METTA_KG_MORK_URL env var or defaults to "/mork")
const client = new MorkApiClient();

// Initialize with a specific base URL
const clientCustom = MorkApiClient.new("http://localhost:8080");
```

#### Methods

- **`dispatch<T>(request: Request<T>): Promise<string>`**
  - Sends a constructed request object to the API.
  - **Returns**: A `Promise` that resolves to the raw response string (often JSON or text).

---

## Models

### `Namespace`

Helper class for managing namespace paths.

- **`static new(): Namespace`**: Create an empty namespace.
- **`static fromPathString(pathStr: string): Namespace`**: Create a namespace from a slash-separated string (e.g., `"root/sub"`).
- **`withNamespace(value: string): string`**: Wraps a given string value with the namespace hierarchy tags.

### `TransformDetails`

Helper for defining transformation patterns and templates.

- **`static new(): TransformDetails`**: Create a default instance.
- **`withPatterns(patterns: string[]): TransformDetails`**: Set the input matching patterns.
- **`withTemplates(templates: string[]): TransformDetails`**: Set the output templates.

### `SetOperationInput`

Input model for set operations like Union, Intersection, and Composition.

- **`static new(source: string[], target: string[]): SetOperationInput`**: Create a new input with source and target namespaces.
- **`withSource(source: string[])`**: Set source namespaces.
- **`withTarget(target: string[])`**: Set target namespaces.

### `ExportFormat`

Enum for valid export formats.
- `Metta`
- `Json`
- `Csv`
- `Raw`

---

## Requests

All request objects are typically instantiated using a static `new()` or `create()` method and configured using a fluent builder pattern before being passed to `client.dispatch()`.

### `ReadRequest`

Fetches data from the store.

- **`static new(): ReadRequest`**
- **`namespace(ns: string): ReadRequest`**: Set the target namespace.
- **`withTransformInput(inp: TransformDetails): ReadRequest`**: Define patterns/templates for reading specific data.

**Example:**
```typescript
const readReq = ReadRequest.new()
    .namespace("kb/users")
    .withTransformInput(TransformDetails.new().withPatterns(["$x"]).withTemplates(["$x"]));

const response = await client.dispatch(readReq);
```

### `TransformRequest`

Performs a general transformation on the knowledge graph.

- **`static new(): TransformRequest`**
- **`namespace(ns: string): TransformRequest`**: Set the namespace.
- **`transformDetails(inp: TransformDetails): TransformRequest`**: Set the transformation logic.

**Example:**
```typescript
const transformReq = TransformRequest.new()
    .namespace("kb/data")
    .transformDetails(TransformDetails.new()
        .withPatterns("($x is A)")
        .withTemplates("($x is B)")
    );

await client.dispatch(transformReq);
```

### `ImportRequest`

Triggers an import operation from an external URI.

- **`static new(): ImportRequest`**
- **`namespace(ns: string): ImportRequest`**
- **`withTransformInput(inp: TransformDetails): ImportRequest`**
- **`uri(uri: string): ImportRequest`**: The source URI to import from.

**Example:**
```typescript
const importReq = ImportRequest.new()
    .namespace("kb/imported")
    .uri("file://path/to/data.metta");

await client.dispatch(importReq);
```

### `ExploreRequest`

Explore the graph connectivity.

- **`static new(): ExploreRequest`**
- **`namespace(ns: string): ExploreRequest`**
- **`pattern(pattern: string): ExploreRequest`**: The pattern to explore from.
- **`token(token: string): ExploreRequest`**: Pagination or continuation token.

**Example:**
```typescript
const exploreReq = ExploreRequest.new()
    .namespace("kb/graph")
    .pattern("$x");

const result = await client.dispatch(exploreReq);
```

### `UploadRequest`

Upload raw data or patterns directly.

- **`static new(): UploadRequest`**
- **`namespace(ns: string): UploadRequest`**
- **`pattern(pattern: string): UploadRequest`**
- **`template(template: string): UploadRequest`**
- **`data(data: string): UploadRequest`**: The raw data string to upload.

**Example:**
```typescript
const uploadReq = UploadRequest.new()
    .namespace("kb/uploads")
    .pattern("$x")
    .template("$x")
    .data("(A B) (C D)");

await client.dispatch(uploadReq);
```

### `ExportRequest`

Export data in various formats.

- **`static new(): ExportRequest`**
- **`namespace(ns: string): ExportRequest`**
- **`pattern(pattern: string): ExportRequest`**
- **`template(template: string): ExportRequest`**
- **`format(format: ExportFormat): ExportRequest`**: Specify the output format.
- **`withMaxWrite(maxWrite: number): ExportRequest`**: Limit the write size.

**Example:**
```typescript
const exportReq = ExportRequest.new()
    .namespace("kb/data")
    .pattern("$x")
    .template("$x");

const result = await client.dispatch(exportReq);
```

### `ClearRequest`

Clears data matching an expression from a namespace.

- **`static new(): ClearRequest`**
- **`namespace(ns: string): ClearRequest`**
- **`expr(expr: string): ClearRequest`**: The expression pattern to clear.

**Example:**
```typescript
const clearReq = ClearRequest.new()
    .namespace("kb/temp")
    .expr("($x is match)");

await client.dispatch(clearReq);
```

### `StatusRequest`

Checks the status of a namespace or path.

- **`static new(): StatusRequest`**
- **`namespace(ns: string): StatusRequest`**
- **`pattern(pt: string): StatusRequest`**

**Example:**
```typescript
const statusReq = StatusRequest.new()
    .namespace("kb/jobs")
    .pattern("job_123");

const status = await client.dispatch(statusReq);
```

### Set Operations

These requests perform high-level set operations on namespaces.

#### `IntersectionRequest`
Calculates the intersection of multiple source namespaces into a target.

- **`static create(input: SetOperationInput): IntersectionRequest`**

**Example:**
```typescript
const intersectionReq = IntersectionRequest.create(
    SetOperationInput.new(["ns1", "ns2"], ["target_ns"])
);
await client.dispatch(intersectionReq);
```

#### `CompositionRequest`
Composes multiple source namespaces into a target.

- **`static create(input: SetOperationInput): CompositionRequest`**

**Example:**
```typescript
const compositionReq = CompositionRequest.create(
    SetOperationInput.new(["ns1", "ns2"], ["target_ns"])
);
await client.dispatch(compositionReq);
```

#### `UnionRequest`
Unites multiple source namespaces into a target. Note: This request has a custom `execute` method that handles polling internally.

- **`static new(input: SetOperationInput): UnionRequest`**
- **`execute(client: MorkApiClient): Promise<boolean>`**: Runs the union operation and polls for completion.

**Example:**
```typescript
const unionReq = UnionRequest.new(
    SetOperationInput.new(["ns1", "ns2"], ["target_ns"])
);
await unionReq.execute(client);
```

## Example Usage

```typescript
import { MorkApiClient, ReadRequest, Namespace, TransformDetails } from "mork-ts-sdk";

async function main() {
    const client = MorkApiClient.new("http://localhost:8080");

    // Create a read request
    const request = ReadRequest.new()
        .namespace("my/data")
        .withTransformInput(TransformDetails.new()
            .withPatterns("$x")
            .withTemplates("$x")
        ); 

    try {
        const response = await client.dispatch(request);
        console.log("Response:", response);
    } catch (error) {
        console.error("Failed to read:", error);
    }
}
```
