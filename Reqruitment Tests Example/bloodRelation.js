
function check(parentA, parentB, child) {
  
  const list = {
    A: {
      A: ["A", "O"],
      B: ["A", "B", "O", "AB"],
      O: ["A", "O"],
      AB: ["A", "B", "AB"],
    },
    B: {
      B: ["B", "O"],
      O: ["B", "O"],
      AB: ["A", "B", "AB"],
    },
    O: {
      O: ["O"],
      AB: ["A", "B"],
    },
    AB: {
      AB: ["A", "B", "AB"],

    },
  };
  if (Object.keys(list).includes(parentA)) {
    const prnt = list[parentA];
    if (Object.keys(prnt).includes(parentB)) {
      const getRest = prnt[parentB];
      return getRest.includes(child) ? true : false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

console.log(check("B", "O", "B"));
