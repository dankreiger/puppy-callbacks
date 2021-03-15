/**
 * @packageDocumentation broadcaster functions
 * @remarks A broadcaster is a function that accepts a listener
 */

import { addListener } from './functions/addListener';
import { createInterval } from './functions/createInterval';
import { createTimeout } from './functions/createTimeout';

export type { Unsubscribe, VoidCallback } from './ts/types';
export type { IBroadcaster } from './ts/interfaces';

export { addListener, createInterval, createTimeout };
