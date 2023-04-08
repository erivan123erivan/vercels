const express = require("express");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const Conversation = require("../models/Conversation");
const User = require("../models/User")
const router = express.Router();

function SocketRouter(io) {

    router.post("/end-call", async(req, res, next) => {

        try {
            const{
                sender, 
                receiver
            } = req.body
        
        const user = await User.findById(sender)   
        io.emit(`${receiver}`, { update: true, calling: true, end:true, audio: true, user });
        
        res.send({
            success: true,
            message: 'calling'
        })
            
        } catch (exp) {
            next(exp)
            
        }
    })


    router.post("/accept-call", async(req, res, next) => {

        try {
            const{
                sender, 
                receiver,
                agora
            } = req.body
        
        io.emit(`${receiver}`, { update: true, calling: true, accept: true, audio: true, agora  });
        
        res.send({
            success: true,
            message: 'calling'
        })
            
        } catch (exp) {
            next(exp)
            
        }
    })







    router.post("/calling", async(req, res, next) => {

        try {
            const{
                sender, 
                receiver
            } = req.body
        
        const user = await User.findById(sender)   

        const appID = process.env.APP_ID; 
        const appCertificate = process.env.APP_CRETIFICATE;
        const channel = sender;
        const role = RtcRole.PUBLISHER;
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    
        const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, 0, role, privilegeExpiredTs);
    
        const agora = {
            appId: process.env.APP_ID,
            channel: sender,
            token
        }

        io.emit(`${receiver}`, { update: true, calling: true, audio: true, user, agora });
        
        res.send({
            success: true,
            message: 'calling'
        })
            
        } catch (exp) {
            next(exp)
            
        }
    })









    router.post("/send-message", async(req, res, next) => {

        try {
            const{
                sender, 
                receiver, 
                type,
                image,
                message
            } = req.body
        
            const conversation = await Conversation.find({ users: { $all: [sender, receiver] }});
            
            if(conversation.length>0){
    
                Conversation.findOneAndUpdate(
                    { _id: conversation[0]._id  },
                    { $push: { messages: {
                        message,
                        sender,
                        type,
                        image
                    } } },
                    { new: true }
                  ).then((conversation) => {

                    io.emit(`${receiver}`, { update: true, text: true  });

                    return res.status(201).json({
                        success: true,
                        conversation,  
                        message: "Message sent"
                    });
                  }).catch((err) => {
                    console.log(err);
                  });  
            }else{
                const _conversation = new Conversation({
                    messages: {
                        message,
                        sender,
                        message,
                        sender,
                        type,
                        image
                    },
                    users: [sender, receiver]
                });
        
                _conversation.save()
                    .then((err, conversation)=>{

                        io.emit(`${receiver}`, { update: true, text: true });

                        if(err){
                            return res.status(400).json({
                                err,
                                message: "Something went wrong",
                            });
                        }
    
                        if(conversation){
                            res.send({
                                success: true,
                                conversation,
                                message: 'Message sent'
                            })
                        }
                    })
            }
            
        } catch (exp) {
            next(exp)
            
        }
    })

    return router;
}

module.exports = SocketRouter;