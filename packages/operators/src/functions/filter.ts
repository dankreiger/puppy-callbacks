import { Unsubscribe } from '@redux-saga/core';
import { DONE } from '../symbols/done';
import { IBroadcaster } from '../types/interfaces';
import { VoidCallback } from '../types/types';

export const filter = <T>(predicate: (arg: T) => boolean) => (
  broadcaster: IBroadcaster<T | typeof DONE>
) => (listener: VoidCallback<T | typeof DONE>): Unsubscribe => {
  return broadcaster((value) => {
    if (value === DONE) {
      listener(value);
      return;
    }
    if (predicate(value)) {
      listener(value);
    }
  });
};
