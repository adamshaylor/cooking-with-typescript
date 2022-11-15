import { Animal, Pet } from '../1-Basics/2-Composition-with-unions-and-intersections';

/**
 * There's a `Pick` utility type, but what if you want a type-safe
 * `pick()` function?
 */

const pick = <
  Source extends object,
  PickedProperty extends keyof Source
>(
  source: Source,
  properties: Readonly<PickedProperty[]>
): Pick<Source, PickedProperty> => {
  const picked: Partial<Pick<Source, PickedProperty>> = {};
  properties.forEach(property => {
    picked[property] = source[property];
  });
  return picked as Pick<Source, PickedProperty>;
};

/**
 * Now we can safely pick a subset of this interface at runtime.
 * 
 * Notice that the return type gives us some additional safety that
 * ensures we picked all the properties we need, but the return type
 * can be inferred because `pick()` is generically typed.
 * 
 * Notice also that TypeScript will allow us to over-pick without
 * warning us. This is, unfortunately, by design. I happen to disagree
 * with it. Though it might make sense to make the language permissive
 * by default, there may be cases where we could over-pick and fall out
 * of conformance with some external schema or create unintended memory
 * management problems. It would be nice to at least have the option.
 * There is an open request to support exact types here:
 * 
 * https://github.com/Microsoft/TypeScript/issues/12936
 */

const extractAnimalFromPet = (pet: Pet): Animal =>
  pick(pet, [ 'genus', 'species' ]);

export default pick;
