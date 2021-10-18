const http = require('http');

const server = http.createServer(function (req, res) {
    if (req.url == '/') { 
                
        res.writeHead(200, { 'Content-Type': 'text/html' }); 

        res.write(`
        <html>
            <body>
                <h3>Yeay Its Work</h3>
            </body>
        </html>`);

        res.end();
    }

});

server.listen(9000);

console.log('Node.js web server at port 5000 is running..')