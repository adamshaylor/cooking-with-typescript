/**
 * A type in TypeScript can be one thing *or* another. This is called a
 * *union type*.
 */

let hello: string | null = 'hi';

/**
 * We can do this because TypeScript can see its type hasn't changed.
 */

console.log(hello.length);

/**
 * ...But we can't do this. TypeScript knows that `hello` could be set
 * be set to `null` later.
 */

// function logHelloLength() {
//   console.log(hello.length);
// }

/**
 * Union types can also be used to support mutually exclusive objects.
 */

export interface RectangularCuboid {
  length: number
  width: number
  height: number
}

export interface Sphere {
  radius: number
}

/**
 * TypeScript has some good ways of managing unions of different object
 * types. We'll get into that in the *differentiation* examples.
 */

export type Shape = RectangularCuboid | Sphere

/**
 * A type can also be one thing *and* another. This is called an
 * *intersection type*.
 */

interface Animal {
  genus: string
  species: string
}

type Pet = Animal & {
  name: string
  favoriteFood: string
}

const cat: Animal = {
  genus: 'Felis',
  species: 'Catus'
}

const whiskers: Pet = {
  ...cat,
  name: 'Whiskers',
  favoriteFood: 'Tuna'
};
