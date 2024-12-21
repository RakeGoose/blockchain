const crypto = require('crypto');

// Custom Hashing Function (SHA-256)
const SHA256 = message => crypto.createHash('sha256').update(message).digest('hex');

module.exports = SHA256;