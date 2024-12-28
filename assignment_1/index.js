const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

const blockchain = new Blockchain();

for(let i = 1; i <= 15; i++){
    blockchain.addTransaction(
        new Transaction(`Rustem ${i}`, `Daniyal ${i}`, Math.floor(Math.random()*100))
    );
}

blockchain.mineBlock();
blockchain.mineBlock();

console.log("Is blockchain valid? ", blockchain.isValid());

console.log(JSON.stringify(blockchain, null, 2));