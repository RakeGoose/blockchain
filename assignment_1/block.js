const SHA256 = require("./hash");
const merkleTree = require ('./merkleTree');
const formatTimestamp = require('./utils');


class Block {
    constructor(index, timestamp, transactions, previousHash = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.formattedTimestamp = formatTimestamp(this.timestamp);
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.merkleRoot = merkleTree(transactions);
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            this.merkleRoot +
            this.nonce
        );
    }

    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }
}

module.exports = Block;