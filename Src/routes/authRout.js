const express = require('express');
const bcrypt=require('bcrypt')
const User =require("../models/user")
const { validateSignUpData } = require("../utils/validation");
const {userAuth}=require("../middlewares/auth")


const authRouter = express.Router();



//SignUP (Add New Users)

authRouter.post('/signup', async(req,res)=>{
    
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

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });

  } catch(err){
    res.status(400).send("Error: "+ err.message)
  }
    
});

//LogIn
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
     const isPasswordValid = await user.validatePassword(password);
     if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() +30 * 24 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }   
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//LogOut
authRouter.post("/logout",userAuth, (req, res) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
});








module.exports=authRouter;