const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
    constructor(difficulty = 4) {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = difficulty;
    }

    createGenesisBlock() {
        return new Block(0, Date.now().toString(), []);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(Transaction) {
        this.pendingTransactions.push(Transaction);
    }
}