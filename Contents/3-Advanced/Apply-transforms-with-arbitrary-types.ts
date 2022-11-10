type Transform<A, B> = (input: A) => B

type Transforms<Pipes> = Pipes extends [ infer A, infer B ]
  ? [ Transform<A, B> ]
  : Pipes extends [ infer A, infer B, ...infer Rest ]
    ? [ Transform<A, B>, ...Transforms<[B, ...Rest]> ]
    : never

type FirstElementInTuple<Tuple> = Tuple extends [ infer First, ...infer _ ]
  ? First
  : never

type SecondElementInTuple<Tuple> = Tuple extends [ infer _First, infer Second, ...infer _Tail ]
  ? Second
  : never

type LastElementInTuple<Tuple> = Tuple extends [ ...infer _, infer Last ]
  ? Last
  : never

type TupleTail<Tuple> = Tuple extends [ infer _, ...infer Tail ]
  ? Tail
  : never

type TupleOfTwoOrMore<T> = [ T, T, ...T[] ]

const testTransforms: Transforms<[ number, string, string[] ]> = [
  number => String(number),
  string => string.split('')
];

const applyTransforms = <Pipes extends TupleOfTwoOrMore<unknown> = never>(
  input: FirstElementInTuple<Pipes>,
  transforms: Transforms<Pipes>
): LastElementInTuple<Pipes> => {
  const headTransform = transforms[0] as Transform<FirstElementInTuple<Pipes>, SecondElementInTuple<Pipes>>
  const tailTransforms = transforms.slice(1) as TupleTail<Transforms<Pipes>>
  const output = headTransform(input);
  if (!tailTransforms.length) {
    return output as LastElementInTuple<Pipes>;  
  }
  // TODO: How do I prove to TypeScript that `TupleTail<Pipes>` still
  // has two or more elements left when `tailTransforms` has any length
  // left?
  return applyTransforms<TupleTail<Pipes>>(output, tailTransforms);
};

const oneTwoThree = applyTransforms<[ number, string, string[] ]>(123, [
  number => String(number),
  string => string.split('')
]);

export default applyTransforms;
