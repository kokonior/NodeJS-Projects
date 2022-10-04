const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success!');
});

app.listen(3000, () =>
  console.log('app started - go to http://localhost:3000/')
);
