import type { Unsubscribe } from '../types/types';
import type { IBroadcaster } from '../types/interfaces';
import { DONE } from '../symbols/done';

/**
 * Accepts two broadcasters and values grouped in an array
 */
export function zip<T = unknown, U = unknown>(
  broadcaster1: IBroadcaster<T>,
  broadcaster2: IBroadcaster<U>
): IBroadcaster<(T | U | typeof DONE | undefined)[] | undefined> {
  return (listener) => {
    let cancelBoth: Unsubscribe = () => void 0;
    const buffer1: (T | typeof DONE)[] = [];
    const cancel1 = broadcaster1((value: T | typeof DONE) => {
      buffer1.push(value);
      if (buffer2.length) {
        listener([buffer1.shift(), buffer2.shift()]);

        if (buffer1[0] === DONE || buffer2[0] === DONE) {
          cancelBoth();
        }
      }
    });

    const buffer2: (U | typeof DONE)[] = [];
    const cancel2 = broadcaster2((value) => {
      buffer2.push(value);
      if (buffer1.length) {
        listener([buffer1.shift(), buffer2.shift()]);

        if (buffer1[0] === DONE || buffer2[0] === DONE) {
          cancelBoth();
        }
      }
    });

    cancelBoth = () => {
      cancel1();
      cancel2();
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cancelBoth;
  };
}
