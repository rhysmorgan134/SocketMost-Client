const FktsID = require('../FktsID')
const {fBlocks} = require('../enums')

class FBlockIDs extends FktsID {
    /**
     *
     */
    constructor(writeMessage, type, fBlockID, instanceID, fktID, getImplementedBlocks, implemented) {
        super(writeMessage, type, fBlockID, instanceID);
        this.fktID = fktID
        this.implemented = implemented
        this.getImplementedBlocks = getImplementedBlocks
        this.implementedDone = false
        if(this.type === 'properties') {
            this.opTypeFunctions = {0x01: this.get.bind(this)}
        }
    }

    async get({instanceID, telId, data, fktID, opType, telLen, fBlockID, sourceAddrHigh, sourceAddrLow}) {
       //console.log('parsing fBlockID get')
        await this.sendStatus({instanceID, data: [], opType: 0x0, fBlockID, fktID: this.fktID, sourceAddrHigh, sourceAddrLow})

    }

    async sendGet({instanceID, data, fktID, opType, fBlockID, sourceAddrLow, sourceAddrHigh}) {
        opType = 0x01
       //console.log("Sending Fblock Request")
        await this.writeMessage({fBlockID, instanceID:0x0, fktID:0x004, opType, data}, {sourceAddrHigh, sourceAddrLow})
    }

    async sendStatus({instanceID, data, fktID, opType, fBlockID,  sourceAddrHigh, sourceAddrLow}) {
        let functions = this.getImplementedBlocks()
       //console.log("sending functions")
        await this.writeMessage({fBlockID, instanceID: 0x02, fktID, opType: 0x0c, data: functions}, {sourceAddrHigh, sourceAddrLow})
        //setTimeout(() => this.sendGet({fBlockID, instanceID, fktID, opType: 0x0c, data: [], sourceAddrHigh, sourceAddrLow}))
        this.implemented()
    }
}

module.exports = FBlockIDs