const ronin = require('ronin-server')
const mocks = require('ronin-mocks')
const database = require("ronin-database")
const server = ronin.server()

database.connect( process.env.CONNECTIONSTRING )
server.use('/', mocks.server(server.Router(), false, true))
server.use('/foo', (req, res) => {
	return res.json({"foo": "bar"})
})

server.start()