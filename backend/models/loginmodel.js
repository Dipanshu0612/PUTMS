const mongoose=require("mongoose")

const LoginSchema=new mongoose.Schema({
    ID:Number,
    Password:String,
    otp:String
})

const myDB=mongoose.connection.useDb('users_db')
const LoginModel=myDB.model("login_details", LoginSchema)
module.exports=LoginModel;