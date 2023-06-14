const FunctionBlock = require('../FunctionBlock')
const FBlockIDs = require('./FBlockIDs')
class NetBlock extends FunctionBlock{
    constructor(instID, writeMessage, getImplementedBlocks, implemented) {
        super(writeMessage, instID, 0x01)
        this.instID = instID
        this.writeMessage = writeMessage
        this.fBlockIDs = new FBlockIDs(this.writeMessage, 'properties', this.functionBlock, this.instID, 0x000, getImplementedBlocks, implemented)
        this.functions = {
            ...this.functions, ...{
                // 0xA00: this.configuration.bind(this),
                0x000: this.fBlockIDs
            }
        }
    }
}

module.exports = NetBlock