function hitungAlphabet(str) {
    str = str.toUpperCase()
    const vokal = 'AIUEO';
    const konsonan = 'BCDFGHJKLMNPQRSTVWXYZ';
    const arrVokal =[];
    const arrKonsonan=[];
    for(let i =0;i<str.length;i++){
        for(let j = 0 ; j<konsonan.length;j++){
            if(str[i] == konsonan[j]){
                arrKonsonan.push(str[i])
            }
        }
        for(let k = 0 ; k<vokal.length;k++){
            if(str[i] == vokal[k]){
                arrVokal.push(str[i])
            }
        }
    }
    const result = {
        huruf: {
          vokal: arrVokal.length,
          konsonan: arrKonsonan.length
        },
        panjang: str.length
      }
      return result
}
console.log(hitungAlphabet("Halo Semua Aku @#$%rLifan"));
