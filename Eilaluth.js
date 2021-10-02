// covid 19 tracker with simple table in nodejs

const axios = require('axios');

axios.all([
  axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`),
  axios.get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi`)
])
  .then(axios.spread((covidid, covidprov) => {
    const stringlength = 69;
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
    console.log(`     ┃                    DATA COVID 19 DI INDONESIA` + " ".repeat(-1 + stringlength - ` ┃ `.length - `                    DATA COVID 19 DI INDONESIA`.length) + " ┃");
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┃    POSITIF : ${covidid.data.positif} | SEMBUH : ${covidid.data.sembuh} | MENINGGAL : ${covidid.data.meninggal}` + " ".repeat(-1 + stringlength - ` ┃ `.length - `    POSITIF : ${covidid.data.positif} | SEMBUH : ${covidid.data.sembuh} | MENINGGAL : ${covidid.data.meninggal}`.length) + " ┃");
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
    console.log(`     ┃           DATA COVID 19 DI SELURUH PROVINSI DI INDONESIA` + " ".repeat(-1 + stringlength - ` ┃ `.length - `           DATA COVID 19 DI SELURUH PROVINSI DI INDONESIA`.length) + " ┃");
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
    for(i = 0; i <= 33; i++) {
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┃   ${covidprov.data[i].provinsi}` + " ".repeat(-1 + stringlength - ` ┃ `.length - `   ${covidprov.data[i].provinsi}`.length) + " ┃");
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┃                                                                  ┃`);
    console.log(`     ┃       POSITIF: ${covidprov.data[i].kasus} SEMBUH: ${covidprov.data[i].sembuh} MENINGGAL: ${covidprov.data[i].meninggal}` + " ".repeat(-1 + stringlength - ` ┃ `.length - `       POSITIF: ${covidprov.data[i].kasus} SEMBUH: ${covidprov.data[i].sembuh} MENINGGAL: ${covidprov.data[i].meninggal}`.length) + " ┃");
    console.log(`     ┃                                                                  ┃`);
    }
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
  }))
  .catch((err) => {
    console.log("Something error")
  })
