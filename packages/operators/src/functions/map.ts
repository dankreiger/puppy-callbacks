import { DONE } from '../symbols/done';
import { IBroadcaster } from '../ts/interfaces';
import { VoidCallback, Unsubscribe } from '../ts/types';

export const map = <T, U>(transform: (arg: T) => U) => (
  broadcaster: IBroadcaster<T | typeof DONE>
) => (listener: VoidCallback<U | typeof DONE>): Unsubscribe => {
  return broadcaster((value) => {
    if (value === DONE) {
      listener(value);
      return;
    }

    listener(transform(value));
  });
};
