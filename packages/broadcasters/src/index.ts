/**
 * @packageDocumentation broadcaster functions
 * @remarks A broadcaster is a function that accepts a listener
 */
export { addListener } from './addListener/addListener';
export { createInterval } from './createInterval/createInterval';
export { createTimeout } from './createTimeout/createTimeout';

/**
 * @packageDocumentation broadcaster types / interfaces / enums
 */
export type { Broadcaster } from './ts/types/Broadcaster/Broadcaster';
export type { ETimerFn } from './ts/enums/ETimerFn/ETimerFn';
