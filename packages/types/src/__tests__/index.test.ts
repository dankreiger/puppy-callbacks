import type { IBroadcaster } from '..';

// $ExpectType void
const broadcaster: IBroadcaster = (listener) => {
  listener();
  return () => void 0;
};

broadcaster(() => () => void 0);

test('', () => {
  expect(1).toBe(1);
});
