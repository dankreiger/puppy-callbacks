import { ETimerFn } from '../ts/enums/ETimerFn/ETimerFn';

/** *
 * @param input - handler passed to setInterval
 * @returns {Function|() => string}
 *
 * @internal
 */
const ensureIsFunction = (input: TimerHandler) => {
  if (typeof input === 'function') {
    return input;
  }
  return () => input;
};

/** *
 * @param handler - setInterval handler
 * @returns {void}
 *
 * @internal
 */
export const safeHandler = (handler: TimerHandler) => (): void => {
  ensureIsFunction(handler)();
};

/**
 * Prevents eval() usage in setInterval on string types
 *
 * @param handler - setInterval handler
 * @param duration - interval duration
 * @returns {number}
 *
 * @internal
 */
export function safeTimerFn(
  timerFn: ETimerFn,
  handler: TimerHandler,
  duration: number
): number {
  return globalThis[timerFn](safeHandler(handler), duration);
}
