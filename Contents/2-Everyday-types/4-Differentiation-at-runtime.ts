import type { RectangularCuboid, Shape, Sphere } from '../1-Basics/2-Composition-with-unions-and-intersections';

/**
 * Sometimes we need to write functions that accept unions of object
 * types. Remember in this case that `Shape` is just such a union of
 * different object types with different properties.
 */

const getWidth = (shape: Shape): number => {
  if ('radius' in shape) {
    /**
     * `Sphere` is the only shape in the union that meets the condition
     * of this block because its the only object with a `radius`
     * property. TypeScript will therefore treat `shape` as a `Sphere`
     * in this scope. This is called called *type narrowing*.
     */
    return shape.radius * 2;
  }
  /**
   * The type of shape here is `RectangularCuboid` because TypeScript
   * has ruled out any other possibility. If we add new shape types
   * that introduce new type ambiguities, TypeScript will force us to
   * resolve them before it will compile.
   */
  return shape.width;
};

/**
 * When we have a lot of similar type narrowing to do over a lot of
 * union members, it can be helpful to write functions that use the
 * `is` return type.
 */

export const shapeIsRectangularCuboid = (shape: Shape): shape is RectangularCuboid =>
  'width' in shape;

export const shapeIsSphere = (shape: Shape): shape is Sphere =>
  'radius' in shape;

const getMaxDimension = (shape: Shape): number => {
  /**
   * Notice how functions with `is` in their return signature aid
   * TypeScript in narrowing.
   */
  if (shapeIsRectangularCuboid(shape)) {
    return Math.max(shape.width, shape.height, shape.length);
  }

  return shape.radius;

  /**
   * Although we've sufficiently narrowed the type, we could add some
   * more explicit narrowing.
   */

  // if (shapeIsSphere(shape)) {
  //   return shape.radius;
  // }

  /**
   * Now that we've done that, though, TypeScript wants us to
   * explicitly handle the case where `shape` does not match anything.
   * Here, the type of `shape` is `never`. We can return some arbitrary
   * number like `-1`, but it's best in these cases to throw an error.
   */

  // throw new TypeError('shape not recognized');
}
