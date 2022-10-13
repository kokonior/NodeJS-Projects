function trianglePattern(height) {
    let result = '';
    for (let i = 0; i < height; i++) {
        for (let j = 0; j <= i; j++) {
            result += "* ";
        }
        result += "\n";
    }
    return result;
}

console.log(trianglePattern(5));
