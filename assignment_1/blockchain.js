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

    mineBlock() {
        if (this.pendingTransactions.length < 10) {
            console.log('Not enough transactions to mine a block.');
            return;
        }

        const transactionsToMine = this.pendingTransactions.slice(0, 10);
        this.pendingTransactions = this.pendingTransactions.slice(10);

        const newBlock = new Block(
            this.chain.length,
            Date.now().toString(),
            transactionsToMine,
            this.getLatestBlock().hash
        );
        console.log('Mining block #${newBlock.index}...');
        newBlock.mineBlock(this.difficulty);

        this.chain.push(Object.freeze(newBlock));
        console.log('Block successfully added to the chain!');
    }

}