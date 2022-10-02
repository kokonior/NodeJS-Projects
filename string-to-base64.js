const btoa = str => Buffer.from(str, 'binary').toString('base64');

// btoa('foobar'); // 'Zm9vYmFy'
