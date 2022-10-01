'use strict'

Array.prototype.shuffle = function() {
    const positions = [...Array(this.length).keys()].sort((a, b) => 0.5 - Math.random());
    const result = [];

    this.forEach((element, index) => {
       result[positions[index]] = element;
    });

    return result;
};

Array.zip = function (a, b) {
    if (a.length !== b.length) throw new Error("a and b must be the same size to be zipped")
    return a.map((e, i) => [e, b[i]]);
}