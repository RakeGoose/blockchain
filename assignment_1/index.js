const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const RSA = require('./rsa');

const { privateKey: privateKeyRustem, publicKey: publicKeyRustem } = RSA.generateKeyPair();
const { privateKey: privateKeyDaniyal, publicKey: publicKeyDaniyal } = RSA.generateKeyPair();

const blockchain = new Blockchain(2);

for (let i = 1; i <= 15; i++) {
    const sender = `Rustem${i}`;
    const receiver = `Daniyal${i}`;
    const amount = Math.floor(Math.random() * 100);

    const privateKey = privateKeyRustem;
    const publicKey = publicKeyRustem;

    const transaction = new Transaction(sender, receiver, amount);

    blockchain.addTransaction(transaction, privateKey, publicKey);
}

blockchain.mineBlock();
blockchain.mineBlock();

console.log('Is blockchain valid?', blockchain.isValid());
console.log(JSON.stringify(blockchain, null, 2));