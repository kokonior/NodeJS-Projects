const { spawn,exec } = require('node:child_process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const ls = spawn('cat', ['example.txt']);

ls.stdout.on('data', (data) => {
  var d = data.toString().replace("List of devices attached", "")
  var remove = d.toString().split("   ")

  const map = remove.map((i, index) => {
    var data = i.replace(/(\r\n|\n|\r)/gm, " ")
    var dataReplaced = data.replace("device", "")
    return dataReplaced.split(' ').join("")
  }).slice(0, -1)

  console.log("List emulator yang tersedia")
  console.table(map.map((item, index)=> {
  return `${item}`
  }))


rl.question(`Mau ngerun yang mana, pilih by index : `, item => {
  exec(`emulator -avd ${map[item]}`, function(err, stdout, stderr) {
    // handle err, stdout, stderr
    if(err){
      console.log("Emulator tidak tersedia")
    }
  });  
rl.close()
})
});
