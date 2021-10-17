export const fizzBuzz = (str) => {
  for (var i = 0; i <= 100; i++) {
    str = (i % 5 == 0 && i % 3 == 0) ? "FizzBuzz" : (i % 3 == 0 ? "Fizz" : (i % 5 == 0) ? "Buzz" : i);
    return str
  }
}