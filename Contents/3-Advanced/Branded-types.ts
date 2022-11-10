import type { Sphere } from '../1-Basics/2-Composition-with-unions-and-intersections';

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
 * This is also useful in distinguishing between validated and
 * unvalidated values.
 */

declare const validEmailAddressBrand: unique symbol;
type ValidEmailAddress = Brand<string, typeof validEmailAddressBrand>

const validateEmailAddress = (unvalidatedEmailAddress: string): ValidEmailAddress => {
  const rfc5321EmailAddressRegExp = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/
  if (rfc5321EmailAddressRegExp.test(unvalidatedEmailAddress)) {
    return unvalidatedEmailAddress as ValidEmailAddress
  }
  throw new Error(`The address "${ unvalidatedEmailAddress }" is not RFC-5321 compliant`);
}

/**
 * So now we can distinguish between strings and save ourselves from
 * accidentally doing something like this.
 */

// const validEmailAddress: ValidEmailAddress = 'abc@example.com';

/**
 * Instead, we must do this.
 */

const validEmailAddress: ValidEmailAddress = validateEmailAddress('abc@example.com');

/**
 * Interestingly, TypeScript tends not to complain when you give it
 * types with *extra* properties. Only when there are *missing*
 * properties. In this case, if we're using some third-party API that
 * takes an email address as a plain string...
 */

const signUp = async (_emailAddress: string): Promise<boolean> => {
  // ...
  return true;
};

/**
 * ...we can pass it a `ValidEmailAddress` type because it a `string`
 * *and* a brand.
 */

signUp(validEmailAddress);

/**
 * The other drawback to branded types is their verbosity. For every
 * new brand, we need to declare another unique symbol.
 */

declare const validIntegerBrand: unique symbol;
type ValidInteger = Brand<number, typeof validIntegerBrand>

const validateInteger = (unvalidatedInteger: number): ValidInteger => {
  if (Number.isInteger(unvalidatedInteger)) {
    return unvalidatedInteger as ValidInteger;
  }
  throw new Error(`The number ${ unvalidatedInteger } is not an integer`);
};

const validInteger: ValidInteger = validateInteger(123);
