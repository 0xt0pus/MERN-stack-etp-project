
const mongoose=require("mongoose");
const DB=process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log("mongoose.connect is successful");
}).catch((err)=>console.log("error in mongoose.connect "+err));
