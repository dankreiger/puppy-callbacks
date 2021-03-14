import { VoidCallback, Unsubscribe } from '../types/types';
import { DONE } from '../symbols/done';

export function iterateThrough<T = unknown>(iterable: Iterable<T>) {
  return function (listener: VoidCallback<T | typeof DONE>): Unsubscribe {
    const id = setTimeout(() => {
      const iterator = iterable[Symbol.iterator]();
      let nextValue = iterator.next();
      while (!nextValue.done) {
        listener(nextValue.value);
        nextValue = iterator.next();
      }
      listener(DONE);
    });
    return function () {
      clearTimeout(id);
    };
  };
}
