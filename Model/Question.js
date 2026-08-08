const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true,
        index:true
    },
    difficulty: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "Advanced"]
}
},{ timestamps: true });

module.exports = mongoose.model('Question',QuestionSchema)