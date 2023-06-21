const Function = require('./Function')

class ActiveMagazine extends Function {
    /**
     *
     * @param fktID
     * @param writeMessage
     * @param updateStatus
     */
    constructor(fktID, writeMessage, updateStatus) {
        super(fktID, writeMessage, updateStatus);
    }

    /**
     *
     * @param {Buffer} data
     * @param {number} telLen
     * @returns {Promise<void>}
     */
    async status(data, telLen) {
        let x = data.readUInt8(0)
        let status ={magazine: {activeMagazine: x}}
        this.updateStatus(status)
        this.responseReceived = true
    }
}
module.exports = ActiveMagazine