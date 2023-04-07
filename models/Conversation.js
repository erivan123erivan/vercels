const mongoose =require("mongoose");
const Schema = mongoose.Schema;

    const messageSchema = new Schema(
        {   
            type: {
                type: String,
                enum : ["text", "image", "file"]
            },
            image: {
                type: String
            },
            message: {
                type: String            
            },
            sender: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true, 
        }
    )

    const conversationSchema = new Schema(
        {
            messages :[messageSchema],
            users: {
                type: Array,
            },
        },
        {
            timestamps: true, 
        }
    ); 

const Conversation = mongoose.model('Conversation',conversationSchema); 

module.exports = Conversation; 