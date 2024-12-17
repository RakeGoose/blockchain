class Block {
    constructor(timestamp="", data=[]) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = getHash();
        this.prevHash = "";
    }

    getHash() {
        return SHA256(this.prevHash + this.timestamp +JSON.stringify(this.data));
    }
}

