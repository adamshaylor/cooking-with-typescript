/**
 * A common pattern in JavaScript applications is to have a file of
 * constants. One useful thing TypeScript can do is treat primitive
 * constant values as types.
 */

export const primaryColor = '#FF0000';
export const secondaryColor = '#00FF00';
export const dangerColor = '#FF0000';

/**
 * So we can do this.
 */

type PrimaryColor = typeof primaryColor;
type SecondaryColor = typeof secondaryColor;
type DangerColor = typeof dangerColor;

/**
 * What if our constants live in an object?
 */

const colorPalette = {
  primaryColor,
  secondaryColor,
  dangerColor
};

/**
 * This is OK, but we can do better than a record of strings.
 */

type ColorPalette = typeof colorPalette;

/**
 * JavaScript has `Object.freeze()`, which prevents objects from being
 * mutated at runtime. TypeScript can do a kind of lightweight freeze
 * at compile time with `as const`. I've found it to be perfectly
 * adequate for most cases. It has the added benefit of adding
 * granularity to the types of the object's properties.
 */

const immutablePalette = {
  primaryColor: '#FF0000',
  secondaryColor: '#00FF00',
  dangerColor: '#FF0000'
} as const;

/**
 * Now our object is both a value and a type.
 */

type ImmutablePalette = typeof immutablePalette;

/**
 * Having value constants is helpful in situations like this, where we
 * need to map constants in an object to other values. We can start by
 * constructing a union type based on the values of `ImmutablePalette`.
 * 
 * Notice how we have three keys in `ImmutablePalette` but only two
 * unique values.
 */

type Color = ImmutablePalette[keyof ImmutablePalette];

/**
 * Remember what will happen if we remove or add excess properties to
 * records with union keys?
 */

const colorsToNames: Record<Color, string> = {
  '#FF0000': 'Red',
  '#00FF00': 'Green'
};
