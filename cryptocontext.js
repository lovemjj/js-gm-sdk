module.exports = function CryptoContext() {

    const sm2 = require('sm-crypto').sm2;
    const sm3 = require('sm-crypto').sm3;
    const sm4 = require('sm-crypto').sm4;

    this.generateKeyPair = function(){
        let keypair = sm2.generateKeyPairHex();
        let publicKey = keypair.publicKey; // 公钥
        let privateKey = keypair.privateKey; // 私钥
        return [privateKey, publicKey]
    }

    this.getPublicKeyFromPrivateKey= function(sk){
        let keypair = sm2.generateKeyPairHex();
        let publicKey = keypair.publicKey; // 公钥
        let privateKey = keypair.privateKey; // 私钥
        return sm2.getPublicKey()
    }

    this.sign = function(sk, msg){
        return sm2.doSignature(msg, sk, {
            pointPool: sm2.getPoint(),
            der: true,
            hash: true,
        });
    }

    this.verify = function(pk, msg, sig){
        return sm2.doVerifySignature(msg, sig, pk, {
            der: true,
            hash: true,
        });
    }

    this.sm3 = function(data){
        return sm3(data);
    }

    this.encrypt = function(key, plain){
        return sm4.encrypt(plain, key);
    }

    this.decrypt = function(key, cipher){
        return sm4.decrypt(cipher, key);
    }

};