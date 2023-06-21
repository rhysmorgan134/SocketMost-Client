const Function = require('./Function')

class CurrentSource extends Function {
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
        let source = data.readUInt8(0)
        let status = {}
        switch (source) {
            case 0x04:
                status.currentSource = 'DABTuner'
                break
            case 0x03:
                status.currentSource = 'AmFmTuner'
                break
            case 0x22:
                status.currentSource = 'USB'
                break
            case 0x23:
                status.currentSource = 'Ipod'
                break
            case 0x21:
                status.currentSource = 'AuxIn'
                break
            case 0x11:
                status.currentSource = 'AudioDiskPlayer'
                break
            default:
                status.currentSource = source

        }
        console.log(status)
        this.updateStatus(status)
    }
}
module.exports = CurrentSource