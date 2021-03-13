import { addListener, createInterval, createTimeout, merge } from '..';

jest.useFakeTimers();

describe('broadcasters', () => {
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
      expect(setTimeout).toHaveBeenCalledWith(listener, 1000);
    });

    test('can cancel a timeout by calling the unsubcribe function', () => {
      const listener = jest.fn();

      const oneSecondTimeout = createTimeout(1000);
      jest.runAllTimers();
      expect(listener).not.toBeCalled();
      expect(setTimeout).not.toBeCalled();
      expect(clearTimeout).not.toBeCalled();

      const unsubcribe = oneSecondTimeout(listener);
      // unsubscribe after 500ms
      jest.advanceTimersByTime(500);
      unsubcribe();
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

      const unsubcribe = oneSecondTimeout(listener);
      // unsubscribe after 1000ms
      jest.advanceTimersByTime(1000);
      unsubcribe();

      // listener was still called
      expect(listener).toBeCalled();
      expect(listener).toHaveBeenCalledTimes(1);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(listener, 1000);
      // noop clearTimeout was also called
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
  });

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
      expect(setInterval).toHaveBeenCalledWith(listener, 1000);

      // 500ms, should not be called yet
      jest.advanceTimersByTime(500);

      expect(listener).toBeCalled();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(listener, 1000);

      // another 500ms - listener should be called
      jest.advanceTimersByTime(500);

      expect(listener).toBeCalled();
      expect(listener).toHaveBeenCalledTimes(2);
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(listener, 1000);

      jest.advanceTimersByTime(18000);

      expect(listener).toBeCalled();
      expect(listener).toHaveBeenCalledTimes(20);
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(listener, 1000);
    });

    test('can cancel an interval with unsubscribe ', () => {
      const listener = jest.fn();

      const oneSecondTimeout = createInterval(1000);
      expect(listener).not.toBeCalled();
      expect(setInterval).not.toBeCalled();
      expect(clearInterval).not.toBeCalled();

      const unsubcribe = oneSecondTimeout(listener);
      jest.advanceTimersByTime(500);
      unsubcribe();

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

      const unsubcribe = oneSecondTimeout(listener);
      jest.advanceTimersByTime(1000);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(setInterval).toBeCalledWith(listener, 1000);

      jest.advanceTimersByTime(1000);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(setInterval).toBeCalledWith(listener, 1000);

      jest.advanceTimersByTime(500);
      unsubcribe();
      jest.advanceTimersByTime(500);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(setInterval).toBeCalledWith(listener, 1000);
    });
  });

  describe('addListener', () => {
    afterEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
    test('can attach an event listener to an element and call it', () => {
      const listener = jest.fn((text) => {
        const el = document.querySelector('#username');
        if (el) {
          el.innerHTML += 'dog';
        }
      });

      document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="button" />' +
        '</div>';

      const buttonListener = addListener('#button');
      const buttonClickListener = buttonListener('click');
      const event = new Event('click');

      buttonClickListener(listener);
      expect(listener).not.toBeCalled();
      const el = document.querySelector('#button');
      if (el) {
        el.dispatchEvent(event);
      }
      expect(listener).toHaveBeenCalledTimes(1);
      expect(document.querySelector('#username')?.textContent).toBe('  dog');

      if (el) el.dispatchEvent(event);
      expect(listener).toHaveBeenCalledTimes(2);
      expect(document.querySelector('#username')?.textContent).toBe('  dogdog');
    });

    test('can attach and remove an event listener from an element ', () => {
      const listener = jest.fn(() => {
        const el = document.querySelector('#username');
        if (el) {
          el.innerHTML += 'dog';
        }
      });

      document.body.innerHTML =
        '<div>' +
        '  <span id="username" />' +
        '  <button id="button" />' +
        '</div>';

      const buttonListener = addListener('#button');
      const buttonClickListener = buttonListener('click');
      const event = new Event('click');

      const removeEventListener = buttonClickListener(listener);
      expect(listener).not.toBeCalled();
      const el = document.querySelector('#button');
      if (el) el.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(document.querySelector('#username')?.textContent).toBe('  dog');

      removeEventListener();
      if (el) el.dispatchEvent(event);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(document.querySelector('#username')?.textContent).toBe('  dog');
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
