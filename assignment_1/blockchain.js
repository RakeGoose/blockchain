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
        if (this.pendingTransactions.length < 5) {
            console.log('Not enough transactions to mine a block.');
            return;
        }

        const transactionsToMine = this.pendingTransactions.slice(0, 5);
        this.pendingTransactions = this.pendingTransactions.slice(5);

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

    isValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;