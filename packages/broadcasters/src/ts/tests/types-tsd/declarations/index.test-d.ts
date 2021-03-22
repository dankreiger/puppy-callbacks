import type { Broadcaster } from '.';
import { expectNotAssignable, expectAssignable } from 'tsd';

expectNotAssignable<Broadcaster<unknown, unknown>>(null);

expectNotAssignable<Broadcaster<typeof console.log, void>>(null);

expectAssignable<Broadcaster<(x: string) => void, void>>((listener) => {
  listener('dog');
});
