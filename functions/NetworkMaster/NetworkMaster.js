const FunctionBlock = require('../FunctionBlock')
const CentralRegistry = require('./CentralRegistry')
class NetworkMaster extends FunctionBlock{
    constructor(instID, writeMessage, updateFoundBlocks, updateFktIDs) {
        super(writeMessage, instID, 0x02, updateFktIDs)
        this.instID = instID
        this.writeMessage = writeMessage
        this.centralRegistry = new CentralRegistry(writeMessage, 'properties', this.functionBlock, this.instID, updateFoundBlocks)
        this.functions = {...this.functions,... {
            0xA01: this.centralRegistry
            }
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
    // configuration(data, opType) {
    //     if(opType) {
    //         this.networkMaster.configuration = data.readInt8(0)
    //         let deltaBlockList = data.slice(0, data.length)
    //         if(deltaBlockList.length % 2) {
    //             console.warn(this.functionBlock, this.instID, " Invalid amount of params ")
    //             return
    //         }
    //         this.networkMaster.deltaBlockList = {}
    //         for(let i=1;i<deltaBlockList.length;i+=2) {
    //             let tempFblockId = deltaBlockList.readInt8(i)
    //             if(!(tempFblockId in this.networkMaster.deltaBlockList)) {
    //                 this.networkMaster.deltaBlockList[tempFblockId] = []
    //             }
    //             this.networkMaster.deltaBlockList[tempFblockId].push(deltaBlockList.readInt8(i+1))
    //         }
    //     }
    //
    // }

    /**
     * Query of information about an FBlock from the Central Registry. The parameter InstID is optional. After a Get command without any parameter, the NetworkMaster responds with all registry entries.
     * @param {Buffer} data
     * @param {number} opType
     */
    // centralRegistry(data, opType) {
    //     if(opType === 12) {
    //         if(data.length % 4) {
    //             console.warn(this.functionBlock, this.instID, " Invalid amount of params ", data.length, data)
    //             return
    //         }
    //         for(let i=0;i<data.length;i+=4) {
    //             let tempFblockId = data.readUInt8(i+2)
    //             let readAbleName = tempFblockId in functionBlockMap ? functionBlockMap[tempFblockId] : tempFblockId
    //             if(!(readAbleName in this.networkMaster.centralRegistry)) {
    //                 this.networkMaster.centralRegistry[readAbleName] = []
    //             }
    //             this.networkMaster.centralRegistry[readAbleName].push({instId: data.readUInt8(i+3), address: data.readUInt16BE(i), fBlock: tempFblockId})
    //         }
    //     }
    //    //console.log(this.networkMaster.centralRegistry)
    // }
}

module.exports = NetworkMaster