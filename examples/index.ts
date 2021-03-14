import { addListener, createInterval } from '@dankreiger/broadcasters';
import { zip, iterateThrough } from '@dankreiger/operators';
import { DONE } from '@dankreiger/symbols';
const clickAndTick = zip(addListener('#button')('click'), createInterval(1000));

clickAndTick(console.log);

const typeGreeting = zip(
  createInterval(100),
  iterateThrough('the dog really likes to woof')
);

typeGreeting((value) => {
  if (value === DONE) {
    console.log('shutting down');
    return;
  }
  document.querySelector('#content').innerHTML += value[1];
});
