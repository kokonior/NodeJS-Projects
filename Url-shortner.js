const DICTIONARY =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');


const encodeId = number => {
    const base = DICTIONARY.length;
    let encoded = '';

    number === 0 && DICTIONARY[0];

    while (number > 0) {
        encoded += DICTIONARY[number % base];
        number = Math.floor(number / base);
    }

    return reverseWord(encoded);
};


const reverseWord = string => {
    let reversed = '';
    for (let i = string.length - 1; i >= 0; i--) {
        reversed += string.charAt(i);
    }
    return reversed;
};



const decodeId = id => {
    const base = DICTIONARY.length;
    let decoded = 0;

    for (let index = 0; index < id.split('').length; index++) {
        decoded = decoded * base + DICTIONARY.indexOf(id.charAt(index));
    }

    return decoded;
};

