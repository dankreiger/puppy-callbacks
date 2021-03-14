import type { IBroadcaster } from '../types/interfaces';

/**
 * Adds event listener to a html element
 * Returns a function that accepts an event, which returns a function that accepts a listener, which returns an unsubscribe function which removes the event listener
 *
 * @param selector  - string for querying a dom element (e.g. class, id)
 * @returns \{(eventType: keyof HTMLElementEventMap) =\> (listener: VoidCallback) =\> Unsubscribe\}
 *
 * @public
 */
export function addListener(selector: string) {
  return function (
    eventType: keyof HTMLElementEventMap
  ): IBroadcaster<unknown> {
    return function broadcaster(listener) {
      const element = document.querySelector(selector);
      element?.addEventListener(eventType, listener);
      return function () {
        element?.removeEventListener(eventType, listener);
      };
    };
  };
}
