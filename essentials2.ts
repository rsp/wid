import { MarkRequired } from 'https://raw.githubusercontent.com/krzkaczor/ts-essentials/master/lib/types.ts';

class A {
  x: number;
  y?: number;
  z?: number;
}

type B = MarkRequired<A, 'y'>;

const a: A = { x: 10 };

const b: B = { x: 10 };


