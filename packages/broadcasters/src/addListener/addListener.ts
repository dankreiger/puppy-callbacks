import { PuppyBroadcaster } from '../shared/PuppyBroadcaster/PuppyBroadcaster';
/**
 * Adds event listener to a html element
 *
 * @param selector  - string for querying a dom element (e.g. class, id)
 *
 * @public
 */
export function addListener(
  selector: string,
  eventType: keyof HTMLElementEventMap
): PuppyBroadcaster {
  const element = document.querySelector(selector);

  return new PuppyBroadcaster((listener) => {
    element?.addEventListener(eventType, listener);
    return () => {
      element?.removeEventListener(eventType, listener);
      return undefined;
    };
  });
}
