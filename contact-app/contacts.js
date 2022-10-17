const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Membuat folder data
const dir = "./data";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Membuat file contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const contact = fs.readFileSync("./data/contacts.json", "utf-8");
  const json = JSON.parse(contact);
  return json;
};

const save = (nama, email, noHP) => {
  const data = { nama, email, noHP };
  const json = loadContact();

  // Cek duplikat
  const duplikat = json.find((data) => data.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold(`Nama contact ${nama} telah terdaftar, silahkan gunakan nama lain.`));
    return false;
  }

  // Cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(`Email tidak valid.`));
      return false;
    }
  }

  // Cek no HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold(`Nomor HP tidak valid.`));
    return false;
  }

  json.push(data);

  fs.writeFileSync("data/contacts.json", JSON.stringify(json));
  console.log(chalk.green.inverse.bold(`Data berhasil ditambahkan!`));
};

const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.cyan.inverse.bold(`Daftar Kontak : `));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan.`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(`Detail Kontak ${nama}: `));
  console.log(`Nama: ${contact.nama}`);
  console.log(`No HP: ${contact.noHP}`);
  if (contact.email) {
    console.log(`Email: ${contact.email}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan.`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`Data contact ${nama} berhasil dihapus!`));
};

module.exports = { save, listContact, detailContact, deleteContact };
