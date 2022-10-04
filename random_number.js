if(!process.argv[2] || isNaN(parseInt(process.argv[2]))){
  throw new Error('Invalid Argument');
} else {
  console.log(Math.floor(Math.random() * Math.pow(10, parseInt(process.argv[2]))));
}
