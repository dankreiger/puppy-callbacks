import { Unsubscribe, VoidCallback } from './types';

export interface IBroadcaster<T = unknown> {
  (listener: VoidCallback<T>): Unsubscribe;
}
