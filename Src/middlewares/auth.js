const jWT=require('jsonwebtoken');
const User = require('../models/user');



const userAuth = async (req,res,next)=>{
    
    
    try{
    const{token}=req.cookies;

    if(!token){

         return res.status(401).send("Please Login!");
    }
    
    const decodeObj = await jWT.verify(token ,"DEV@GRAM810");
      
    const {_id}=decodeObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }

    req.user=user;
    next();

} catch(err){
    res.status(400).send("ERR:"+err.message);
        
   }

};





module.exports={userAuth};