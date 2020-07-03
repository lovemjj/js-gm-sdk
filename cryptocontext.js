module.exports = function CryptoContext() {

    const sm2 = require('sm-crypto').sm2;
    const sm3 = require('sm-crypto').sm3;
    const sm4 = require('sm-crypto').sm4;
    const BigInteger = require('bigi');
    const ecurve = require('ecurve');

    this.generateKeyPair = function(){
        let keypair = sm2.generateKeyPairHex();
        let privateKey = keypair.privateKey; // 私钥
        let publicKey = sm2.getBcecPublicKeyFromPrivateKey(privateKey); // 公钥
        return [privateKey, publicKey]
    }

    this.getPublicKeyFromPrivateKey= function(sk){
        return sm2.getBcecPublicKeyFromPrivateKey(sk)
    }

    this.sign = function(sk, msg){
        return sm2.doSignature(msg, sk, {
            pointPool: sm2.getPoint(),
            der: true,
            hash: true,
        });
    }

    this.verify = function(pk, msg, sig){
        let curve = ecurve.getCurveByName('ec')
        let pubkey = '04' + pk.slice(2) + ecurve.Point.decodeFrom(curve, Buffer.from(pk, "hex")).affineY.toBuffer(32).toString('hex')
        console.log(pubkey)
        return sm2.doVerifySignature(msg, sig, pubkey, {
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