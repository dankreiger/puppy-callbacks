/**
 * @packageDocumentation types/interfaces
 *
 */

export type VoidCallback<T> = (...params: T[]) => void;

export type Unsubscribe = () => void;

export interface IBroadcaster<T = unknown> {
  (listener: VoidCallback<T>): Unsubscribe;
}
