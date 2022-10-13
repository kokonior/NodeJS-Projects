const a = ["password", "secret", "traveloka"];

function checkUpperCase(textArray) {
  let len = 0;
  textArray.forEach((a) => {
    if (a == a.toUpperCase()) {
      len += 1;
    }
  });
  return len;
}

function hasNumber(string) {
  return /\d/.test(string);
}

function isGoodPassword(p, a) {
  let checkGood = "";
  let checkGoodChar = "";
  let checkGoodLength = "";
  let checkGoodCommon = "";
  p = p.trim();
  let pecah = p.split("");
  if (checkUpperCase(pecah) >= 4 && hasNumber(p)) {
    checkGoodChar += " Good Character Type,";
  } else {
    checkGoodChar += " Bad Character Type,";
  }
  if (p.length >= 25 && p.length <= 500) {
    checkGoodLength += " Good Length,";
  } else {
    checkGoodLength += " Bad Length,";
  }
  let o = 0;
  a.forEach((s) => {
    if (p.match(s)) {
      o += 1;
    }
  });
  if (o > 0) {
    checkGoodCommon += " Bad Commonality";
  } else {
    checkGoodCommon += " Good Commonality";
  }
  if (checkGoodCommon.match("Bad") || checkGoodLength.match("Bad") || checkGoodChar.match("Bad")) {
    checkGood += "Bad Password:";
  } else {
    checkGood += "Good Password:";
  }
  return checkGood + checkGoodLength + checkGoodChar + checkGoodCommon;
}

console.log(isGoodPassword("travelokaDuluPayLaterKemudian", a));
