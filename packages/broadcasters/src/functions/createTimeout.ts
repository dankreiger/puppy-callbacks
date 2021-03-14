import type { IBroadcaster } from '../types/interfaces';

/**
 * Creates a timeout
 * Returns a function that accepts a listener, which returns an unsubscribe function
 *
 * @param time - duration of timout in milliseconds
 * @returns \{function(listener: VoidCallback): Unsubscribe\} a function accepting a callback listener that returns and unsubscribe function
 * @public
 */
export function createTimeout(time: number): IBroadcaster<unknown> {
  return function broadcaster(listener) {
    const id = setTimeout(listener, time);
    return function () {
      clearTimeout(id);
    };
  };
}
