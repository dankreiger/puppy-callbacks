import { PuppyBroadcaster } from './PuppyBroadcaster';
const { SUBSCRIBED, UNSUBSCRIBED } = PuppyBroadcaster.StatusOptions;

declare const global: any;
jest.useFakeTimers();

describe('PuppyBroadcaster', () => {
  let listener: VoidFunction;
  beforeEach(() => {
    listener = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('can be subscribed to / unsubscribed from', () => {
    const unsubscribe = (id: number) =>
      jest.fn(() => {
        clearTimeout(id);
        return undefined;
      });
    const subscription = (fn: VoidFunction) => {
      const id = setTimeout(fn, 1000);
      return unsubscribe(id);
    };

    const broadcaster = new PuppyBroadcaster(subscription);
    broadcaster.subscribe(listener);

    expect(listener).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
    expect(broadcaster.status).toBe(SUBSCRIBED);

    broadcaster.unsubscribe();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(broadcaster.status).toBe(UNSUBSCRIBED);
  });

  test('calls a noop if no unsubscribe function exists', () => {
    const subscription = (fn: VoidFunction) => {
      setTimeout(fn, 1000);
      return undefined;
    };

    const broadcaster = new PuppyBroadcaster(subscription);
    broadcaster.subscribe(listener);
    expect(listener).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(listener).toHaveBeenCalledTimes(1);

    broadcaster.unsubscribe();
  });

  test('warns developer if more than subscription is made to the same PuppyBroadcaster', () => {
    // TODO: this should only be included in dev bundle
    const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();

    const subscription = (fn: VoidFunction) => {
      setTimeout(fn, 1000);
      return undefined;
    };

    const broadcaster = new PuppyBroadcaster(subscription);
    broadcaster.subscribe(listener);
    expect(listener).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(listener).toHaveBeenCalledTimes(1);

    broadcaster.subscribe(listener);
    expect(consoleWarn.mock.calls).toEqual([
      ['WARNING: there is 1 subscription active on this PuppyObservable'],
    ]);
    broadcaster.subscribe(listener);
    expect(consoleWarn.mock.calls).toEqual([
      ['WARNING: there is 1 subscription active on this PuppyObservable'],
      ['WARNING: there are 2 subscriptions active on this PuppyObservable'],
    ]);

    jest.restoreAllMocks();
  });
});
