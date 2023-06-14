const FktsID = require('../FktsID')
const {fBlocks} = require('../enums')

class AllFktIDs extends FktsID {
    /**
     *
     */
    constructor(writeMessage, type, fBlockID, instanceID,  getImplementedFkts, updateFktIDs) {
        super(writeMessage, type, fBlockID, instanceID);
        this.fktID = 0x000
        this.updateFktIDs = updateFktIDs
        this.getImplementedFkts = getImplementedFkts
        if(this.type === 'properties') {
            this.opTypeFunctions = {
                0x01: this.get.bind(this),
                0x0c: this.status.bind(this)
            }
        }
    }

    async get({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
        //this.sendStatus({instanceID, fBlockID, fktID: this.fktID})
    }

    async sendGet({instanceID, data, fktID, opType, fBlockID}) {
        this.writeMessage({fBlockID: 49, instanceID: 2, fktID, opType: 0x01, data: []})
    }

    sendStatus({instanceID, data, fktID, opType, fBlockID, sourceAddrHigh, sourceAddrLow}) {
        let functions = this.getImplementedBlocks()
       //console.log("sending functions")
        this.writeMessage({fBlockID, instanceID, fktID, opType: 0x0c, data: functions}, {sourceAddrHigh, sourceAddrLow})
    }

    status({instanceID, data, fktID, opType, fBlockID}) {
       //console.log("received fktIDs")
        let fktIds = []
        for(let i=0;i<fkts.length;i+=3) {
            fktIds.push((fkts.readUint16BE(i) >> 4))
            if((i+1) < fkts.length-1) {
                fktIds.push((fkts.readUint16BE(i+1) & 0xFFF))
            }
        }
        this.updateFktIDs(fBlockID, instanceID, fktIds)
    }
}

module.exports = AllFktIDs