const allFktIDs = require('./commonFkts/AllFktIDs')

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
class FunctionBlock {
    constructor(writeMessage, instID, functionBlock, updateFktIDs) {
        this.functionBlock= functionBlock
        this.writeMessage = writeMessage
        this.allFktIDs = new allFktIDs(writeMessage, 'properties', functionBlock, instID, this.getImplementedFkts.bind(this), updateFktIDs)
        this.functions= {
                0x000: this.allFktIDs
        }
        this.parsingFunctions = {}
        this.messageSeq= 0x00
        this.multipartBuffer= Buffer.alloc(65536)
        this.multipartLength = 0
    }

    async parser({fktID, opType, telId, telLen, data, instanceID, sourceAddrHigh, sourceAddrLow}) {
        //console.log("parsing in parse", sourceAddrHigh, sourceAddrLow)
        let seq = data.readUint8(0)
        if(fktID in this.functions) {
            switch (telId) {
                case 0:
                    this.functions[fktID].parse({instanceID, data: data, fktID, opType, fBlockID: this.functionBlock, sourceAddrHigh, sourceAddrLow})
                    break
                case 2:
                    if(this.multipartLength===0) {
                        this.messageSeq = 0x01
                        data.copy(this.multipartBuffer, this.multipartLength, 2, data.length)
                        this.multipartLength += telLen -2
                    } else {
                        if(seq===0) {
                            this.messageSeq = seq
                            data.copy(this.multipartBuffer, this.multipartLength, 1, data.length)
                            this.multipartLength += telLen -1
                        } else {
                            if(seq === this.messageSeq + 1) {
                               //console.log("message sequence continuing")
                                this.messageSeq = seq
                                data.copy(this.multipartBuffer, this.multipartLength, 1, data.length)
                                this.multipartLength += telLen -1
                            } else {
                               //console.log("message sequence Error", seq, this.messageSeq, data)
                            }
                        }
                    }

                    break
                case 3:
                    if(seq === this.messageSeq + 1) {
                       //console.log("message sequence Ending")
                        this.messageSeq = seq
                        data.copy(this.multipartBuffer, this.multipartLength, 1, data.length)
                        this.multipartLength += telLen -1
                        let finalMessage = this.multipartBuffer.slice(0, this.multipartLength)
                        this.functions[fktID].parse({instanceID, data: finalMessage, fktID, opType, fBlockID: this.functionBlock, sourceAddrHigh, sourceAddrLow})
                        this.multipartLength = 0
                        this.multipartBuffer = Buffer.alloc(65536)
                        this.messageSeq = 0
                    } else {
                       //console.log("message sequence Error")
                    }
            }
        }

    }

    getImplementedFkts() {

    }
}

module.exports = FunctionBlock