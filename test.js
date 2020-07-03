const cryptoContext = require('./CryptoContext')

const msg = "5669b294071363ea51d09206f0b02426a6457d3bd6fc1fa72d4f188a30821fed"
cryptocontext = new cryptoContext()
let keypair = cryptocontext.generateKeyPair()
pk = keypair[1] // 公钥
sk = keypair[0] // 私钥
console.log(sk)
console.log(pk)
sign = cryptocontext.sign(sk, msg)
verify = cryptocontext.verify(pk, msg, sign)
console.log(verify)
