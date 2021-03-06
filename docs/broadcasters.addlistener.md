<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@dankreiger/broadcasters](./broadcasters.md) &gt; [addListener](./broadcasters.addlistener.md)

## addListener() function

Adds event listener to a html element

<b>Signature:</b>

```typescript
export declare function addListener(selector: string, eventType: keyof HTMLElementEventMap): Broadcaster<EventListenerOrEventListenerObject>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  selector | string | string for querying a dom element (e.g. class, id) |
|  eventType | keyof HTMLElementEventMap |  |

<b>Returns:</b>

[Broadcaster](./broadcasters.broadcaster.md)<!-- -->&lt;EventListenerOrEventListenerObject&gt;

