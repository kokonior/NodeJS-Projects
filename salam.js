function checkTime(i) {
    if (i < 10) {
        i = `0` + i;
    }
    return i;
}

function salam(nama) {
    var ucapanSalam;
    var jsDate = new Date();
    var jam = jsDate.getHours();
    var menit = jsDate.getMinutes();
    var detik = jsDate.getSeconds();
    menit = checkTime(menit);
    detik = checkTime(detik);
    if (jam < 4) {
        ucapanSalam = `Selamat Malam ${nama}`
    } else if (jam < 11) {
        ucapanSalam = `Selamat Pagi ${nama}`
    } else if (jam < 15) {
        ucapanSalam = `Selamat Siang ${nama}`
    } else if (jam < 19) {
        ucapanSalam = `Selamat Sore ${nama}`
    } else {
        ucapanSalam = `Selamat Malam ${nama}`
    }

    return ucapanSalam
}

console.log(salam('melan'));