
const cryptoContext = require('./CryptoContext')
const sm2 = require('sm-crypto').sm2

// const msg = "5669b294071363ea51d09206f0b02426a6457d3bd6fc1fa72d4f188a30821fed"
// const plain = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0x45, 0x67, 0x89, 0xab, 0x89, 0xab, 0x45, 0x67, 0x89, 0xab]
// const key = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10]
cryptocontext = new cryptoContext()
// let keypair = cryptocontext.generateKeyPair()
// pk = keypair[1] // 公钥
// sk = keypair[0] // 私钥
// console.log(pk)
// console.log(sk)
// sk = "24494d955e8dc18ee3d2b715a9789dd05d9571fe0c17b7f20b697ace21cfa20b"
// console.log(sm2.getBcecPublicKeyFromPrivateKey(sk))
// console.log(sm2.getPublicKeyFromBcecPublicKey(sm2.getBcecPublicKeyFromPrivateKey(sk)))
// sign = cryptocontext.sign(sk, msg)
// verify = cryptocontext.verify(pk, msg, sign)
// encryptData = cryptocontext.encrypt(key, plain)
// decryptData = cryptocontext.decrypt(key, encryptData)
//
// let sigValueHex = sm2.doSignature(msg, privateKey);
//
// let verifyResult = sm2.doVerifySignature(msg, sigValueHex, publicKey);
// const sm3 = require('sm-crypto').sm3;
//
// const sm4 = require('sm-crypto').sm4;
// const key = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10];
// const plain = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0x45, 0x67, 0x89, 0xab, 0x89, 0xab, 0x45, 0x67, 0x89, 0xab]
// const buf = Buffer.from('runoob', 'ascii');
// let encryptData = sm4.encrypt(plain, key); // 加密
//
// let decryptData = sm4.decrypt(encryptData, key); // 解密
//
// let hashData = sm3(msg);
//
// console.log(pk)
// console.log(sk)
// console.log(sign)
// console.log(verify)
// console.log(JSON.stringify(encryptData))
// console.log(JSON.stringify(decryptData))
// console.log(JSON.stringify(plain))
// console.log(cryptocontext.sm3('abc'))

const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node
//
// generate message to sign
// message should have 32-byte length, if you have some other length you can hash message
// for example `msg = sha256(rawMessage)`
const msg = randomBytes(32)

// generate privKey
let privKey
do {
    privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreate(privKey)

// sign the message
const sigObj = secp256k1.ecdsaSign(msg, privKey)
function hashfn (x, y) {
    const pubKey = new Uint8Array(33)
    pubKey[0] = (y[31] & 1) === 0 ? 0x02 : 0x03
    pubKey.set(x, 1)
    return pubKey
}

// get X point of ecdh
const ecdhPointX = secp256k1.ecdh(pubKey, privKey, { hashfn }, Buffer.alloc(33))
console.log(ecdhPointX.toString('hex'))
console.log(typeof msg)
console.log(msg.toString('hex'))
console.log(privKey.toString('hex'))
console.log(sm2.getBcecPublicKeyFromPrivateKey(privKey.toString('hex')))
console.log(Buffer.from(pubKey).toString('hex'))
console.log(Buffer.from(sigObj.signature).toString('hex'))
console.log(cryptocontext.sign(privKey.toString('hex'), msg.toString('hex')))
// verify the signature
console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey))