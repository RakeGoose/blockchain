const {Block, Blockchain} = require('./block.js');

const test = new Blockchain();
test.addBlock(new Block(Date.now().toString(), {from: "Rustem", to: "Daniyal", amount: 50}));
test.addBlock(new Block(Date.now().toString(), {from: "Rustem", to: "Azamat", amount: 70}));
test.addBlock(new Block(Date.now().toString(), {from: "Daniyal", to: "Rustem", amount: 30}));
test.addBlock(new Block(Date.now().toString(), {from: "Daniyal", to: "Rustem", amount: 25}));

console.log(test.chain)