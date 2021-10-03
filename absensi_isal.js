const fetch = require("node-fetch");
const from = require("form-data");
const cheerio = require("cheerio");
const tanya = require("readline-sync");
let data = new from();

let user = tanya.question("Username? ");
let pass = tanya.question("Password? ");
data.append("ajaran", "2020");
data.append("username", user); //0037205240
data.append("password", pass); //123456

(async () => {
  console.log(`Mencoba Login. . .`);
  await fetch("http://icpasuruan.hopto.org:8094/login/do_login/", {
    method: "POST",
    body: data,
  }).then(async (res) => {
    console.log(`Sukses Login!`);
    let cookie = await res.headers.get("set-cookie");
    await fetch("http://icpasuruan.hopto.org:8094/student/cheknotif", {
      method: "GET",
      headers: {
        cookie: cookie,
      },
    })
      .then((res) => res.text())
      .then(async (res) => {
        console.log(`Cek Notif Terbaru. . .`);
        let jumlah_notif = res;
        jumlah_notif = parseInt(jumlah_notif);
        if (jumlah_notif == 0) {
          console.log(`Tidak Ada Notif Terbaru`);
        } else {
          console.log(`Anda Memiliki ${jumlah_notif} Notifikasi Baru`);
          await fetch("http://icpasuruan.hopto.org:8094/student/semuanotif", {
            method: "GET",
            headers: {
              cookie: cookie,
            },
          })
            .then((res) => res.text())
            .then(async (res) => {
              const $ = cheerio.load(res);
              let allNotif = $("div.notification-info").text();
              allNotif = allNotif.replace(/\s\s+/g, "\n");
              allNotif = allNotif.split("Yang Lalu\n");
              for (let i = 0; i < jumlah_notif; i++) {
                console.log(`${allNotif[i]}Yang Lalu`);
              }
            });
        }
        console.log(`Membuka page tugas`);
        await fetch("http://icpasuruan.hopto.org:8094/studentmaster/grid_ki3", {
          method: "GET",
          headers: {
            cookie: cookie,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            let jumlah = res.recordsTotal;
            for (let i = 0; i < jumlah; i++) {
              console.log(`Guru : ${res.data[i][1]}
Kelas : ${res.data[i][2].replace(/<br \/>\n/g, "")}
Keterangan : ${res.data[i][4]}
Waktu : ${res.data[i][5]}
Status : ${res.data[i][6].split(">")[1].split("<")[0]} 
              `);
            }
          });
        console.log(`Membuka page tugas keterampilan`);
        await fetch("http://icpasuruan.hopto.org:8094/studentmaster/grid_ki4", {
          method: "GET",
          headers: {
            cookie: cookie,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            let jumlah = res.recordsTotal;
            for (let i = 0; i < jumlah; i++) {
              console.log(`Guru : ${res.data[i][1]}
Kelas : ${res.data[i][2].replace(/<br \/>\n/g, "")}
Keterangan : ${res.data[i][4]}
Waktu : ${res.data[i][5]}
Status : ${res.data[i][6].split(">")[1].split("<")[0]}                
                `);
            }
          });
      });
  });
})(); 
