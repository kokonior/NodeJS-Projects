const chalk = require('chalk');
const fs = require('fs');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const password = "password"

const GIT_TOKEN = '';
const GIT_URL = ''

const createAccount = async (account) => {
  const res = await fetch(GIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': GIT_TOKEN,
    },
    body: JSON.stringify({...account}),
  })
  return res.json();
}

const inviteToGroup = async (account) => {
  const res = await fetch(GIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'PRIVATE-TOKEN': GIT_TOKEN,
    },
    body: new URLSearchParams({
      'user_id': account.id,
      'access_level': 50,
    }),
  });

  return res.json();
}


(async() => {
  const file = fs.readFileSync('data.json', 'utf8');
  const data = JSON.parse(file);

  for (const account of data) {
    const account = {
      username: account.email.split('@')[0],
      name: account.name,
      email: account.email,
      password,
    }

    try {
      const response = await createAccount(account);
      console.log(chalk.green(`${response.name} berhasil dibuat`));
      const invite = await inviteToGroup(crot);
      console.log(chalk.green(`${invite.name} berhasil dimasukin ke group`));
    } catch (err) {
      console.log(err);
    }
  }
})();