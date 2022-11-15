/**
 * TypeScript supports *generics*, which are sort of like arguments for
 * types.
 */

/**
 * Web services often wrap their responses in an envelope. Here, we can
 * describe a *generic* envelope and reuse it for different server
 * responses.
 */

interface Envelope<ResponseData> {
  data: ResponseData,
  apiVersion: string,
  warnings: string[]
}

const isoTimeResponse: Envelope<string> = {
  data: (new Date()).toISOString(),
  apiVersion: '1.0.0',
  warnings: []
};

/**
 * Generics can also be used with functions.
 */

type Transform<T> = (input: T) => T

/**
 * Here's something a bit more advanced.
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
 * TypeScript can infer the generic types in a generic function. We
 * could have written this as `applyTransforms<number>(...)`, but we
 * don't have to.
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
   * What happens when we try to include a function that returns
   * something other than `T` (a `number`)?
   */

  // number => String(number),

  /**
   * Unfortunately, `NaN` is paradoxically also a `number`. TypeScript
   * makes working with numbers only marginally safer.
   */

  // number => number + NaN
]);
