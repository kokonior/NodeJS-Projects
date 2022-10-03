Connection = function(){
	var xhr = new XMLHttpRequest();
	var url = 'http://localhost:8080';
	var game_callback = function(){};
	var timeout = 2;
	var last_command = null;
	var last_value = null;
	var self = this;
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			game_callback(JSON.parse(xhr.responseText));
			// reset the timeout to default
			timeout = 1;
		}
	}
	xhr.onerror = function()
	{
		Game.message('There is a problem with the connection. Reconnect in ' + timeout + ' seconds');
		window.setTimeout(function(){
			Game.message('Reconnecting...');
			self.send(last_command, last_value, game_callback);
		},timeout * 1000);
		if (timeout < 10) {
			timeout += 1;
		} 
	}
	this.send = function(command, value, callback) {
		last_command = command;
		last_value = value;
		game_callback = callback;
		data = {
			room: 'test',
			command: command,
			value: value
		}
		xhr.open('POST', url);
		xhr.send(JSON.stringify(data));
	}
	
	this.stop = function(){
		xhr.abort();
	}
}
