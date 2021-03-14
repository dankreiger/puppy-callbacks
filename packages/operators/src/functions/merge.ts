import { IBroadcaster } from '../types/interfaces';

/**
 * Accepts two broadcaster functions for merging
 * Returns a function that accepts a listener, and applies the listener to both broadcasters - this returns an unsubscribe function
 *
 * @param broadcaster1 - duration of timout in milliseconds
 * @param broadcaster2 - duration of timout in milliseconds
 * @returns \{function(listener: VoidCallback): Unsubscribe\} a function accepting a callback listener that returns and unsubscribe function
 * @public
 * @public
 */
export function merge(
  broadcaster1: IBroadcaster,
  broadcaster2: IBroadcaster
): IBroadcaster {
  return function mergeBroadcaster(listener) {
    const cancel1 = broadcaster1(listener);
    const cancel2 = broadcaster2(listener);

    return function () {
      cancel1();
      cancel2();
    };
  };
}
