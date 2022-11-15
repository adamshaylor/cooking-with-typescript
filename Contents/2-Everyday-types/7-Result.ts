/**
 * A `Result` is a concept borrowed from Elm, which in turn probably
 * got it from Haskell. It encourages returning error data instead of
 * throwing them, which breaks the flow of execution.
 */

export interface OkResult<ResultData> {
  ok: true,
  data: ResultData
}

export interface ErrorResult {
  ok: false,
  error: Error
}

export type Result<ResultData> = OkResult<ResultData> | ErrorResult

export const resultIsOk = <ResultData>(result: Result<ResultData>): result is OkResult<ResultData> =>
  result.ok === true;

export const resultIsError = <ResultData>(result: Result<ResultData>): result is ErrorResult =>
  result.ok === false;

const divide = (dividend: number, divisor: number): Result<number> => {
  const quotient = dividend / divisor;

  if (isNaN(quotient)) {
    const result: ErrorResult = {
      ok: false,
      error: new Error(`The result of ${ dividend } / ${ divisor } is not a number`)
    };
    return result;
  }

  const result: OkResult<number> = {
    ok: true,
    data: quotient
  };

  return result;
};

/**
 * This works great when we're working on a collection of data and
 * don't want to interrupt that work because of a single error.
 */

const numbersToDivide: Array<readonly [ number, number ]> = [
  [ 0, 1 ],
  [ 1, 2 ],
  [ 2, 3 ],
  [ 3, 4 ]
];

const divisionResults = numbersToDivide.map(([ dividend, divisor ]) =>
  divide(dividend, divisor)
);

/**
 * And if we really want to throw, we can throw errors for the whole
 * operation so we can see all the points of failure, not just the
 * first one.
 */

const divisionErrors = divisionResults.filter(resultIsError);
if (divisionErrors.length) {
  const errors = divisionErrors.map(result => result.error);
  throw errors;
}
