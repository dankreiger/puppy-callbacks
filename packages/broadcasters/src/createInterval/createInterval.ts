import { ETimerFn } from '../ts/enums/ETimerFn/ETimerFn';
import { Broadcaster } from '../ts/types/Broadcaster/Broadcaster';
import { safeTimerFn } from '../utils/timer';

/**
 * Creates an interval
 *
 * @param time - duration of timeout in milliseconds
 *
 * @public
 */
export function createInterval<ListenerArgs = unknown, ListenerReturn = void>(
  time: number
): Broadcaster<(args?: ListenerArgs[]) => ListenerReturn> {
  return function broadcaster(listener) {
    const id = safeTimerFn(ETimerFn.SET_INTERVAL, listener, time);

    return function unsubscribe() {
      clearInterval(id);
    };
  };
}
