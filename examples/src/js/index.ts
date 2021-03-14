import { addListener, createInterval } from '@dankreiger/broadcasters';

addListener('button')('click');

createInterval(2000);
