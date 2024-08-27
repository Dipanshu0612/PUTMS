const mongoose=require("mongoose")

const NotificationSchema=new mongoose.Schema({
    title:String,
    message:String
})

const myDB=mongoose.connection.useDb('users_db')
const NotificationModel=myDB.model("notification", NotificationSchema)
module.exports=NotificationModel;