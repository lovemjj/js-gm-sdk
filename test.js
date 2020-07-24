// const mysql  = require('mysql');
//
// const connection = mysql.createConnection({
//     host     :  'rm-j6cmg6i19i8i64373zo.mysql.rds.aliyuncs.com',
//     user     :  'wisechainonline',
//     password :  '2L^rH@LdzLRgWfoMZl#s',
//     database :  'wisechain_wallter'
// });
// //
// // connection.connect();
// const a = '2LrH@LdzLRgWfoMZl#s'
// const b = a.slice(0,2) + '^' + a.slice(2)
// console.log(b);
// console.log('1');
// const sql = 'select * from zs_dict where id not in (1, 5, 12)';
// connection.query(sql,function (err, result) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//     result.forEach(function(item) {
//         console.log(item);
//     })
// });
//
// connection.end();

const cryptoContext = require('./CryptoContext')

const msg = "sm2 test"
cryptocontext = new cryptoContext()
let keypair = cryptocontext.generateKeyPair()
pk = keypair[1] // 公钥
sk = keypair[0] // 私钥
sk = "81cb51beac689f22bc11a8a9bc562834766c68040d5ea074df4a4c7e02c3b2ac"
pk = "0221f1b440302405616cf6b8d718a566ce4aa09bddd17f7e1c32008655e3147612"
console.log(sk)
console.log(pk)
sign = cryptocontext.sign(sk, msg)
console.log(sign)
verify = cryptocontext.verify(pk, msg, sign)
console.log(verify)
a = "sm2 test"
p = "02a2d95b0a4495765645bda7bbe3bc6ad60493e005804e80f0edd39ca97d8ee454"
s = "3046022100d4ab332147d9f9d9c5af29d4bbf1edcd426bc0e2a27e7243128bc7f25000d09e022100a4d36972932862d144f221c4370b7a815810e4d332767d10b657e44e3fa1f212"
console.log(cryptocontext.verify(p, a, s))