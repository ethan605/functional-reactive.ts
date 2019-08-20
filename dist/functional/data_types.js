"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Functors
 *
 * map :: (a -> b) -> Fa -> Fb
 * <$> :: (a -> b) -> Fa -> Fb
 */
var map = function (f) {
    return function (a) {
        if (a.value == null)
            return Nothing();
        return new Maybe(f(a.value));
    };
};
/**
 * Applicatives
 *
 * apply :: F(a -> b) -> Fa -> Fb
 * <*> :: F(a -> b) -> Fa -> Fb
 */
var apply = function (f) {
    return function (a) {
        if (f.value == null || a.value == null)
            return Nothing();
        return new Maybe(f.value(a.value));
    };
};
/**
 * Monads
 *
 * flatMap :: Ma -> (a -> Mb) -> Mb
 * >>= :: Ma -> (a -> Mb) -> Mb
 */
var flatMap = function (a) {
    return function (f) {
        if (a.value == null)
            return Nothing();
        return f(a.value);
    };
};
// Maybe data type
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.data = value;
    }
    Object.defineProperty(Maybe.prototype, "value", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Maybe.prototype.toString = function () {
        if (this.data == null)
            return 'Nothing';
        return "Just(" + this.data + ")";
    };
    Maybe.prototype.map = function (f) {
        return map(f)(this);
    };
    Maybe.prototype.apply = function (f) {
        return apply(f)(this);
    };
    Maybe.prototype.flatMap = function (f) {
        return flatMap(this)(f);
    };
    return Maybe;
}());
// Constructors
function Just(value) { return new Maybe(value); }
function Nothing() { return new Maybe(); }
function demoFunctors() {
    var nothing = Nothing();
    var just3 = Just(3);
    var add1 = function (t) { return t + 1; };
    var mult3 = function (t) { return t * 3; };
    var results = [
        map(add1)(nothing),
        map(add1)(just3),
        map(mult3)(map(add1)(just3)),
        map(mult3)(map(add1)(nothing)),
    ];
    var anotherResults = [
        nothing.map(add1),
        just3.map(add1),
        just3.map(add1).map(mult3),
    ];
    results.forEach(function (result, index) { return console.log("result " + (index + 1) + ": " + result); });
    anotherResults.forEach(function (result, index) { return console.log("another result " + (index + 1) + ": " + result); });
}
function demoApplicatives() {
    var nothing = Nothing();
    var just3 = Just(3);
    var justDoNothing = Nothing();
    var justAdd1 = Just(function (t) { return t + 1; });
    var justMult3 = Just(function (t) { return t * 3; });
    var results = [
        apply(justAdd1)(nothing),
        apply(justAdd1)(just3),
        apply(justMult3)(apply(justAdd1)(just3)),
        apply(justDoNothing)(nothing),
        apply(justDoNothing)(just3),
    ];
    var anotherResults = [
        nothing.apply(justAdd1),
        just3.apply(justAdd1),
        just3.apply(justAdd1).apply(justMult3),
        nothing.apply(justDoNothing),
        just3.apply(justDoNothing),
    ];
    results.forEach(function (result, index) { return console.log("result " + (index + 1) + ": " + result); });
    anotherResults.forEach(function (result, index) { return console.log("another result " + (index + 1) + ": " + result); });
}
function demoMonads() {
    var nothing = Nothing();
    var just3 = Just(3);
    var add1 = function (t) { return new Maybe(t + 1); };
    var mult3 = function (t) { return new Maybe(t * 3); };
    var results = [
        flatMap(nothing)(add1),
        flatMap(just3)(add1),
        flatMap(flatMap(just3)(add1))(mult3),
    ];
    var anotherResults = [
        nothing.flatMap(add1),
        just3.flatMap(add1),
        just3.flatMap(add1).flatMap(mult3),
    ];
    results.forEach(function (result, index) { return console.log("result " + (index + 1) + ": " + result); });
    anotherResults.forEach(function (result, index) { return console.log("another result " + (index + 1) + ": " + result); });
}
function demoMonadsOnAray() {
    var nothing = Nothing();
    var just3 = Just([3, 4]);
    var add1 = function (t) { return new Maybe(t.concat([1])); };
    var mult3 = function (t) { return new Maybe(_.flatten(_.fill(Array(3), t))); };
    var results = [
        flatMap(nothing)(add1),
        flatMap(just3)(add1),
        flatMap(just3)(mult3),
        flatMap(flatMap(just3)(add1))(mult3),
    ];
    var anotherResults = [
        nothing.flatMap(add1),
        just3.flatMap(add1),
        just3.flatMap(mult3),
        just3.flatMap(add1).flatMap(mult3),
    ];
    results.forEach(function (result, index) { return console.log("result " + (index + 1) + ": " + result); });
    anotherResults.forEach(function (result, index) { return console.log("another result " + (index + 1) + ": " + result); });
}
// demoFunctors();
// demoApplicatives();
// demoMonads();
// demoMonadsOnAray(); 
