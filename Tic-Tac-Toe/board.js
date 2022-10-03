Board = function(table){
	var self = this;
	this.enabled = false; // the game object controls when the board is enabled
	this.html_cells = []; // the html representation of the board
	this.board = []; // the board matrix, used to represent the game state 
	this.symbol = null; // the symbol player plays with
	
	// cache fileld/total cells so you don't have to loop on each move
	this.filled_cells = 0;
	this.total_cells = 9;
	
	// initialize
	(function(){
		var rows = Array.prototype.slice.call(table.getElementsByTagName('tr'));
		for (var i in rows) {
			self.html_cells[i] = Array.prototype.slice.call(rows[i].getElementsByTagName('td'));
			if (self.html_cells[i].length != rows.length) {
				throw new Error('The table should have the same number of rows and columns');
			}
			self.board[i] = [];
			for (var j in self.html_cells[i]) {
				self.board[i][j] = null;
				self.html_cells[i][j].setAttribute('data-row', i);
				self.html_cells[i][j].setAttribute('data-cell', j);
			}
		}
	})();
	
	table.onclick = function(event){
		if (!self.enabled) {
			return false;
		}
		var row = event.target.getAttribute('data-row'),
			cell = event.target.getAttribute('data-cell');
		
		self.set(row, cell, self.symbol);
	}
	
	var fire_event = function(event_name, data) {
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(event_name, true, true, data);
		document.dispatchEvent(event);
	}
	 
	this.reset = function(){
		for (i in this.board) {
			for (j in this.board[i]) {
				this.board[i][j] = null;
			}
		}
		this.filled_cells = 0;
		fire_event('board:reset');
	}
	
	/**
	 * @param int row
	 * @param int cell
	 * @param mixed value
	 * @return true if the given cell was empty; if you try to set already filled cell returns false
	 */
	this.set = function(row, cell, value) {
		if (typeof this.board[row] == 'undefined') {
			throw new Error('invalid value ' + row + ' for row, must be in [0..' + this.board.length + ']');
		}
		if (typeof this.board[row][cell] == 'undefined') {
			throw new Error('invalid value ' + cell + ' for cell, must be in [0..' + this.board[row].length + ']')
		}
		if (this.board[row][cell] !== null) {
			return false;
		}
		this.board[row][cell] = value;
		this.html_cells[row][cell].textContent = value;
		this.filled_cells++;
		
		fire_event('board:set', {row: row, cell: cell, symbol: value});
		
		var is_winning = this.check_is_winning(row, cell);
		if (!is_winning) {
			this.check_is_full();
		}
		return true;
	}
	
	this.check_is_winning = function(row, cell) {
		var h = v = d1 = d2 = 0,
			board_size = this.board.length,
			value = this.board[row][cell];
		for (i = 0; i < board_size; i++) {
			// check if all of the values are same...
			// ... at the row
			if (this.board[row][i] === value) h++;
			// ... at the column
			if (this.board[i][cell] === value) v++;
			// at the main diagonal
			if (this.board[i][i] === value) d1++;
			// at the secondary diagonal
			if (this.board[i][(board_size-1)-i] === value) d2++;
		}
		
		if (h == board_size || v == board_size || d1 == board_size || d2 == board_size) {
			fire_event('board:winning');
			return true;
		}
		return false;
	}
	this.check_is_full = function(){
		var is_full = (this.filled_cells == this.total_cells);
		if (is_full){
				fire_event('board:full');
		}
		return is_full;
	}
};
