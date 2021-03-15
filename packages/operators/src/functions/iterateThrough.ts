import { VoidCallback, Unsubscribe } from '../ts/types';
import { DONE } from '../symbols/done';
import { PROGRESS } from '../symbols/progress';

export function iterateThrough<T = unknown>(iterable: Iterable<T>) {
  return function (listener: VoidCallback<T | typeof DONE>): Unsubscribe {
    const id = setTimeout(() => {
      const iterator = iterable[Symbol.iterator]();
      let nextValue = iterator.next();
      while (PROGRESS) {
        if (nextValue.done) {
          listener(DONE);
          return;
        }
        listener(nextValue.value);
        nextValue = iterator.next();
      }
    });
    return function () {
      clearTimeout(id);
    };
  };
}
