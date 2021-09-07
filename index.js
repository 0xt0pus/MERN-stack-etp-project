const express = require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const bcrypt=require("bcryptjs");

dotenv.config({path:'./config.env'})
// Connecting to db


require('./db/databaseConnection.js');

var score=0;



const biology=require("./models/biologyschema.js");
const physics=require("./models/physicsschema.js");

const User=require('./models/userschema.js');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





var number=0;


app.get("/", function(req, res) {

  res.sendFile(__dirname+"/original/index.html");

});



app.get("/signup",function(req,res){

  res.render("signup",{error:""});

});


app.post("/signup",function(req,res)
{

    const {email,username,password1,password2}=req.body;

    // res.send(email+username+password1+password2);

  if(!email || !username || !password1 || !password2)
  {
      res.render("signup",{error:"Empty field is not allowed, Please fill all fields "});
  }

  else if(password1!=password2)
  {
    res.render("signup",{error:"Both passwords must match"});

  }



    const userexist= User.findOne({email:email},async(err,found)=>{

    if(found)
    {

      // res.send(found);

      res.render("signup",{error:"Email Already Exist"});
    }

    else{

      const hashedPassword1= await bcrypt.hash(password1,12);
      const hashedPassword2= await bcrypt.hash(password2,12);


      const user=new User({email,username,
        password1:hashedPassword1,
        password2:hashedPassword2,
      });
      user.save();

      res.render("signup",{error:"Register successfully, login to continue"});

    }


  });


  });








// });




app.get("/login",function(req,res){

  res.render("login",{error:""});

});



app.post("/login",function(req,res){

  const {email,password}=req.body;


if(!email || ! password)
{
  res.render("login",{error:"Empty field is not allowed"});
}

else {





  const userexist= User.findOne({email:email},async(err,found)=>{

  if(found)
  {


    const isMatched=await bcrypt.compare(password,found.password1);

    if(isMatched)
    {
      res.send("logged in");
    }
    else
    {
      res.render("login",{error:"Password is incorrect"});


    }
  }

  else{
    res.render("login",{error:"Email not found!"});
  }


  });










}







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
