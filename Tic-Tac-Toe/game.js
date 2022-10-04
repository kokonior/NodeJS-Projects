var Game = function(table){
	var board = new Board(table);
	var connection = new Connection;
	
	var init_event_listeners = function(player){
		if (player) {
			document.addEventListener('board:set', function(event){
				var is_your_move = (event.detail.symbol == board.symbol);
				if (is_your_move) {
					connection.send('set', event.detail, on_other_player_move);
					Game.message('Waiting for other player to move');
					board.enabled = false;
				} else {
					Game.message('Your turn');
					board.enabled = true;
				}
			});
		} else {
			document.addEventListener('board:set', wait);
		}
		document.addEventListener('board:winning', function(event){
			msg = 'Game Over';
			if (player) {
				msg = is_your_move ? 'You win' : 'You lose';
				toggle_new_game();
			}
			Game.message(msg);
		});
		document.addEventListener('board:full', function(event){
			Game.message('Game over');
			if (player) {
				toggle_new_game();
			}
		});
	}
	
	var on_other_player_move = function(data){
		board.set(data.value.row, data.value.cell, data.value.symbol);
	}
	
	var toggle_new_game = function(){
		document.getElementById('reset').style.display = 'block';
	}
	
	var wait = function(){
		connection.send('wait', null, on_other_player_move);
	}
	
	var game_start = function(data){
		if (data.player == 1) {
			board.symbol = 'X';
			Game.message('Your turn');
			board.enabled = true;
			init_event_listeners(true);
		} else if (data.player == 2) {
			board.symbol = 'O';
			Game.message('Waiting for other player to move');
			init_event_listeners(true);
			wait();
		} else {
			Game.message('You are watching a game');
			init_event_listeners(false);
			wait();
		}
	}
	
	this.run = function(){
		Game.message('Waiting for other player');
		connection.send('init', null, game_start)
	}
}
Game.message = function(msg){
	document.getElementById('message').textContent = msg;
}
