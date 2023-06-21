const Function = require('./Function')

class GroupAddress extends Function {
    constructor(fktID, writeMessage, updateStatus, getImplementedBlocks) {
        super(fktID, writeMessage, updateStatus);
        this.getImplementedBlocks = getImplementedBlocks
    }

    async status(data, telLen) {
       //console.log("group Address", data)
        this.updateStatus()
        this.responseReceived = true
    }
}
module.exports = GroupAddress