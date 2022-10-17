const titleCase = (word = '') => {
  let string = word.split(' ');
  let result = [];
  string.forEach((item, idx) => {
    const first = string[idx].slice(0,1).toLocaleUpperCase();
    result.push(`${first}${item.substring(1)}`);
  });
  return result.toString().replace(',', ' ');
}

console.log(titleCase('hacktoberfest hacktoberfest'));