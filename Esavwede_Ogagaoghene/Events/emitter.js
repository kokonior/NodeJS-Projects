const EventEmitter = require('events') 
const myEmitter = new EventEmitter() 



myEmitter.on('ping',()=>{
    console.log(' Pong ')
})


const emitWaitTime = 10000
setTimeout(()=>{ myEmitter.emit("ping") }, emitWaitTime )