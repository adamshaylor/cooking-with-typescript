/**
 * Using recursion with tuples is a deep, deep rabbit hole. The basic
 * pattern looks like this, but you can do a _lot_ more with it.
 */

type ReverseTuple<Tuple> = Tuple extends []
  ? []
  : Tuple extends [ infer Head, ...infer Tail ]
    ? [ ...ReverseTuple<Tail>, Head ]
    : never

type ABC = [ 'a', 'b', 'c' ]
type CBA = ReverseTuple<ABC>

/**
 * We can also do this with proper tuples, which ought to be
 * `readonly`.
 */

 type ReverseProperTuple<ProperTuple> = ProperTuple extends readonly []
  ? readonly []
  : ProperTuple extends readonly [ infer Head, ...infer Tail ]
    ? readonly [ ...ReverseProperTuple<Tail>, Head ]
    : never

type ABCTuple = readonly [ 'a', 'b', 'c' ]
type CBATuple = ReverseProperTuple<ABCTuple>
