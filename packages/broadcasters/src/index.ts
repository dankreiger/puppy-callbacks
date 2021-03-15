/**
 * @packageDocumentation broadcaster functions
 * @remarks A broadcaster is a function that accepts a listener
 */

import { addListener } from './functions/addListener';
import { createInterval } from './functions/createInterval';
import { createTimeout } from './functions/createTimeout';

export type { Unsubscribe, VoidCallback } from './types/types';
export type { IBroadcaster } from './types/interfaces';

export { addListener, createInterval, createTimeout };
