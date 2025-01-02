const SHA256 = require('./hash');

class RSA{
    static generateKeyPair(bits = 2048){
        const e = 65537;
        let a, b, module_inc, euler, c;

        do {
            a = RSA.generatePrime(bits / 2);
            b = RSA.generatePrime(bits / 2);
            module_inc = a * b;
            euler = (a - 1n) * (b - 1n);
        }while(RSA.gcd(e, euler) !== 1n);

        c = RSA.modInverse(e, euler);

        return{
            publicKey: {e, module_inc},
            privateKey: {c, module_inc},
        };
    }

    static encrypt(publicKey, message){
        const {e, module_inc} = publicKey;
        const m = BigInt(message);
        return RSA.modExp(m, BigInt(e), BigInt(module_inc));
    }

    static decrypt(privateKey, cipherText){
        const {c, module_inc} = privateKey;
        return RSA.modExp(BigInt(cipherText), BigInt(c), BigInt(module_inc));
    }

    static sign(privateKey, message){
        const hash = BigInt(SHA256(message));
        return RSA.decrypt(privateKey, hash);
    }

    static verify(publicKey, message, signature){
        const hash = BigInt(SHA256(message));
        const decryptedSign = RSA.encrypt(publicKey, signature);
        return hash === decryptedSign;
    }

    static generatePrime(bits){
        const min = 2n ** BigInt(bits - 1);
        const max = 2n ** BigInt(bits) - 1n;
        while(true){
            const candidate = BigInt(Math.floor(Math.random() * Number(max - min)) + Number(min));
            if (RSA.isPrime(candidate)) return candidate;
        }
    }

    static isPrime(module_inc, k = 5){
        if(module_inc <= 1n) return false;
        if(module_inc <= 3n) return true;
        if(module_inc % 2n === 0n || module_inc % 3n === 0n) return false;

        let c = n - 1n;
        while (c % 2n === 0n) module_inc /= 2n;

        for(let i = 0; i < k; i++){
            if(!RSA.isComposite(module_inc, c)) return false;
        }
        return true;
    }

    static isComposite(module_inc, c){
        const a = 2n + BigInt(Math.floor(Math.random() * (Number(n - 4n))));
        let x = RSA.modExp(a, c, module_inc);
        if(x === 1n || x === n - 1n) return true;

        while (c !== module_inc - 1n){
            x = (x * x) % n;
            c *= 2n;
            if (x === 1n) return false;
            if (x === n - 1n) return true;
        }
        return false;
    }

    static gcd(a, b){
        return b === 0n ? a : RSA.gcd(b, a % b);
    }

    static modExp(base, exp, mod){
        let result = 1n;

        base %= mod;
        while (exp > 0n){
            if (exp % 2n === 1n) result = (result * base) % mod;
            exp = exp >> 1n;
            base = (base * base) % mod;
        }
        return result;
    }

    static modInverse(a, m){
        const [gcd, x] = RSA.extendedGcd(a, m);
        if (gcd !== 1n) throw new Error("Inverse doesn't exist");
        return (x % m + m) % m;
    }

    static extendedGcd(a, b){
        if(b === 0) return [a, 1n, 0n];

        const [gcd, x1, y1] = RSA.extendedGcd(b, a % b);
        return [gcd, y1, x1 - (a / b) * y1];
    }
}


module.exports = RSA;
