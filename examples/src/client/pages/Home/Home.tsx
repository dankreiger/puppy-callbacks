import React, { useCallback, useEffect, useState } from 'react';

const useBroadcaster = (broadcaster, deps = []) => {
  const [state, setState] = useState<number>(0);
  console.log({ state });

  useEffect(() => {
    broadcaster(setState);
  }, deps);
  return state;
};

let listener = (val: string): string => val;
const callbackListener = (value) => {
  if (typeof value === 'function') {
    listener = value;
    return;
  }
  listener(value);
};
const map = (transform) => (broadcaster) => (listener) => {
  return broadcaster((value) => {
    return listener(transform(value));
  });
};

const targetValue = map(
  (e: React.SyntheticEvent): string => e.target.value as string
);

const HomePage: React.FC = () => {
  const onInput = useCallback(callbackListener, []);
  const state = useBroadcaster(targetValue(onInput));
  return (
    <div>
      <div>I am the HomePage component woof</div>
      <div>Counter: {state}</div>
      <input onInput={onInput} />
    </div>
  );
};

export default {
  component: HomePage,
};
