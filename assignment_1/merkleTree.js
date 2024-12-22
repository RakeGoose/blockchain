const SHA256 = require('./hash');

// Merkle Tree Implementation
function buildMerkleTree(transactions) {
    let merkleLeaves = transactions.map(tx => SHA256(tx.toString()));

    while (merkleLeaves.length > 1) {
        const newLevel = [];
        for (let i = 0; i < merkleLeaves.length; i += 2) {
            const left = merkleLeaves[i];
            const right = merkleLeaves[i + 1] || left; // Handle odd nodes
            newLevel.push(SHA256(left + right));
        }
        merkleLeaves = newLevel;
    }
    return merkleLeaves[0] || '0'; // Root of Merkle Tree (or '0' if no transactions)
}

module.exports = buildMerkleTree;
