import { createTimeout } from './createTimeout';

jest.useFakeTimers();

describe('createTimeout', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('calls a listener after 1000ms', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createTimeout(1000);
    jest.runAllTimers();
    expect(listener).not.toBeCalled();
    expect(setTimeout).not.toBeCalled();

    oneSecondTimeout(listener);
    jest.advanceTimersByTime(1000);

    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(1);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('can cancel a timeout by calling the unsubcribe function', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createTimeout(1000);
    jest.runAllTimers();
    expect(listener).not.toBeCalled();
    expect(setTimeout).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    const unsubscribe = oneSecondTimeout(listener);

    // unsubscribe after 500ms
    jest.advanceTimersByTime(500);

    unsubscribe();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(1);

    // will not call listener
    jest.advanceTimersByTime(500);
    expect(listener).not.toBeCalled();
  });

  test('will not cancel listener if unsubscribe occurs after timeout', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createTimeout(1000);
    jest.runAllTimers();
    expect(listener).not.toBeCalled();
    expect(setTimeout).not.toBeCalled();
    expect(clearTimeout).not.toBeCalled();

    const unsubscribe = oneSecondTimeout(listener);

    // unsubscribe after 1000ms
    jest.advanceTimersByTime(1000);
    unsubscribe();

    // listener was still called
    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(1);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
    // noop clearTimeout was also called
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
