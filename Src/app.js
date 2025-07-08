const express =require('express');
const connectDB=require("../config/database")
const app =express();
const User =require("../models/user")
const { validateSignUpData } = require("../utils/validation");
const bcrypt =require('bcrypt');
const cookieParser =require('cookie-parser');
const jWT =require("jsonwebtoken");


//Middlewares
app.use(express.json());
app.use(cookieParser());


//SignUP (Add New Users)
app.post('/signup', async(req,res)=>{
    
  try{
    //Validation of data
    validateSignUpData(req);
   
  
   

   
   const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

  await user.save()
    res.send("User Added Sucessfully")

  } catch(err){
    res.status(400).send("Error: "+ err.message)
  }
    
});



//Login
app.post('/login', async (req,res)=>{

  try{
     const{emailId,password}=req.body;

    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Email ID is not Registered");

    }
    const isPassordValid= await bcrypt.compare(password,user.password);
    if(isPassordValid){

  //Create a Json Web Token

    const token = await jWT.sign({_id:user._id}, "DEV@GRAM810");
    console.log(token);

  //Adding the token to cookie and sending back to user
      res.cookie("token",token);
      res.send("Log-In Successfully");
    } else {
      throw new Error("Password not Valid");
    }


  }catch(err){
    res.status(400).send("Error:"+err.message);

  }


});


app.get("/profile", async (req,res)=>{

try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedMessage = await jWT.verify(token, "DEV@GRAM810");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


// GEt All Emails - Find All Email from the database
app.get('/getEmail' , async(req,res)=>{
    const getEmail=req.body.emailId;
    

    try{
        console.log(getEmail);
        
        const users =await User.find({ emailId:getEmail})
       
        if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
    }catch{
        res.status(404).send("Something Went Wrong :(")
    }
    
});   

// Find ONE API - Find One Email from the database
app.get("/getOneEmail", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    console.log(users);
    
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});


// Detele a user from the database
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});


// Update data of the user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
}catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
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


