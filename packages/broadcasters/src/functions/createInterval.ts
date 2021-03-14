import type { IBroadcaster } from '@dankreiger/types';

/**
 * Creates an interval
 * Returns a function that accepts a listener, which returns an unsubscribe function
 *
 * @param time - duration of timout in milliseconds
 * @returns \{function(listener: VoidCallback): Unsubscribe\} a function accepting a callback listener that returns and unsubscribe function
 * @public
 */
export function createInterval(time: number): IBroadcaster<unknown> {
  return function broadcaster(listener) {
    const id = setInterval(listener, time);
    return function () {
      clearInterval(id);
    };
  };
}