import { addListener } from './addListener';
import { PuppyBroadcaster } from '../shared/PuppyBroadcaster/PuppyBroadcaster';
const { SUBSCRIBED, UNSUBSCRIBED } = PuppyBroadcaster.StatusOptions;

describe('addListener', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('can attach an event listener to an element and call it', () => {
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

    const buttonClickListener = addListener('#button', 'click');
    const event = new Event('click');

    buttonClickListener.subscribe(listener);
    expect(listener).not.toBeCalled();
    const el = document.querySelector('#button');
    if (el) {
      el.dispatchEvent(event);
    }
    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
    expect(buttonClickListener.status).toBe(SUBSCRIBED);

    if (el) el.dispatchEvent(event);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(document.querySelector('#username')?.textContent).toBe('  dogdog');
    expect(buttonClickListener.status).toBe(SUBSCRIBED);
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

    const buttonClickListener = addListener('#button', 'click');
    const event = new Event('click');
    expect(buttonClickListener.status).toBe(UNSUBSCRIBED);

    buttonClickListener.subscribe(listener);
    expect(buttonClickListener.status).toBe(SUBSCRIBED);

    expect(listener).not.toBeCalled();
    const el = document.querySelector('#button');
    if (el) el.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
    expect(buttonClickListener.status).toBe(SUBSCRIBED);

    buttonClickListener.unsubscribe();
    expect(buttonClickListener.status).toBe(UNSUBSCRIBED);

    if (el) el.dispatchEvent(event);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(document.querySelector('#username')?.textContent).toBe('  dog');
  });
});
