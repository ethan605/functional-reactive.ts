// Simple recursion
function simpleFactorial() {
  function fact(level: number): number {
    if (level == 1) return level;
    return level * fact(level - 1);
  }

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(level => console.log(`Simple frac: f(${level}) =`, fact(level)));
}

function simpleFibo() {
  function fib(level: number): number {
    if (level == 0) return 0;
    if (level == 1 || level == 2) return 1;
    return fib(level - 1) + fib(level - 2);
  }

  [1, 2, 3, 4, 5, 10, 20].forEach(level => console.log(`Simple fibonacci: f(${level}) =`, fib(level)));
}

// Tail recursion
function tailFact() {
  function factAux(level: number, acc: number): number {
    if (level == 1) return acc;
    return factAux(level - 1, acc * level);
  }

  function fact(level: number) {
    return factAux(level, 1);
  }

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(level => console.log(`Tail fact: f(${level}) =`, fact(level)));
}

function tailFib() {
  function fibAux(level: number, acc1: number, acc2: number): number {
    if (level <= 0) return acc1;
    return fibAux(level - 1, acc2, acc1 + acc2);
  }

  function fib(level: number): number {
    return fibAux(level, 0, 1);
  }

  [1, 2, 3, 4, 5, 10, 20].forEach(level => console.log(`Tail fibonacci: f(${level}) =`, fib(level)));
}

// Tail call test
function tailCallTest() {
  function sum(level: number, acc: number): number {
    console.log(`Call at level ${level} with acc of ${acc}`);
    if (level == 0) return acc;
    return sum(level - 1, acc + level);
  }

  const bigSum = sum(7800, 0);
  console.log(bigSum);
}

// Currying
function currying() {
  function normalMaker(id: number, email: string, name: string): object {
    return { id, email, name };
  }

  function userMaker(id: number) {
    return function emailMaker(email: string) {
      return function nameMaker(name: string): object {
        return { id, email, name };
      }
    }
  }

  const lambdaMaker = (id: number) => (email: string) => (name: string): object => {
    return { id, email, name };
  };
  
  console.log(normalMaker(1, 'email@example.com', 'Test User'));
  console.log(userMaker(1)('email@example.com')('Test User'));
  console.log(lambdaMaker(1)('email@example.com')('Test User'));
}

currying();