[@ai16z/eliza v0.1.4-alpha.3](../index.md) / generateObjectV2

# Function: generateObjectV2()

> **generateObjectV2**(`options`): `Promise`\<`GenerateObjectResult`\<`unknown`\>\>

Generates structured objects from a prompt using specified AI models and configuration options.

## Parameters

• **options**: [`GenerationOptions`](../interfaces/GenerationOptions.md)

Configuration options for generating objects.

## Returns

`Promise`\<`GenerateObjectResult`\<`unknown`\>\>

- A promise that resolves to an array of generated objects.

## Throws

- Throws an error if the provider is unsupported or if generation fails.

## Defined in

[packages/core/src/generation.ts:1071](https://github.com/caevilization/cvl-cuckoo-eliza/blob/main/packages/core/src/generation.ts#L1071)