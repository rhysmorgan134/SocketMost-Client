<<<<<<< HEAD
const Dgram = require('./DataGram')
=======
const net = require('net')
>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4
const EventEmitter = require('events')

class Os8104Client extends EventEmitter{
    constructor() {
        super()
<<<<<<< HEAD
        this._client = new Dgram("/tmp/SocketMost-client.sock", "/tmp/SocketMost.sock");

        this._client.on("connect", () => {
            console.log("connected")
            this.getPositions().then(() => {
                console.log("resolved")
            })
=======
        this._client = net.createConnection("/tmp/SocketMost.sock");

        this._client.on("connect", () => {
            console.log("connected")
            this.getPositions()
>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4
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
<<<<<<< HEAD
                    break
                case 'messageSent':
                    this.emit('messageSent')
                    break
                case 'masterFound':
                    this.emit('masterFound', message)
                    break
                case 'allocResult':
                    this.emit('allocResult', message)
=======

>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4
            }
        });
    }

    getPositions() {
<<<<<<< HEAD
        return new Promise((resolve, reject) => {
            let data = {
                eventType: 'getNodePosition'
            }
            this.sendAppMessage(data)
            let positionTimeout = setTimeout(() => {
                console.log('position request timed out')
            }, 10)
            this.once('positionUpdate', () => {
                console.log('resolving')
                clearTimeout(positionTimeout)
                resolve()
            })
        })

=======
        let data = {
            eventType: 'getNodePosition'
        }
        this.sendAppMessage(data)
>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4
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
<<<<<<< HEAD
=======
        //console.log(data)
>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4

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
<<<<<<< HEAD
        this._client.write(JSON.stringify(data))
    }

    getMaster() {
        this._client.write(JSON.stringify({eventType: 'getMaster'}) + '\r\n')
    }

    sendControlMessage(data) {
        return new Promise((resolve, reject) => {
            this._client.write(JSON.stringify({eventType: 'sendControlMessage', ...data}))
            let controlMessageTimeout = setTimeout(() => {
                console.log('sendMessage request timed out')
                reject()
            }, 50)
            this.once('messageSent', () => {
                console.log('resolving sent Message')
                clearTimeout(controlMessageTimeout)
                resolve()
            })
        })
    }

    allocate() {
        this._client.write(JSON.stringify({eventType: 'allocate'}))
=======
        this._client.write(JSON.stringify(data) + '\r\n')
>>>>>>> 5d857c9ded27d55a2bbf2b0efe7d506af398b4d4
    }
}

module.exports = Os8104Client





