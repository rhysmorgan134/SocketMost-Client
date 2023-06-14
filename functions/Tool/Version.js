const FktsID = require('../FktsID')
const {fBlocks} = require('../enums')

class Version extends FktsID {
    /**
     *
     */
    constructor(writeMessage, type, fBlockID, instanceID) {
        super(writeMessage, type, fBlockID, instanceID);
    }

    get({instanceID, telId, data, fktID, opType, telLen, fBlockID}) {
        super.get({instanceID, telId, data, fktID, opType, telLen, fBlockID});
    }

    sendStatus({instanceID, data, fktID, opType, fBlockID}) {
        super.sendStatus({instanceID, data, fktID, opType, fBlockID});
    }
}

module.exports = Version