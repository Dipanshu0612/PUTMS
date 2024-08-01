const mongoose=require("mongoose")

const AllUsersSchema=new mongoose.Schema({
   Name:String,
   Designation:String,
   Enrollment:Number,
   MIS_ID:Number,
   Department:String,
   Semester:Number,
   Mobile:Number,
   Institute:String,
   Card_ID:String,
   Bus_Pass_No:String,
   Area:String,
   Shift:String,
   img_url:String,
   Boarding_Point:String,
})

const myDB=mongoose.connection.useDb('users_db')
const AllUsersModel=myDB.model("users_details", AllUsersSchema)
module.exports=AllUsersModel;