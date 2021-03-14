/**
 * @packageDocumentation broadcaster functions
 * @remarks A broadcaster is a function that accepts a listener
 */

export { addListener } from './functions/addListener';
export { createInterval } from './functions/createInterval';
export { createTimeout } from './functions/createTimeout';

export type { Unsubscribe, VoidCallback } from './types/types';
export type { IBroadcaster } from './types/interfaces';
