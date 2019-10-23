import { Merge } from 'https://raw.githubusercontent.com/krzkaczor/ts-essentials/master/lib/types.ts';

type A = {
  a: number;
  b: string;
};

type B = {
  b: number;
};

const x: Merge<A, B> = { a: 4, b: 2 };


