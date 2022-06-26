const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
    {
        user_id : {type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true 
        },
        notice_text : {type: String, required: true },
        date : {type : String, required: true},
    },{
        versionKey : false
    }
    
)


module.exports = mongoose.model('post', postSchema)