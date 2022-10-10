// This is a simple scheduler with node js 

// node-cron scheduling module 
const cron = require('node-cron') 


// new cron job definition 
const minuteJob = cron.schedule('* * * * *',()=>{
    console.log(' This is a cron job that runs every minute ') 
})


// starting new cron job 
minuteJob.start() 