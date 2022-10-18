var http = require('http');

const createServer = async () => {
  await http
    .createServer(function (request, response) {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Hello my server');
    })
    .listen(3000);
  console.log('Server running at port 3000');
};

module.exports = { createServer };
