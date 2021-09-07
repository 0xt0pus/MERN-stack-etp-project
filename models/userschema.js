const mongoose=require("mongoose");

const Userschema=new mongoose.Schema({
  email:String,
  username:String,
  password1:String,
password2:String
});




const User=mongoose.model("user"/*This is what defining the name of our collection in database*/,Userschema);
module.exports=User;
