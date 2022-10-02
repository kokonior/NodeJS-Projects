// Simple Node Js HTTP SERVER 


const http = require('http')
const express = require('express')
const app = express() 

app.get('/',(req, res, next)=>{
    res.send(' Welcome to express ')
})


const httpServer = http.createServer(app) 
const PORT = 5000 


httpServer.listen(PORT,()=>{ console.log(` Server listening on port ${ PORT }`)})