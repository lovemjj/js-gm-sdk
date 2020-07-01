module.exports = function SM2() {
    const sm2 = require('sm-crypto').sm2;

    this.generateKeyPair = function(){
        let keypair = sm2.generateKeyPairHex();
        let publicKey = keypair.publicKey; // 公钥
        let privateKey = keypair.privateKey; // 私钥
        return [privateKey, publicKey]
    }

    this.sign = function(sk, msg){
        return sm2.doSignature(msg, sk);
    }

    this.verify = function(pk, msg, sig){
        return sm2.doVerifySignature(msg, sig, pk);
    }
}