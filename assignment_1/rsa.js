class RSA{
    static generateKeyPair(bits = 2048){
        const e = 65537;
        let a, b, module_inc, euler, c;
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
