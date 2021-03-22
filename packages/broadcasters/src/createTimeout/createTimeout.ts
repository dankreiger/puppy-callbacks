import { ETimerFn } from '../ts/enums/ETimerFn/ETimerFn';
import { Broadcaster } from '../ts/types/Broadcaster/Broadcaster';
import { safeTimerFn } from '../utils/timer';

/**
 * Creates a timeout
 *
 * @param time - duration of timeout in milliseconds
 *
 * @public
 */
export function createTimeout<ListenerArgs = unknown, ListenerReturn = void>(
  time: number
): Broadcaster<(args?: ListenerArgs[]) => ListenerReturn> {
  return function broadcaster(listener) {
    const id = safeTimerFn(ETimerFn.SET_TIMEOUT, listener, time);

    return () => {
      clearTimeout(id);
      return undefined;
    };
  };
}
