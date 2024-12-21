class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }

    // Returns a string representation of the transaction
    toString() {
        return `${this.sender}->${this.receiver}:${this.amount}`;
    }
}

module.exports = Transaction;
