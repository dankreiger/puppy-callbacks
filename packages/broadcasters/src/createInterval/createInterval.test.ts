import { createInterval } from './createInterval';

jest.useFakeTimers();

describe('createInterval', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('calls a listener every 1000ms', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createInterval(1000);
    jest.runAllTimers();
    expect(listener).not.toBeCalled();
    expect(setInterval).not.toBeCalled();

    oneSecondTimeout(listener);
    jest.advanceTimersByTime(1000);

    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(1);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    // 500ms, should not be called yet
    jest.advanceTimersByTime(500);

    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    // another 500ms - listener should be called
    jest.advanceTimersByTime(500);

    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.advanceTimersByTime(18000);

    expect(listener).toBeCalled();
    expect(listener).toHaveBeenCalledTimes(20);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('can cancel an interval with unsubscribe ', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createInterval(1000);
    expect(listener).not.toBeCalled();
    expect(setInterval).not.toBeCalled();
    expect(clearInterval).not.toBeCalled();

    const unsubscribe = oneSecondTimeout(listener);

    jest.advanceTimersByTime(500);
    unsubscribe();

    expect(listener).not.toBeCalled();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  test('can cancel an interval later with unsubscribe ', () => {
    const listener = jest.fn();

    const oneSecondTimeout = createInterval(1000);
    jest.runAllTimers();
    expect(listener).not.toBeCalled();
    expect(setInterval).not.toBeCalled();

    const unsubscribe = oneSecondTimeout(listener);

    jest.advanceTimersByTime(1000);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.advanceTimersByTime(1000);

    expect(listener).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.advanceTimersByTime(500);
    unsubscribe();
    jest.advanceTimersByTime(500);

    expect(listener).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
