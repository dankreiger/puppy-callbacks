import type { Broadcaster } from '../ts/types/Broadcaster/Broadcaster';

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
): Broadcaster<EventListenerOrEventListenerObject> {
  return function broadcaster(listener) {
    const element = document.querySelector(selector);
    element?.addEventListener(eventType, listener);

    return function unsubscribe() {
      element?.removeEventListener(eventType, listener);
    };
  };
}
