// First-class function
function firstClassFunctions() {
  const sum = function (lhs: number, rhs: number): number {
    return lhs + rhs;
  }
  
  console.log('Function sum:', sum);
  console.log('Sum of 1 & 2 is:', sum(1, 2));
}

// Pure function
function pureFunctions() {
  const pureIncrement = function (counter: number): number {
    return counter + 1;
  }
  
  let globalCounter = 0;
  let localCounter = -1;
  const impureIncrement = function (): number {
    globalCounter += 1;
    localCounter = globalCounter;
    return globalCounter;
  }
  
  const counter = 0;
  console.log('Pure execution:', pureIncrement(counter));
  console.log('Pure execution:', pureIncrement(counter));
  console.log('Pure execution:', pureIncrement(counter));
  
  console.log('Impure execution:', impureIncrement());
  console.log('Impure execution:', impureIncrement());
  console.log('Impure execution:', impureIncrement());
}

// Higher-order function & anonymous function
function higherOrderFunction() {
  const arr = [1, 2, 3, 4];
  const double = arr.map(function (element) {
    return element * 2;
  });

  console.log(double);
}

// Closure / lambda
function closureLambda() {
  let counter = 1;
  const lambda = function () {
    console.log('Inner lambda:', counter);
  }

  counter = 2;
  lambda();
}

closureLambda();
