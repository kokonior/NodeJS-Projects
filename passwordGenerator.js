const passwordGenerator = () => {
  const char = 'abcdefghijklmnopqrstuvwxyz';
  const num = '1234567890';
  const symbol = '!@#$%^&*()_+';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += char.charAt(Math.floor(Math.random() * char.length));
    result += num.charAt(Math.floor(Math.random() * num.length));
    result += symbol.charAt(Math.floor(Math.random() * symbol.length));
  }
  return result;
}

console.log(passwordGenerator());