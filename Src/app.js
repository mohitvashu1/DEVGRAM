const express =require('express');
const connectDB=require("../config/database")
const app =express();
const User =require("../models/user")
app.use(express.json());//Middleware


//Creating a new instance of the user model 
app.post('/addNewUser', async(req,res)=>{
    
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
         res.status(400).send("Error Saving the user :"+err.message)

    }

    
})


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
    
})     

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


