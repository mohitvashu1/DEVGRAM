const express =require('express');
const connectDB=require("../config/database")
const app =express();
const User =require("../models/user")

app.use(express.json());//Middelwares

app.post('/signup', async(req,res)=>{
    
 //Creating a new instance of the user model 
     const user =new User(req.body);

    // const user =new User({
    //     firstName : "Vashu",
    //     lastName : "Choubey",
    //     emailId:"Vashuchoubey1@gmail.com",
    //     password:"Vashu@123"

    // });

    try{
     await user.save();
     res.send("User Added Sucessfully")
    }catch(err){
        error.code(400).send("Error Saving the user :"+err.message)

    }

    
})










connectDB().then(()=>{
console.log("Database Connected successfully");
app.listen(3001,()=>{
    console.log("SERVER STARTED");
    
});
}).catch(err=>{
    console.error("Database Not Connected ");
    
})


