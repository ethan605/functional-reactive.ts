import * as _ from 'lodash';

/**
 * Interfaces
 */
type Just<T> = T;
type Nothing = null | undefined;
type MaybeType<T> = Just<T> | Nothing;
interface Maybe<T> {}

type FunctorTransform<T> = (t: T) => T;
type ApplicativeTransform<T> = Maybe<(t: T) => T>;
type MonadTransform<T> = (t: T) => Maybe<T>;

/**
 * Functors
 * 
 * map :: (a -> b) -> Fa -> Fb
 * <$> :: (a -> b) -> Fa -> Fb
 */
const map = function <T>(f: FunctorTransform<T>): Function {
  return function (a: Maybe<T>): Maybe<T> {
    if (a.value == null) return Nothing<T>();
    return new Maybe(f(a.value));
  }
}

/**
 * Applicatives
 * 
 * apply :: F(a -> b) -> Fa -> Fb
 * <*> :: F(a -> b) -> Fa -> Fb
 */
const apply = function <T>(f: ApplicativeTransform<T>): Function {
  return function (a: Maybe<T>): Maybe<T> {
    if (f.value == null || a.value == null) return Nothing<T>();
    return new Maybe(f.value(a.value));
  }
}

/**
 * Monads
 * 
 * flatMap :: Ma -> (a -> Mb) -> Mb
 * >>= :: Ma -> (a -> Mb) -> Mb
 */
const flatMap = function <T>(a: Maybe<T>): Function {
  return function (f: MonadTransform<T>): Maybe<T> {
    if (a.value == null) return Nothing<T>();
    return f(a.value);
  }
}

// Maybe data type
class Maybe<T> {
  private data: Just<T> | Nothing;
  
  constructor(value?: T) {
    this.data = value;
  }
  
  get value() {
    return this.data;
  }
  
  toString() {
    if (this.data == null) return 'Nothing';
    return `Just(${this.data})`;
  }

  map(f: FunctorTransform<T>): Maybe<T> {
    return map(f)(this);
  }

  apply(f: ApplicativeTransform<T>): Maybe<T> {
    return apply(f)(this);
  }

  flatMap(f: MonadTransform<T>): Maybe<T> {
    return flatMap(this)(f);
  }
}

// Constructors
function Just<T>(value: T): Maybe<T> { return new Maybe(value); }
function Nothing<T>(): Maybe<T> { return new Maybe(); }

function demoFunctors() {
  const nothing: Maybe<number> = Nothing();
  const just3: Maybe<number> = Just(3);
  const add1: FunctorTransform<number> = t => t + 1;
  const mult3: FunctorTransform<number> = t => t * 3;
  
  const results = [
    map<number>(add1)(nothing),
    map<number>(add1)(just3),
    map<number>(mult3)(
      map<number>(add1)(just3)
    ),
    map<number>(mult3)(
      map<number>(add1)(nothing)
    ),
  ];

  const anotherResults = [
    nothing.map(add1),
    just3.map(add1),
    just3.map(add1).map(mult3),
  ];

  results.forEach((result, index) => console.log(`result ${index + 1}: ` + result));
  anotherResults.forEach((result, index) => console.log(`another result ${index + 1}: ` + result));
}

function demoApplicatives() {
  const nothing: Maybe<number> = Nothing();
  const just3: Maybe<number> = Just(3);
  const justDoNothing: ApplicativeTransform<number> = Nothing();
  const justAdd1: ApplicativeTransform<number> = Just((t: number) => t + 1);
  const justMult3: ApplicativeTransform<number> = Just((t: number) => t * 3);

  const results = [
    apply<number>(justAdd1)(nothing),
    apply<number>(justAdd1)(just3),
    apply<number>(justMult3)(
      apply<number>(justAdd1)(just3)
    ),
    apply<number>(justDoNothing)(nothing),
    apply<number>(justDoNothing)(just3),
  ];

  const anotherResults = [
    nothing.apply(justAdd1),
    just3.apply(justAdd1),
    just3.apply(justAdd1).apply(justMult3),
    nothing.apply(justDoNothing),
    just3.apply(justDoNothing),
  ]

  results.forEach((result, index) => console.log(`result ${index + 1}: ` + result));
  anotherResults.forEach((result, index) => console.log(`another result ${index + 1}: ` + result));
}

function demoMonads() {
  const nothing: Maybe<number> = Nothing();
  const just3: Maybe<number> = Just(3);
  const add1: MonadTransform<number> = t => new Maybe(t + 1);
  const mult3: MonadTransform<number> = t => new Maybe(t * 3);

  const results = [
    flatMap<number>(nothing)(add1),
    flatMap<number>(just3)(add1),
    flatMap<number>(
      flatMap<number>(just3)(add1)
    )(mult3),
  ];

  const anotherResults = [
    nothing.flatMap(add1),
    just3.flatMap(add1),
    just3.flatMap(add1).flatMap(mult3),
  ];

  results.forEach((result, index) => console.log(`result ${index + 1}: ` + result));
  anotherResults.forEach((result, index) => console.log(`another result ${index + 1}: ` + result));
}

function demoMonadsOnAray() {
  const nothing: Maybe<number[]> = Nothing();
  const just3: Maybe<number[]> = Just([3,4]);
  const add1: MonadTransform<number[]> = t => new Maybe(t.concat([1]));
  const mult3: MonadTransform<number[]> = t => new Maybe(_.flatten(_.fill(Array(3), t)));

  const results = [
    flatMap<number[]>(nothing)(add1),
    flatMap<number[]>(just3)(add1),
    flatMap<number[]>(just3)(mult3),
    flatMap<number[]>(
      flatMap<number[]>(just3)(add1)
    )(mult3),
  ];

  const anotherResults = [
    nothing.flatMap(add1),
    just3.flatMap(add1),
    just3.flatMap(mult3),
    just3.flatMap(add1).flatMap(mult3),
  ];

  results.forEach((result, index) => console.log(`result ${index + 1}: ` + result));
  anotherResults.forEach((result, index) => console.log(`another result ${index + 1}: ` + result));
}

// demoFunctors();
// demoApplicatives();
// demoMonads();
// demoMonadsOnAray();