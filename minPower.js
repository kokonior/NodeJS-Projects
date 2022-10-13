const minimal = (a,b) => {
	if (a > b) {
      return b;
    } else if (a < b) {
      return a;
    } else {
      return a;
    }
}
  
const power = (a,b) => {
	return a**b;
}

// Example Minimal
console.log(minimal(1, 4))
console.log(minimal(3, 3))

// Example Power
console.log(power(3, 3) )
console.log(power(4, 0.5))