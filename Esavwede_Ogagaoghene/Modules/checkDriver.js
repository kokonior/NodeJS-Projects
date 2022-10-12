var eligibleAgeStart = 18 


function checkDriver(age)
{
    try 
    {
        if( age >= eligibleAgeStart )
        {
            return true 
        }
            return false 
    }
    catch(e)
    {
        console.log(` Error occured while checking driver \n ${ e.message } \n ${ e.stack }`)
        return new Error(e) 
    }
}



module.exports = checkDriver 