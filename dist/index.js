"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("lodash/fp");
var User = /** @class */ (function () {
    function User(person) {
        var id = person.id, name = person.name;
        this.id = id || -1;
        this.name = name || 'No name';
    }
    return User;
}());
function makeUser(id, name) {
    return new User({ id: id, name: name });
}
var userMaker = $.curry(makeUser);
console.log(userMaker(1)('Test'));
