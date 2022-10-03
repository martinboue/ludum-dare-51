'use strict';

import './math.js';

Array.prototype.shuffle = function() {
    const result = [];

    while(this.length > 0) {
        result.push(this.popRandom());
    }

    return result;
};

Array.partition = (array, condition) => {
    const match = [];
    const rest = [];

    array.forEach(e => {
        if (condition(e)) {
            match.push(e);
        } else {
            rest.push(e);
        }
    });

    return [match, rest];
};

Array.prototype.pickRandom = function() {
    return this[Math.randomBetween(0, this.length - 1)];
};

Array.prototype.popRandom = function() {
    if (Array.empty(this)) return null;
    return this.splice(Math.randomBetween(0, this.length - 1), 1)[0];
}

Array.zip = function (a, b) {
    if (a.length !== b.length) throw new Error("a and b must be the same size to be zipped");
    return a.map((e, i) => [e, b[i]]);
};

Array.prototype.tail = function() {
    return this.slice(1);
};

Array.prototype.head = function() {
    if (this.length > 0) {
        return this[0];
    }
    return null;
};

Array.prototype.last = function() {
    return this.length > 0 ? this[this.length - 1] : null;
};

Array.prototype.peekRandom = function() {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
};

Array.empty = (array) => array.length <= 0;