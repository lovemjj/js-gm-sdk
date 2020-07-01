var crypto = require('crypto');



function encrypt(text, secKey) {

    const _text = text
    const lv = new Buffer('0102030405060708', 'binary')
    const _secKey = new Buffer(secKey, 'binary')
    const cipher = crypto.createCipheriv('aes-256-ctr', _secKey, lv)
    let encrypted = cipher.update(_text, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

module.exports = Aes256ctr;


function sm3(d){
    return d;
}

const SM2 = {}

SM2.generateKeyPair  = function(){
    return [sk, pk];
}

SM2.sign = function(sk, msg){
    return signature
}

SM2.verify = function(pk, msg, sig){
    return false
}


const SM4 = {}

SM4.encrypt = function(key, plain){
    return cipher
}

SM4.decrypt = function(key, cipher){
    return plain
}
