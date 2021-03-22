import { addListener } from './addListener';

declare const global: typeof globalThis;

describe('addListener', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('can attach an event listener to an element and call it', () => {
    const eventType = 'click';
    const expectedLogs = [['click'], ['[object HTMLButtonElement]']];
    const listenerFn: EventListenerOrEventListenerObject = (event: Event) => {
      const el = document.querySelector('#username');
      console.log(event.type);
      console.log(event.target?.toString());
      if (el) {
        el.innerHTML += 'dog';
      }
    };

    const consoleLog = jest.spyOn(global.console, 'log').mockImplementation();

    const listener = jest.fn(listenerFn);

    document.body.innerHTML =
      '<div>' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      '</div>';

    const buttonClickBroadcaster = addListener('#button', eventType);
    const event = new Event(eventType);

    buttonClickBroadcaster(listener);
    expect(listener).not.toBeCalled();
    const el = document.querySelector('#button');
    if (el) {
      el.dispatchEvent(event);
    }
    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
    expect(consoleLog.mock.calls).toEqual([...expectedLogs]);

    if (el) el.dispatchEvent(event);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(document.querySelector('#username')?.textContent).toBe('  dogdog');
    expectedLogs.push(...expectedLogs);
    expect(consoleLog.mock.calls).toEqual(expectedLogs);
  });

  test('can attach and remove an event listener from an element ', () => {
    const eventType = 'click';
    const expectedLogs = [['click'], ['[object HTMLButtonElement]']];
    const listenerFn: EventListenerOrEventListenerObject = (event: Event) => {
      const el = document.querySelector('#username');
      console.log(event.type);
      console.log(event.target?.toString());
      if (el) {
        el.innerHTML += 'dog';
      }
    };

    const consoleLog = jest.spyOn(global.console, 'log').mockImplementation();

    const listener = jest.fn(listenerFn);

    document.body.innerHTML =
      '<div>' +
      '  <span id="username" />' +
      '  <button id="button" />' +
      '</div>';

    const buttonClickBroadcaster = addListener('#button', eventType);
    const event = new Event(eventType);

    const unsubscribe = buttonClickBroadcaster(listener);

    expect(listener).not.toBeCalled();
    const el = document.querySelector('#button');
    expect(consoleLog.mock.calls).toEqual([]);
    if (el) el.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
    expect(consoleLog.mock.calls).toEqual(expectedLogs);

    unsubscribe();

    if (el) el.dispatchEvent(event);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
  });
});
