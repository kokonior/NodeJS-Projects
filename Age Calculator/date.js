function getDay() {
    let today = new Date();
    let options = {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        year: 'numeric'
    }
 let currentDay = today.toLocaleDateString("en-US", options);
 return currentDay;
}
function getYear() {
    let today = new Date();
    let options = {
        year: 'numeric'
    }
 let currentYear = today.toLocaleDateString("en-US", options);
 return currentYear;
}
module.exports ={
    getDay,
    getYear
}
