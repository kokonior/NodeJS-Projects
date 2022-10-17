const capitalFirstLetter = (word = '') => {
  const firstLetter = word.slice(0, 1).toLocaleUpperCase();
  return `${firstLetter}${word.substring(1)}`;
}

console.log(capitalFirstLetter('hacktoberfest 2022'));