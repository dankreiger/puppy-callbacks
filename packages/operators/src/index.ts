/**
 * @packageDocumentation operator functions
 * @remarks an operator is a function that accepts a broadcaster and listener, then modifies their behaviour
 *
 */
import { iterateThrough } from './functions/iterateThrough';
import { filter } from './functions/filter';
import { map } from './functions/map';
import { merge } from './functions/merge';
import { zip } from './functions/zip';

export type { Unsubscribe, VoidCallback } from './ts/types';
export type { IBroadcaster } from './ts/interfaces';

import { DONE } from './symbols/done';

export { iterateThrough, filter, map, merge, zip, DONE };
