import { pipe, toLower } from 'lodash/fp';
import { addListener, createInterval } from '@dankreiger/broadcasters';
import { zip, iterateThrough, DONE, map, filter } from '@dankreiger/operators';
const clickAndTick = zip(addListener('#button')('click'), createInterval(1000));

clickAndTick(console.log);

const operators = pipe(
  map((x) => x[1]),
  map(toLower),
  filter((x) => x !== ',')
);

const typeGreeting = operators(
  zip(createInterval(100), iterateThrough('the dog really likes to woof'))
);

typeGreeting((value) => {
  console.log(value);

  if (value === DONE) {
    console.log('shutting down');
    return;
  }
  document.querySelector('#content').innerHTML += value;
});
