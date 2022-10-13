const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function cashbackCounter(cb, price) {
    return 'Rp. ' + Number((cb / 100) * price).toLocaleString('id');
}

rl.question('Price : ', (price) => {
    rl.question('Casback : ', (cashback) => {
        const result = cashbackCounter(cashback, price)
        console.log('================[ Cashbac Counter ]================');
        console.log('Price : ', 'Rp.', Number(price).toLocaleString('id'));
        console.log('Cashback : ', cashback + '%');
        console.log('Result : ', result)
        rl.close();
    });
});
