/**
 * TypeScript has support for fixed length arrays with static types per
 * element.
 */

type WordCount = [ word: string, count: number ]

/**
 * So we can do this...
 */

const howManyNectarines: WordCount = [ 'nectarine', 5 ];

/**
 * ...but not this...
 */

// const howManyStrawberries: WordCount = [ 'strawberry', 8, 'I like strawberries. La la la.' ];

/**
 * ...nor this.
 */

// const howManySnowberries: WordCount = [ 'snowberry' ];

/**
 * The drawback to TypeScript tuples is they are not entirely fixed
 * length by themselves...
 */

howManyNectarines.push('Oh no.');
howManyNectarines.splice(0, 3);

/**
 * ...we have to help them be fixed length by making them `readonly`.
 */

type WordCountTuple = Readonly<WordCount>

const howManyOregonGrapes: WordCountTuple = [ 'oregon grape', 23 ];

/**
 * Now our tuple is a proper tuple.
 */

// howManyOregonGrapes.push('Oh no.');
// howManyOregonGrapes.splice(0, 3);
