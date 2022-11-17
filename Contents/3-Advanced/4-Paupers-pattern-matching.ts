/**
 * Alas, this is the closest I’ve been able to get to functional
 * pattern matching in TypeScript. Practically speaking, there are few
 * advantages to this implementation over traditional if/else-based
 * type narrowing. The only one of note is that it enforces a specific
 * flow akin to case blocks, but without the break/flow-through
 * footgun.
 * 
 * TC39 is working on a language-level implementation of pattern
 * matching here:
 * 
 * https://github.com/tc39/proposal-pattern-matching
 * 
 * If adopted, TypeScript will probably follow suit and it should all
 * just work at the syntax level. (Fingers crossed.)
 */

import type { Shape } from '../1-Basics/2-Composition-with-unions-and-intersections';

import { shapeIsRectangularCuboid, shapeIsSphere } from '../2-Everyday-types/5-Differentiation-at-runtime';

/**
 * Each JavaScript `Symbol` gets a unique type.
 */

const unmatched = Symbol('unmatched');

type Matcher<Input, InputMember extends Input> = (input: Input) => input is InputMember
type Handler<Input, Output> = (input: Input) => Output
type Maybe<T> = T | typeof unmatched
type Lazy<T> = () => T

const when = <Input, InputMember extends Input, Output>(
  input: Input,
  matcher: Matcher<Input, InputMember>,
  handler: Handler<InputMember, Output>
): Lazy<Maybe<Output>> =>
  () =>
    matcher(input) ? handler(input) : unmatched;

const otherwise = <Input, Output>(
  input: Input,
  handler: Handler<Input, Output>
): Lazy<Output> =>
  () => handler(input);

const match = <Output>(...lazyConditionalBindings: [ ...Lazy<Maybe<Output>>[], Lazy<Output> ]): Output => {
  const lazyOutputs = lazyConditionalBindings.slice(0, -1) as Lazy<Maybe<Output>>[];
  const lazyDefaultOutput = lazyConditionalBindings.slice(-1)[0] as Lazy<Output>;
  let maybeOutput: Maybe<Output> = unmatched;
  for (let lazyOutput of lazyOutputs) {
    maybeOutput = lazyOutput();
    if (maybeOutput !== unmatched) {
      return maybeOutput;
    }
  }
  return lazyDefaultOutput();
};

/**
 * TypeScript infers the return type of `getMaxDimension` based on the
 * handler of the first `when(input, matcher, handler)`.
 * 
 * Note that you can support mixed return types by explicitly passing
 * them to the generic argument `Output` for `match()`.
 */

const getMaxDimension = (shape: Shape): number =>
  match(
    /**
     * Observe that the type of shape has been narrowed...
     */
    when(shape, shapeIsSphere, shape => shape.radius * 2),
    /**
     * ...can be destructured safely...
     */
    when(shape, shapeIsRectangularCuboid, ({ width, height, length }) => Math.max(width, height, length)),
    /**
     * ...and a default case is mandatory, at least in this case. What
     * happens when this `otherwise()` line is commented out? Now what
     * happens when you also remove the return annotation on
     * `getMaxDimension()`?
     */
    otherwise(shape, () => { throw new TypeError('Unrecognized shape') })
  );
