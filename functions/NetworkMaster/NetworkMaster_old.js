const FunctionBlock = require('./FunctionBlock')
functionBlockMap = {
    0x01: 'NetBlock',
    0x02: 'NetworkMaster',
    0x03: 'ConnectionMaster',
    0x06: 'Diagnosis',
    0x0E: 'Tool',
    0x0F: 'EnhancedTestibility',
    0x22: 'Amplifier',
    0x24: 'AuxIn',
    0x26: 'MicrophoneInput',
    0x30: 'AudioTapePlayer',
    0x31: 'AudioDiskPlayer',
    0x34: 'DVDVideoPlayer',
    0x40: 'AmFmTuner',
    0x41: 'TMCTuner',
    0x42: 'TVTuner',
    0x43: 'DABTuner',
    0x44: 'SDARS',
    0x50: 'Telephone',
    0x51: 'GeneralPhoneBook',
    0x60: 'GraphicDisplay'
}
class NetworkMaster extends FunctionBlock{
    constructor(instID) {
        super(0x02)
        this.instID = instID
        this.functions = {
            0xA00: this.configuration.bind(this),
            0xA01: this.centralRegistry.bind(this)
        }
        this.networkMaster = {
            configuration: null,
            centralRegistry: {},
            deltaBlockList: {}
        }
        this.enums = {
            configuration: {
                0x00: "NotOk",
                0x01: "OK",
                0x02: "Invalid",
                0x03: "New"
            }
        }
    }

    /**
     * Informs each device about the state of the network configuration. The Status is reported by a broadcast message.
     * @param {Buffer} data
     * @param {number} opType
     */
    configuration(data, opType) {
        if(opType) {
            this.networkMaster.configuration = data.readInt8(0)
            let deltaBlockList = data.slice(0, data.length)
            if(deltaBlockList.length % 2) {
                console.warn(this.functionBlock, this.instID, " Invalid amount of params ")
                return
            }
            this.networkMaster.deltaBlockList = {}
            for(let i=1;i<deltaBlockList.length;i+=2) {
                let tempFblockId = deltaBlockList.readInt8(i)
                if(!(tempFblockId in this.networkMaster.deltaBlockList)) {
                    this.networkMaster.deltaBlockList[tempFblockId] = []
                }
                this.networkMaster.deltaBlockList[tempFblockId].push(deltaBlockList.readInt8(i+1))
            }
        }

    }

    /**
     * Query of information about an FBlock from the Central Registry. The parameter InstID is optional. After a Get command without any parameter, the NetworkMaster responds with all registry entries.
     * @param {Buffer} data
     * @param {number} opType
     */
    centralRegistry(data, opType) {
        if(opType === 12) {
            if(data.length % 4) {
                console.warn(this.functionBlock, this.instID, " Invalid amount of params ", data.length, data)
                return
            }
            for(let i=0;i<data.length;i+=4) {
                let tempFblockId = data.readUInt8(i+2)
                let readAbleName = tempFblockId in functionBlockMap ? functionBlockMap[tempFblockId] : tempFblockId
                if(!(readAbleName in this.networkMaster.centralRegistry)) {
                    this.networkMaster.centralRegistry[readAbleName] = []
                }
                this.networkMaster.centralRegistry[readAbleName].push({instId: data.readUInt8(i+3), address: data.readUInt16BE(i), fBlock: tempFblockId})
            }
        }
       //console.log(this.networkMaster.centralRegistry)
    }
}

module.exports = NetworkMaster