"use strict";

function toLower(inputText) {
    let lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let temp = "";
    for (let i = 0; i < inputText.length; i++) {
        let isLower = true;
        for (let j = 0; j < upper.length; j++) {
            if (inputText.charAt(i) === upper[j]) {
                isLower = false;
                temp += lower[j];
            }
        }
        if (isLower) {
            temp += inputText.charAt(i);
        }
    }
    return temp;
}

function isLetterArray(inputText) {
    let lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let text = toLower(inputText);
    for (let i = 0; i < lower.length; i++) {
        if (text[0] === lower[i]) {
            return true;
        }
        else {
            return false;
        }
    }
    return temp;
}
console.log(isLetterArray(9))
