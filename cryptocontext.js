module.exports = function CryptoContext() {

    const sm2 = require('sm-crypto').sm2;
    const sm3 = require('sm-crypto').sm3;
    const sm4 = require('sm-crypto').sm4;
    const ecurve = require('ecurve');
    const Curve = ecurve.Curve;

    const BigInteger = require('bigi')

    this.generateKeyPair = function(){
        let keypair = sm2.generateKeyPairHex();
        let privateKey = keypair.privateKey; // 私钥
        let publicKey = sm2.getBcecPublicKeyFromPrivateKey(privateKey); // 公钥
        return [privateKey, publicKey]
    }

    this.getPublicKeyFromPrivateKey= function(sk){
        if (PA.getY().toBigInteger())
            yPrefix = "02";
        else yPrefix = "03";
        return yPrefix + x;
        return sm2.getBcecPublicKeyFromPrivateKey(sk)
    }

    this.sign = function(sk, msg){
        return sm2.doSignature(msg, sk, {
            der: true,
        });
    }

    this.verify = function(pk, msg, sig){
        let curve = {
            "p": "fffffffeffffffffffffffffffffffffffffffff00000000ffffffffffffffff",
                "a": "fffffffeffffffffffffffffffffffffffffffff00000000fffffffffffffffc",
                "b": "28e9fa9e9d9f5e344d5a9e4bcf6509a7f39789f515ab8f92ddbcbd414d940e93",
                "n": "fffffffeffffffffffffffffffffffff7203df6b21c6052b53bbf40939d54123",
                "h": "01",
                "Gx": "32c4ae2c1f1981195f9904466a39c9948fe30bbff2660be1715a4589334c74c7",
                "Gy": "bc3736a2f4f6779c59bdcee36b692153d0a9877cc62a474002df32e52139f0a0"
        }

        var p = new BigInteger(curve.p, 16)
        var a = new BigInteger(curve.a, 16)
        var b = new BigInteger(curve.b, 16)
        var n = new BigInteger(curve.n, 16)
        var h = new BigInteger(curve.h, 16)
        var Gx = new BigInteger(curve.Gx, 16)
        var Gy = new BigInteger(curve.Gy, 16)

        curve = new Curve(p, a, b, Gx, Gy, n, h);
        let pubkey = '04' + pk.slice(2) + ecurve.Point.decodeFrom(curve, Buffer.from(pk, "hex")).affineY.toBuffer(32).toString('hex')
        return sm2.doVerifySignature(msg, sig, pubkey, {
            der: true
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