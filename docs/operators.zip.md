<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@dankreiger/operators](./operators.md) &gt; [zip](./operators.zip.md)

## zip() function

Accepts two broadcasters and values grouped in an array

<b>Signature:</b>

```typescript
export declare function zip<T = unknown, U = unknown>(broadcaster1: IBroadcaster<T>, broadcaster2: IBroadcaster<U>): IBroadcaster<(T | U | typeof DONE | undefined)[] | undefined>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  broadcaster1 | [IBroadcaster](./operators.ibroadcaster.md)<!-- -->&lt;T&gt; |  |
|  broadcaster2 | [IBroadcaster](./operators.ibroadcaster.md)<!-- -->&lt;U&gt; |  |

<b>Returns:</b>

[IBroadcaster](./operators.ibroadcaster.md)<!-- -->&lt;(T \| U \| typeof [DONE](./operators.done.md) \| undefined)\[\] \| undefined&gt;

