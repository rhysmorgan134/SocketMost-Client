const FunctionBlock = require('../FunctionBlock')
const Version = require('./Version')
class Tool extends FunctionBlock{
    constructor(instID, writeMessage, updateFktIDs) {
        super(writeMessage, instID, 0x0E, updateFktIDs)
        this.instID = instID
        this.writeMessage = writeMessage
        this.version = new Version(writeMessage, 'properties', this.functionBlock, this.instID)

        this.functions = {
            // 0xA00: this.configuration.bind(this),
            0x010: this.centralRegistry
        }
    }
}

module.exports = Tool