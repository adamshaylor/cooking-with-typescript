import type { Sphere } from '../1-Basics/2-Composition-with-unions-and-intersections';
import { Result } from '../2-Everyday-types/7-Result';

/**
 * TypeScript doesn't care what the name of a type is. Its type system
 * is structural, meaning that two types with different names are
 * treated the same so long as their structure is the same. This can
 * be useful for interoperability purposes, but can also a problem when
 * we need to distinguish between two structurally equivalent values.
 * 
 * Revisiting our `Sphere` for example...
 */

const radiusInInches = 5;

const sphere: Sphere = {
  radius: radiusInInches
};

/**
 * How is anyone consuming `sphere` supposed to know that it's in
 * inches? And even if they did know, what's to stop them from making
 * a mistake and applying the wrong unit?
 */

const radiusInCentimeters = 100;
sphere.radius = radiusInCentimeters;

 /**
 * 
 * The most common workaround in TypeScript is called *branded types*.
 * The approach is described and criticized in this article, which
 * contrasts branded types with Elm's natively supported *opaque*
 * types:
 * 
 * https://incrementalelm.com/opaque-types-let-you-think-locally/
 * 
 * Ideally, this would be resolved at the language level. The idea has
 * been floated at least a couple of times. It was received with
 * interest, but without urgency:
 * 
 * * https://github.com/microsoft/TypeScript/issues/202
 * * https://github.com/microsoft/TypeScript/issues/38510#issuecomment-631188003
 */

type Brand<T, Brand extends symbol> = T & {
  // This violates the principle of not modifying objects you don't
  // own, but only at compile time.
  __brand: Brand
}

declare const centimetersBrand: unique symbol;
type Centimeters = Brand<number, typeof centimetersBrand>

/**
 * Here comes the magic of branding ("magic" in both the ). We're
 * pretending with the `as` operator that there's an extra `__brand`
 * property on this type at compile time that does not actually exist
 * at runtime.
 */

const centimeters = (unitless: number): Centimeters =>
  unitless as Centimeters;

interface SphereInCentimeters {
  radius: Centimeters
}

const sphereInCentimeters: SphereInCentimeters = {
  radius: centimeters(100)
};

/**
 * Now if we had some value in another unit...
 */

declare const inchesBrand: unique symbol;
type Inches = Brand<number, typeof inchesBrand>
const brandedRadiusInInches: Inches = 5 as Inches;

/**
 * ...We couldn't accidentally apply it to an object expecting another
 * unit, even though they're both just numbers at runtime.
 */

// sphereInCentimeters.radius = brandedRadiusInInches;

/**
 * The other drawback to branded types is their verbosity. For every
 * new brand, we need to declare another unique symbol. Given all this
 * verbosity, I personally prefer to wrap values in more explicit data
 * structures, but there may be some reason why this might not be
 * feasible in some cases.
 */

declare const integerBrand: unique symbol;
type Integer = Brand<number, typeof integerBrand>

const int = (maybeInteger: number): Integer => {
  if (Number.isInteger(maybeInteger)) {
    return maybeInteger as Integer;
  }
  throw new Error(`Cannot create an Integer from ${ maybeInteger } because it is not an integer`);
};
