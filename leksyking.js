const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   let today = new Date();
   let options = {
       weekday: 'long',
       day: 'numeric',
       month: 'long',
       year: 'numeric'
   };
    let day = today.toLocaleDateString('en-US', options);
    res.render("weather", {
        Today: day,
    });   
});

app.post("/", (req, res) => {
    const city = req.body.place;
    const appid = "d8c5d3243355ad76a180185dc2e4935e";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=${unit}`;
    
    https.get(url, (response) => {    
         console.log(response.statusCode);
         response.on("data", (data) => {
            const WeatherData = JSON.parse(data);
            const temp =  WeatherData.main.temp;
            const description = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<p> The weather is currently ${description}.</p>`)
            res.write(`<h1>The temperature in ${city} is ${temp} degrees celcius.</h1>`);
            res.write(`<img src= ${imageURL} alt="">`)
            res.send();
        });
    });
});

app.listen(3000, () => console.log('Starting the Weather App'));

