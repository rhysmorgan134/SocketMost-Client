const Amplifier = require('./functions/interfaces/Amplifier')
const NetworkMaster = require('./functions/interfaces/NetworkMaster')
const AudioDiskPlayer = require('./functions/interfaces/AudioDiskPlayer')
const NetBlock = require('./functions/interfaces/NetBlock')
const AmFmTuner = require('./functions/interfaces/AmFmTuner')
const ConnectionMaster = require('./functions/interfaces/ConnectionMaster')
const MicrophoneInput = require('./functions/interfaces/MicrophoneInput')
const DABTuner = require('./functions/interfaces/DABTuner')
const TVTuner = require('./functions/interfaces/TVTuner')
const GraphicDisplay = require('./functions/interfaces/GraphicDisplay')
const SDARS = require('./functions/interfaces/SDARS')
const AuxIn = require('./functions/interfaces/AuxIn')
const U245 = require('./functions/interfaces/u245')
const u240 = require('./functions/interfaces/u240')
const u22 = require('./functions/interfaces/u22')
const u35 = require('./functions/interfaces/u35')
const Vehicle = require('./functions/interfaces/Vehicle')
const Sources = require('./functions/interfaces/Sources')
const Climate = require('./functions/interfaces/Climate')
const Unknown = require('./functions/interfaces/Unknown')
const Function = require('./functions/interfaces/FBlock')
const enums = require('./functions/enums')
const SocketMostClient = require('./SocketMost')

module.exports = {
    Amplifier,
    NetworkMaster,
    AudioDiskPlayer,
    NetBlock,
    AmFmTuner,
    ConnectionMaster,
    MicrophoneInput,
    DABTuner,
    TVTuner,
    GraphicDisplay,
    SDARS,
    AuxIn,
    Vehicle,
    Function,
    SocketMostClient,
    enums
}