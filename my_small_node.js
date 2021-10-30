const express = require('express');

const app = express();

// HTML response
app.get('/', (req, res) => {
  return res.send('<h1>Hello World!</h1>');
})

// API response
app.get('/api', (req,res) => {
  return res.status(200).json({
    message: "Hello World!"
  })
})


app.listen(2222, ()=> {
  console.log(`App running on port ${2222}`);
})