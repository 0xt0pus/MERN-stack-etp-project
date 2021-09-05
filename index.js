const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'})
// Connecting to db


require('./db/databaseConnection.js');

var score=0;

//requiring models
// const biology=require("./models/schema.js");
// const physics=require("./models/schema.js");


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








const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





var number=0;

// var correctOptions=[4,3,1,2];
// var userOptions=[];




// const biologysch={
//
// question:String,
// op1:String,
// op2:String,
// op3:String,
// op4:String,
// subject:String,
// correct:String,
// pmcTestNumber:Number
//
// };
// //
// const biology=mongoose.model("biology",biologysch);
//
// const mcq1=new mcq({
//
//   question:"what is the name of your country?",
//   op1:"Pakistan",
//   op2:"ALgeria",
//   op3:"india",
//   op4:"Afghanistan",
//   correct:"Pakistan"
// });
//
// const mcq2=new mcq({
//
//   question:"what is the nam2e of your country?",
//   op1:"Paki2stan",
//   op2:"ALgeria",
//   op3:"indi2a",
//   op4:"Afghanistan",
//   correct:"Pakistan"
// });
//
//
// const mcq3=new mcq({
//
//   question:"what is the name of your country3?",
//   op1:"Pakist3an",
//   op2:"ALgeria",
//   op3:"india",
//   op4:"Afghanistan",
//   correct:"Pakistan"
// });
//
//
//
//
// const mcq4=new mcq({
//
//   question:"what is the name of your country4?",
//   op1:"Pakistan4",
//   op2:"ALgeria4",
//   op3:"india",
//   op4:"Afghanistan",
//   correct:"Pakistan"
// });
//
//
//
// const mcq5=new mcq({
//
//   question:"what is the name of your country5?",
//   op1:"Pakistan5",
//   op2:"ALgeria5",
//   op3:"india",
//   op4:"Afghanistan",
//   correct:"Pakistan"
// });





// const defaultmcqs=[mcq1,mcq2,mcq3,mcq4,mcq5];



app.get("/", function(req, res) {

  res.sendFile(__dirname+"/original/index.html");

});


app.get("/test", function(req,res){


if(number==2)
{
  res.send("wowo your score is "+score);
}

else{

  biology.find({},function(err,foundmcq){
  //
  //  console.log(foundmcq)
    res.render("question-design",{question:foundmcq[number].question,option1:foundmcq[number].op1,option2:foundmcq[number].op2,option3:foundmcq[number].op3,option4:foundmcq[number].op4});
});
}

});


app.post("/",function(req,res){

  var option=Number(req.body.select);


var databaseAnswer;

  biology.find({},function(err,foundmcq){

    databaseAnswer=foundmcq[number].correct;

  //res.send("The database is "+ foundmcq[number].op1 +" and now the user entered is  "+databaseAnswer);


if(option===1)
{
  if(foundmcq[number].op1===databaseAnswer)
  {
    score++;
  }
}

else if(option===2)
{
  if(foundmcq[number].op2===databaseAnswer)
  {
    score++;
  }
}

else if(option===3)
{
  if(foundmcq[number].op3===databaseAnswer)
  {
    score++;
  }
}


else if(option===4)
{
  if(foundmcq[number].op4===databaseAnswer)
  {
    score++;
  }
}

//res.send("The database is "+ foundmcq[number].op3 +" and now the user entered is "+option+"  " +databaseAnswer+score);

  number++;


  });



  res.redirect("/test");

});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
