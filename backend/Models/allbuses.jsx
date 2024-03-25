const mongoose=require("mongoose")

const AllBusesSchema=new mongoose.Schema({
    Bus_Number:Number,
    Driver_Name:String,
    Driver_Contact:Number,
    Area:String,
    Starting_Point:String,
    End_Point:String
})

const myDB=mongoose.connection.useDb('users_db')
const AllBusModel=myDB.model("bus_details", AllBusesSchema)
module.exports=AllBusModel;