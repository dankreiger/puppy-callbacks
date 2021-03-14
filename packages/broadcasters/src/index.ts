/**
 * types
 */
type VoidCallback<T = unknown> = (...params: T[]) => void;
type Unsubscribe = () => void;

/**
 * interfaces
 */
interface IBroadcaster<T = unknown> {
  (listener: VoidCallback<T>): Unsubscribe;
}

/**
 * @packageDocumentation A small library for common broadcaster functions
 *
 * A broadcaster is a function that accepts a listener
 */

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

/**
 * Accepts two broadcasters and values grouped in an array
 */
export function zip<T, U>(
  broadcaster1: IBroadcaster<T>,
  broadcaster2: IBroadcaster<U>
): IBroadcaster {
  return function zippedBroadcaster(listener: VoidCallback) {
    const buffer1: T[] = [];
    const cancel1 = broadcaster1((value) => {
      buffer1.push(value);
      if (buffer2.length) {
        listener([buffer1.shift(), buffer2.shift()]);
      }
    });

    const buffer2: U[] = [];
    const cancel2 = broadcaster2((value) => {
      buffer2.push(value);

      if (buffer1.length) {
        listener([buffer1.shift(), buffer2.shift()]);
      }
    });

    return function () {
      cancel1();
      cancel2();
    };
  };
}

export function forOf<T = unknown>(
  iterable: Iterable<T>,
  listener: VoidCallback
): Unsubscribe {
  const id = setTimeout(() => {
    for (const i of iterable) {
      listener(i);
    }
  });
  return function () {
    clearTimeout(id);
  };
}
