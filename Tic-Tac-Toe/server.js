var connections = {};
var games = {};
var url = require('url');

var send = function(res, data){
	headers = {
		'Content-type': 'application/json',
		'Access-Control-Allow-Headers': 'Content-type',
		'Access-Control-Allow-Origin': '*'
	}
	message = JSON.stringify(data);
	headers['Contnent-length'] = message.length;
	
	res.writeHead(200, headers);
	res.end(message);
}

var on_request = function(request,response){
	var body = '';
	if (request.method != 'POST') {
		send(response, null);
		return;
	}
	request.on('data', function (data) {
		body += data;
	});
	request.on('end', function(){
		var params = JSON.parse(body);
	
		var room = params.room;
		connections[room] = connections[room] || [];
		games[room] = games[room] || false;
		if (params.command == 'init') {
			if (connections[room].length == 1) {
				games[room] = true;
				send(connections[room][0], {player: 1});
				send(response, {player: 2});
				return;
			}
			if (games[room]) {
				send(response, {player: -1});
			}
		}
		// received command other than init, so game must be started
		games[room] = true; 
		if (params.command == 'set') {
			for (var i = connections[room].length -1; i >= 0; i--) {
				res = connections[room][i];
				send(res, params);
				connections[room].splice(i,1);
			}
		}
		connections[room].push(response);
	});
}

var http = require('http').createServer(on_request).listen(8080);
