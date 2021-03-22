import type { Broadcaster } from '.';

const broadcaster1: Broadcaster<unknown, unknown> = null; // $ExpectError
console.log(broadcaster1);

const broadcaster2: Broadcaster<typeof console.log, void> = null; // $ExpectError
console.log(broadcaster2);

// $ExpectType (listener: (x: string) => void) => void
const broadcaster3: Broadcaster<(x: string) => void, void> = (listener) => {
  listener('dog');
};

console.log(broadcaster3); // $ExpectType void

// const broadcaster2: Broadcaster<typeof console.log, void> = null; // $ExpectError
