const checkDriver = require('./checkDriver')

console.log(' This is a simple app to check if a driver is eligible to drive on the road')


const driverAge = 17 // Input your age here 


const driverIsEligibleToDrive = checkDriver(99)

console.log(` Driver is eligible to drive result:  ${ driverIsEligibleToDrive }`)