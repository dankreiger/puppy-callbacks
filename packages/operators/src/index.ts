/**
 * @packageDocumentation operators
 * an operator is a function that accepts a broadcaster and listener, then modifies their behaviour
 *
 */
export { merge } from './functions/merge';
export { iterateThrough } from './functions/iterateThrough';
export { zip } from './functions/zip';

// const modify = (broadcaster: IBr) => listener => {
//   let string = ''

//   return broadcaster(value => {
//     if(value === DONE) {
//       listener(DONE);
//       return
//     }
//     listener(string += value[1])
//   })
// }

export const noop = (): void => void 0;
