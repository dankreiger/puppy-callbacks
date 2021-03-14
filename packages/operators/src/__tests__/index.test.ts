import { createTimeout, createInterval } from '@dankreiger/broadcasters';
import { merge } from '../functions/merge';

jest.useFakeTimers();

describe('operators', () => {
  describe('merge', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('can take two broadcasters and call them both a listener every 1000ms', () => {
      const listener = jest.fn();

      const broadcaster1 = createTimeout(1000);
      const broadcaster2 = createInterval(1000);

      const mergeBroadcasters = merge(broadcaster1, broadcaster2);

      expect(listener).not.toBeCalled();
      expect(setTimeout).not.toBeCalled();
      expect(setInterval).not.toBeCalled();

      mergeBroadcasters(listener);

      jest.advanceTimersByTime(1000);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledWith(listener, 1000);
      expect(setInterval).toHaveBeenCalledWith(listener, 1000);
    });

    test('can take two broadcasters and unsubscribe from them', () => {
      const listener = jest.fn();

      const broadcaster1 = createTimeout(1000);
      const broadcaster2 = createInterval(1000);

      const mergeBroadcasters = merge(broadcaster1, broadcaster2);

      expect(listener).not.toBeCalled();
      expect(setTimeout).not.toBeCalled();
      expect(setInterval).not.toBeCalled();

      const unsubscribe = mergeBroadcasters(listener);

      jest.advanceTimersByTime(500);

      unsubscribe();

      jest.advanceTimersByTime(500);

      expect(listener).not.toBeCalled();
      expect(clearTimeout).toHaveBeenCalled();
      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
