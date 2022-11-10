/**
 * TypeScript supports generics, which are sort of like arguments for
 * types.
 */

/**
 * Web services often wrap their responses in an envelope.
 */

interface Envelope<ResponseData> {
  data: ResponseData,
  apiVersion: string,
  warnings: string[]
}

const isoTimeResponse: Envelope<string> = {
  data: (new Date()).toISOString(),
  /**
   * What happens if we try to use a raw Date object instead?
   */
  // data: new Date(),
  apiVersion: '1.0.0',
  warnings: []
};

/**
 * Generics can also be used with functions.
 */

type Transform<T> = (input: T) => T

/**
 * Here's something a bit more advanced. TypeScript can infer a lot of
 * types, including the generic-based types of an array reducer's
 * arguments.
 */

const applyTransforms = <T>(input: T, transforms: Array<Transform<T>>): T =>
  transforms.reduce(
    (previousOutput, transform) => transform(previousOutput),
    input
  );

/**
 * Now let's see that in action.
 */

const addOne: Transform<number> = number => number + 1;
const multiplyByTwo: Transform<number> = number => number * 2;

/**
 * TypeScript can infer the type of a generic function's return value
 * based on the types of the values of its arguments.
 */

const five = applyTransforms(0, [
  addOne,
  multiplyByTwo,
  multiplyByTwo,
  addOne
]);

/**
 * We don't even need to declare the types of the transforms when
 * they're inline.
 */
const fiveAgain = applyTransforms(0, [
  number => number + 1,
  number => number * 2,
  number => number * 2,
  number => number + 1,

  /**
   * What happens when you try to include a function that returns
   * something other than `T` (a number)?
   */

  // number => String(number),

  /**
   * Unfortunately, `NaN` is paradoxically also a number.
   */

  // number => number + NaN
]);
