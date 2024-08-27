const mongoose=require("mongoose")

const FeedbackSchema=new mongoose.Schema({
    ID:String,
    Name:String,
    Title:String,
    Feedback:String
})

const myDB=mongoose.connection.useDb('users_db')
const FeedbackModel=myDB.model("feedback", FeedbackSchema)
module.exports=FeedbackModel;