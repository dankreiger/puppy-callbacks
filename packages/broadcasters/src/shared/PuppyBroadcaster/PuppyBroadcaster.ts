/**
 * @packageDocumentation classes
 *
 */

enum EStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

/**
 * The class returned by custom broadcasters
 *
 * @public
 */
export class PuppyBroadcaster {
  static readonly StatusOptions = EStatus;
  static readonly noop = (): undefined => undefined;

  private _status: EStatus = EStatus.UNSUBSCRIBED;
  private _subscriptionCount = 0;
  private _unsubscribe = PuppyBroadcaster.noop;

  constructor(
    private _on: (listener: VoidFunction) => undefined | (() => undefined)
  ) {}

  set status(s: EStatus) {
    this._status = s;
  }

  /**
   * Gets the status of the PuppyBroadcaster instance
   */
  get status(): EStatus {
    return this._status;
  }

  /**
   * Make the broadcaster active
   *
   * @param listener - a callback function to be invoked upon subscription
   */
  subscribe(listener: VoidFunction): void {
    if (this._subscriptionCount > 0) {
      const isPlural = this._subscriptionCount !== 1;
      const s = isPlural ? 's ' : ' ';
      const are = isPlural ? 'are ' : 'is ';
      console.warn(
        `WARNING: there ${are}${this._subscriptionCount} subscription${s}active on this PuppyObservable`
      );
    }
    const unsubscribeFn = this._on(listener);

    if (unsubscribeFn) {
      this._unsubscribe = unsubscribeFn;
    }
    this.status = EStatus.SUBSCRIBED;
    this._subscriptionCount += 1;
  }

  /**
   * Unsubscribes from the broadcaster and destroys and subscription logic in the listener
   */
  unsubscribe(): void {
    this._unsubscribe();
    this.status = EStatus.UNSUBSCRIBED;
    this._subscriptionCount -= 1;
  }
}
