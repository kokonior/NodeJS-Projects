let time = process.argv[2].split(':');

function checkTime () {
  let now = new Date();

  if (now.getHours() >= time[0] && now.getMinutes() >= time[1]) {
    setInterval(function () {
      console.log("dingdong!!!");
      process.exit(1);
    }, 1000);
  }
  else {
    console.clear();
    console.log("Setting alarm for: "+time.join(":"));
    console.log(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
    setTimeout(checkTime, 1000);
  }
}

checkTime();
