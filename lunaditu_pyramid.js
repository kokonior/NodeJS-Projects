/*
MODULE DONE BY https://github.com/Lunaditu

This module checks if the given array has a pyramid pattern and returns true if so. 
*/

/**
 * @param {Array} array 
 * @param {String} seperator (default is space (' '))
 * @returns Boolean -> isPyramid
 */
 function Streak (array, seperator=' ') {
    if (array.length%2 == 0) return;
    let first = array[0];
    let mid = (array.length+1)/2;
    let cont = true;
    array.forEach((item, index) => {
        if (cont) {
            if (item.split(seperator).every((val, i, arr) => val == first)) { cont=true; }
            else { cont = false; }
    }});
    return cont;
}

module.exports = {Streak}


/* TESTS */

let arr1 = [
    'KEKW',
    'KEKW KEKW',
    'KEKW KEKW KEKW',
    'KEKW KEKW',
    'KEKW'
];

let arr2 = [
    'KEKW',
    'KEKW KEKW',
    'KEKW KEKW KEKW',
    'KEKW KEKWW',
    'KEKW'
];

console.log(Streak(arr1));
console.log(Streak(arr2));