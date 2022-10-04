const generateIndoName = () =>
  new Promise((resolve, reject) => {
    axios('http://ninjaname.horseridersupply.com/indonesian_name.php')
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = $(
          'body > div > div.page > div.body > div.content > div:nth-child(5)'
        ).html();
        resolve(result.split('<br>')[0].split('\t\n•')[1].trim());
      })
      .catch((err) => {
        reject(err);
      });
  });

module.export = { generateIndoName };
