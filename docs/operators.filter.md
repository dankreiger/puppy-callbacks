<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@dankreiger/operators](./operators.md) &gt; [filter](./operators.filter.md)

## filter variable

<b>Signature:</b>

```typescript
filter: <T>(predicate: (arg: T) => boolean) => (broadcaster: IBroadcaster<T | typeof DONE>) => (listener: VoidCallback<T | typeof DONE>) => Unsubscribe
```
