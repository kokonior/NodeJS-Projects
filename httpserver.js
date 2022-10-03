var http = require("http"); // Ask Node.js to 
http.createServer(function(request,response) { 
   response.writeHead(200, {"Content-Type": "text/plain"}); 
   response.write("Hello World"); 
   response.end();
   }).listen(8888); 
console.log("Server running at http://localhost:8888/") 
