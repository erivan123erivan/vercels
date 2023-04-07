const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const Session = require("../models/Session");
exports.generateToken = async(req, res) => {

    const { sender, receiver } = req.query;
    
    const appID = process.env.APP_ID; 
    const appCertificate = process.env.APP_CRETIFICATE;
    const channel = _id;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, 0, role, privilegeExpiredTs);

    const updates = {
        live: true,
        agora: {
            appId: process.env.APP_ID,
            channel: _id,
            token
        }
    };
    
}