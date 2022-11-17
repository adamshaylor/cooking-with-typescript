import { shapeIsSphere } from './5-Differentiation-at-runtime';
import { RectangularCuboid, Shape, Sphere } from '../1-Basics/2-Composition-with-unions-and-intersections';

/**
 * `Array.prototype.map()`, `.filter()`, and `.reduce()` were my
 * introduction to the world of functional programming. I still make
 * heavy use them today, along with the many other native methods that
 * come with `Array`. TypeScript can infer those method arguments and
 * return types based on the type of its elements. Even the return
 * types of the functions that use these array methods can be inferred.
 */

const findFirstContainingLetterA = (strings: string[]) =>
  strings.find(string =>
    string.includes('a')
  );

const incrementArrayImmutably = (numbers: number[]) =>
  numbers.map(number =>
    number + 1
  );

export const incrementArrayMutably = (numbers: number[]) =>
  numbers.forEach((_, index) =>
    numbers[index] += 1
  );

const findAllContainingLetterA = (strings: string[]) =>
  strings.filter(string =>
    string.includes('a')
  );

const sum = (numbers: number[]) =>
  numbers.reduce(
    (previous, number) => previous + number,
    0
  );

/**
 * This even works for `Array.prototype.flatMap()`.
 */

interface ShapeCollection {
  shape: Shape
  quantity: number
}

const shapeCollectionsToShapes = (shapeCollections: ShapeCollection[]) =>
  shapeCollections.flatMap(collection =>
    Array.from({ length: collection.quantity }, () => collection.shape)
  );

/**
 * Let's say we want to use `Array.prototype.map()` to double the
 * dimensions of an array of shapes. Our `Shape` type is a union of two
 * interfaces, so we'll need two different functions to do the
 * doubling.
 */

const doubleSphereDimensions = (sphere: Sphere): Sphere => ({
  radius: sphere.radius * 2
});

const doubleRectangularCuboidDimensions = (cuboid: RectangularCuboid): RectangularCuboid => ({
  width: cuboid.width * 2,
  height: cuboid.height * 2,
  length: cuboid.length * 2
});

/**
 * In spite of the complexity, inference still works here, both in the
 * arguments passed to the the `map()` callback and even the return
 * type of our function. The return type is equivalent to `Shape`, even
 * if it isn't so named.
 * 
 * Try adding another interface to the `Shape` union. Does inference
 * and narrowing adequately protect us from an unresolved ambiguity
 * here?
 */

const doubleShapesDimensions = (shapes: Shape[]) =>
  shapes.map(shape =>
    shapeIsSphere(shape)
      ? doubleSphereDimensions(shape)
      : doubleRectangularCuboidDimensions(shape)
  );
