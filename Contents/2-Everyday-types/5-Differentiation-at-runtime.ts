import type { RectangularCuboid, Shape, Sphere } from '../1-Basics/2-Composition-with-unions-and-intersections';

/**
 * Sometimes we need to write functions that accept unions of object
 * types. Remember that earlier we defined `Shape` as a union of
 * `RectangularCuboid` and `Sphere`, two interfaces with different
 * properties.
 */

const getWidth = (shape: Shape): number => {
  if ('radius' in shape) {
    /**
     * `Sphere` is the only shape in the union that meets the condition
     * of this block because it's the only object with a `radius`
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
 * 
 * The drawback to the `is` operator is that it’s something of a
 * hold-my-beer feature. We're telling TypeScript to trust us that
 * we've narrowed the type adequately. As of TypeScript 4.8, it does
 * not verify that we have actually done so.
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
   * This avoids the mystery of implicitly returning `undefined` if the
   * function is passed a bad type at runtime.
   * 
   * We could appease the compiler by returning some arbitrary number
   * like `-1`, but it's best in these cases to throw an error.
   * 
   * Note that at this point in our code, `typeof shape` is `never`.
   */

  // throw new TypeError('shape not recognized');
}
