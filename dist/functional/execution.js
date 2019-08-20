"use strict";
// Simple recursion
function simpleFactorial() {
    function fact(level) {
        if (level == 1)
            return level;
        return level * fact(level - 1);
    }
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function (level) { return console.log("Simple frac: f(" + level + ") =", fact(level)); });
}
function simpleFibo() {
    function fib(level) {
        if (level == 0)
            return 0;
        if (level == 1 || level == 2)
            return 1;
        return fib(level - 1) + fib(level - 2);
    }
    [1, 2, 3, 4, 5, 10, 20].forEach(function (level) { return console.log("Simple fibonacci: f(" + level + ") =", fib(level)); });
}
// Tail recursion
function tailFact() {
    function factAux(level, acc) {
        if (level == 1)
            return acc;
        return factAux(level - 1, acc * level);
    }
    function fact(level) {
        return factAux(level, 1);
    }
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function (level) { return console.log("Tail frac: f(" + level + ") =", frac(level)); });
}
function tailFib() {
    function fibAux(level, acc1, acc2) {
        if (level <= 0)
            return acc1;
        return fibAux(level - 1, acc2, acc1 + acc2);
    }
    function fib(level) {
        return fibAux(level, 0, 1);
    }
    [1, 2, 3, 4, 5, 10, 20].forEach(function (level) { return console.log("Tail fibonacci: f(" + level + ") =", fib(level)); });
}
// Tail call test
function tailCallTest() {
    function sum(level, acc) {
        console.log("Call at level " + level + " with acc of " + acc);
        if (level == 0)
            return acc;
        return sum(level - 1, acc + level);
    }
    var bigSum = sum(7800, 0);
    console.log(bigSum);
}
// Currying
function currying() {
    function normalMaker(id, email, name) {
        return { id: id, email: email, name: name };
    }
    function userMaker(id) {
        return function emailMaker(email) {
            return function nameMaker(name) {
                return { id: id, email: email, name: name };
            };
        };
    }
    var lambdaMaker = function (id) { return function (email) { return function (name) {
        return { id: id, email: email, name: name };
    }; }; };
    console.log(normalMaker(1, 'email@example.com', 'Test User'));
    console.log(userMaker(1)('email@example.com')('Test User'));
    console.log(lambdaMaker(1)('email@example.com')('Test User'));
}
currying();
