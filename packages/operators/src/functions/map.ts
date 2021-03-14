import { Unsubscribe } from '@redux-saga/core';
import { DONE } from '../symbols/done';
import { IBroadcaster } from '../types/interfaces';
import { VoidCallback } from '../types/types';

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
