const FktsID = require('../FktsID')
const {fBlocks} = require('../enums')

class CentralRegistry extends FktsID {
    /**
     *
     */
    constructor(writeMessage, type, fBlockID, instanceID, updateFoundBlocks) {
        super(writeMessage, type, fBlockID, instanceID);
        this.centralRegistry = {}
        if(this.type === 'properties') {
            this.opTypeFunctions = {0x0C: this.status.bind(this)}
        }
        this.updateFoundBlocks = updateFoundBlocks
    }

    async sendGet({instanceID, data, fktID, opType, fBlockID}) {
       //console.log("send get request", instanceID, data, fktID, opType, fBlockID)
        await this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    async status({instanceID, data, fktID, opType, fBlockID}) {
        if(data.length % 4) {
            console.warn(this.fBlockID, this.instanceID, " Invalid amount of params ", data.length, data)
            return
        }
        for(let i=0;i<data.length;i+=4) {
            let tempFblockId = data.readUInt8(i+2)
            let readAbleName = tempFblockId in fBlocks ? fBlocks[tempFblockId] : tempFblockId
            if(!(readAbleName in this.centralRegistry)) {
                this.centralRegistry[readAbleName] = {}
            }
            this.centralRegistry[readAbleName][data.readUInt8(i+3)] = {instId: data.readUInt8(i+3), address: data.readUInt16BE(i), fBlock: tempFblockId, functions: {}}
        }
       console.log('REGESITRY UPDATE', this.centralRegistry)
        await this.updateFoundBlocks(this.centralRegistry)

    }
}

module.exports = CentralRegistry