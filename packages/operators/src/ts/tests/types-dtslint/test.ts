import type { Unsubscribe } from '.';

const unsubcribe: Unsubscribe = null; // $ExpectError
console.log(unsubcribe);
