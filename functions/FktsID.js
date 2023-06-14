const {opTypes} = require('./enums')

class fktIDs {
    /**
     *
     * @param {function} writeMessage
     * @param {number} fBlockID
     * @param {number} instanceID
     * @param {properties | methods} type
     */
    constructor(writeMessage, type, fBlockID, instanceID) {
        this.fBlockID = fBlockID
        this.instanceID = instanceID
        this.writeMessage = writeMessage
        this.type = type
        this.opTypes= opTypes[this.type]
        if(this.type === 'properties') {
            this.opTypeFunctions = {}
        }

    }

    /**
     *
     * @param {number} instanceID
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} fBlockID
     * @param {number} sourceAddrHigh
     * @param {number} sourceAddrLow
     */

    async parse({instanceID, data, fktID, opType,  fBlockID, sourceAddrHigh, sourceAddrLow}) {
        if(opType in this.opTypes) {
            this.opTypeFunctions[opType]({instanceID, data, fktID, opType, fBlockID, sourceAddrHigh, sourceAddrLow})
        } else {
           //console.log("op type not implemented")
            opType = 0x0F
            data = Buffer.alloc(12)
            data.writeUint8(0x04, 0)
            this.writeMessage({fBlockID, instanceID, fktID, opType, data}, {sourceAddrHigh, sourceAddrLow})
        }

    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     * @param {number} sourceAddrHigh
     * @param {number} sourceAddrLow
     */
    async get({instanceID, telId, data, fktID, opType, telLen, fBlockID, sourceAddrHigh, sourceAddrLow}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        await this.writeMessage({fBlockID, instanceID, fktID, opType, data}, {sourceAddrHigh, sourceAddrLow})
    }

    /**
     *
     * @param {number} instanceID
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} fBlockID
     * @param {number | null} sourceAddrHigh
     * @param {number | null} sourceAddrLow
     */
    async sendGet({instanceID, data, fktID, opType, fBlockID, sourceAddrHigh, sourceAddrLow}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        sourceAddrHigh !== null ? await this.writeMessage({fBlockID, instanceID, fktID, opType, data}, {sourceAddrHigh, sourceAddrLow}) : await this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    set({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendSet({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    setGet({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendSetGet({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} fBlockID
     */
    status({instanceID, data, fktID, opType, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} fBlockID
     * @param {number} sourceAddrHigh
     * @param {number} sourceAddrLow
     */
    sendStatus({instanceID, data, fktID, opType, fBlockID, sourceAddrHigh, sourceAddrLow}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data}, {sourceAddrHigh, sourceAddrLow})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    increment({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendIncrement({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    decrement({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendDecrement({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    getInterface({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendGetInterface({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    errorAck({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendErrorAck({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    interface({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendInterface({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    error({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

    /**
     *
     * @param {number} instanceID
     * @param {number} telId
     * @param {Buffer} data
     * @param {number} fktID
     * @param {number} opType
     * @param {number} telLen
     * @param {number} fBlockID
     */
    sendError({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
       //console.log("op type not implemented")
        opType = 0x0F
        data = Buffer.alloc(12)
        data.writeUint8(0x04, 0)
        this.writeMessage({fBlockID, instanceID, fktID, opType, data})
    }

}

module.exports = fktIDs