const Conversation = require('../models/Conversation.js');
const User = require("../models/User")

module.exports.getConversation = async(req,res, next) => {
    try{
        const {sender, receiver } = req.query
        const user = await User.findById(receiver)


        const conversation = await Conversation.find({ users: { $all: [sender, receiver] }});
        if(conversation.length>0){
            return res.send({
                success: true,
                user,
                conversation: conversation[0],
            })
        }else{
            return res.send({
                success: true,
                user,
                conversation: []
            })
        }

    }catch(ex){
        next(ex)
    }
}