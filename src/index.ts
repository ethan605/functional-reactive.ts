import * as _ from 'lodash';
import * as $ from 'lodash/fp';

interface Person {
  id?: number
  name?: string
}

class User {
  id: number
  name: string

  constructor(person: Person) {
    const { id, name } = person;
    this.id = id || -1;
    this.name = name || 'No name';
  }
}

function makeUser(id: number, name: string): User {
  return new User({ id, name });
}

const userMaker = $.curry(makeUser);
console.log(userMaker(1)('Test'));
