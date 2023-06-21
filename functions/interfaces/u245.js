const FktIDs = require('./functions/FktIDs')
const Notification = require('./functions/Notification')
const GetNotifications = require('./functions/GetNotifications')
const MixerLevel = require('./functions/MixerLevel')
const Volume = require('./functions/Volume')
const Fblock = require('./FBlock')

const {fktList} = require('../enums')

class u245 extends Fblock{
    constructor(instID, writeMessage, sourceAddrHigh, sourceAddrLow, addressHigh, addressLow, fBlock) {
        super(instID, writeMessage, sourceAddrHigh, sourceAddrLow, addressHigh, addressLow)
        this.fBlockID = 0xF5
        this.writeMessage = writeMessage
        this.instID = instID
        this.sourceAddrHigh = sourceAddrHigh
        this.sourceAddrLow = sourceAddrLow
        this.status = {}
    }

    // async getFunctions() {
    //    //console.log("getting functions")
    //     await this.functions[0x000].get()
    //    //console.log(this.status)
    //     this.status.forEach((data) => {
    //        //console.log(this.fktList[data])
    //     })


    // async allNotifcations() {
    //     let tempFktId = Buffer.alloc(2)
    //     tempFktId.writeUint16BE()
    //     await this.functions[0x001].set([0x00, 0x01, 0x10])
    // }
    //
    // async getNotifcations(data) {
    //     let tempFktId = Buffer.alloc(2)
    //     tempFktId.writeUint16BE(data << 4)
    //     await this.functions[0x002].set([0x00, 0x01, 0x40, ...tempFktId])
    // }

    // async updateStatus(data) {
    //     this.status = data
    // }


    // sendMessage({fktID, opType, data}) {
    //     this.writeMessage({fBlockID: this.fBlockID, instanceID: this.instID, fktID, opType, data}, {sourceAddrHigh: this.sourceAddrHigh, sourceAddrLow: this.sourceAddrLow})
    // }
}

module.exports = u245