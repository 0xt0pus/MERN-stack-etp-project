const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({
  question:String,
  op1:String,
  op2:String,
  op3:String,
  op4:String,
  correct:String,
  subject:String,
  id:Number,
  pmcTestNumber:Number

});

const biology=mongoose.model('biology'/*This is what defining the name of our collection in database*/,questionSchema);
const physics=mongoose.model('physics'/*This is what defining the name of our collection in database*/,questionSchema);

module.exports=biology;
module.exports=physics;
