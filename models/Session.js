const mongoose =require("mongoose");
const Schema = mongoose.Schema;

    const sessionSchema = new Schema(
        {
            users: {
                type: Array,
            },
            agora: {
                type: Object
            }
        },
        {
            timestamps: true, 
        }
    ); 

const Session = mongoose.model('Session',sessionSchema); 

module.exports = Session; 