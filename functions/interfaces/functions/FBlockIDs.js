const Function = require('./Function')

class FBlockIDs extends Function {
    constructor(fktID, writeMessage, updateStatus, getImplementedBlocks) {
        super(fktID, writeMessage, updateStatus);
        this.getImplementedBlocks = getImplementedBlocks
    }

    async getReq(data = [], telLen, sourceAddrHigh, sourceAddrLow) {
        let fBlocks = this.getImplementedBlocks()
        this.writeMessage({fktID: 0x000, opType: 0x0c, data: fBlocks, sourceAddrHigh, sourceAddrLow})
    }

    async status(data, telLen) {
        let FBlocks = []
        for(let i=0;i<telLen;i+=2) {
            console.log(telLen, i)
            //if((telLen + 1) < (i + 1)) {
                FBlocks.push({FBlock: data.readUint8(i), instID: data.readUint8(i+1)})
            //}


        }
        console.log(FBlocks)
        this.updateStatus({FBlocks: FBlocks})
        this.responseReceived = true
    }
}
module.exports = FBlockIDs