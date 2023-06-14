const net = require('net')
const EventEmitter = require('events')

class Os8104Client extends EventEmitter{
    constructor() {
        super()
        this._client = net.createConnection("/tmp/SocketMost.sock");

        this._client.on("connect", () => {
            console.log("connected")
            this.getPositions()
        });

        this.maxPosition = 0
        this.nodePosition = 0

        this.networkMaster = null
        this._client.on("data", (data) => {
            let message = JSON.parse(data.toString())
            switch (message.eventType) {
                case 'newMessage':
                    message.data = Buffer.from(message.data)
                    this.emit('newMessage', this.parseMostMessage(message))
                    break
                case 'netChange':
                    console.log('netChanged', message)
                    this.emit('netChanged', message)
                    break
                case 'lockStatus':
                    console.log('lockStatus', message)
                    this.emit('lockStatus', data)
                    break
                case 'positionUpdate':
                    console.log('positionUpdate', message)
                    this.maxPosition = message.maxPosition
                    this.nodePosition = message.nodePosition
                    this.emit('positionUpdate', {maxPosition: this.maxPosition, nodePosition: this.nodePosition})
                    break
                case 'shutDown':
                    console.log('shutDownEvent')
                    this.emit('shutDown')

            }
        });
    }

    getPositions() {
        let data = {
            eventType: 'getNodePosition'
        }
        this.sendAppMessage(data)
    }

    parseMostMessage (message) {
        let data = {
            fBlockID: message.data.readUint8(0),
            instanceID: message.data.readUint8(1),
            fktID: (message.data.slice(2,4).readUint16BE() >> 4),
            opType: ((message.data.readUint16BE(2) & 0xF)),
            telId: (message.data.readUint8(4) & 0xF0) >>4,
            telLen: (message.data.readUint8(4) & 0xF),
            data: message.type > 0x01 ? message.data.slice(5, message.data.length - 1) : message.data.slice(5),
            sourceAddrHigh: message.sourceAddrHigh,
            sourceAddrLow: message.sourceAddrLow
        }
        //console.log(data)

        let messageOut = {...data}
        messageOut.data = [...message.data]
        if(!this.networkMaster) {
            if(message.fBlockID === 2) {
                console.log("network master found")
            }
        }
        return data
    }

    sendAppMessage(data) {
        this._client.write(JSON.stringify(data) + '\r\n')
    }
}

module.exports = Os8104Client





