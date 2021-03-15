import { PuppyBroadcaster } from '../shared/PuppyBroadcaster/PuppyBroadcaster';

/**
 * Creates an interval
 *
 * @param time - duration of timout in milliseconds
 *
 * @public
 */
export function createInterval(time: number): PuppyBroadcaster {
  return new PuppyBroadcaster((listener) => {
    const id = setInterval(listener, time);
    return () => {
      clearInterval(id);
      return undefined;
    };
  });
}
