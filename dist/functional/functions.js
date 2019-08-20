"use strict";
// First-class function
function firstClassFunctions() {
    var sum = function (lhs, rhs) {
        return lhs + rhs;
    };
    console.log('Function sum:', sum);
    console.log('Sum of 1 & 2 is:', sum(1, 2));
}
// Pure function
function pureFunctions() {
    var pureIncrement = function (counter) {
        return counter + 1;
    };
    var globalCounter = 0;
    var localCounter = -1;
    var impureIncrement = function () {
        globalCounter += 1;
        localCounter = globalCounter;
        return globalCounter;
    };
    var counter = 0;
    console.log('Pure execution:', pureIncrement(counter));
    console.log('Pure execution:', pureIncrement(counter));
    console.log('Pure execution:', pureIncrement(counter));
    console.log('Impure execution:', impureIncrement());
    console.log('Impure execution:', impureIncrement());
    console.log('Impure execution:', impureIncrement());
}
// Higher-order function & anonymous function
function higherOrderFunction() {
    var arr = [1, 2, 3, 4];
    var double = arr.map(function (element) {
        return element * 2;
    });
    console.log(double);
}
// Closure / lambda
function closureLambda() {
    var counter = 1;
    var lambda = function () {
        console.log('Inner lambda:', counter);
    };
    counter = 2;
    lambda();
}
closureLambda();
