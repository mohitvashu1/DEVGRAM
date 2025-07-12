const express =require('express');
const connectDB=require("./config/database")
const app =express();
const cookieParser =require('cookie-parser');


//Middlewares
app.use(express.json());
app.use(cookieParser());


//Routes
const authRouter =require("./routes/authRout");
const requestRouter =require("./routes/request");
const profileRouter =require("./routes/profile");

app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);


connectDB().then(()=>{
console.log("Database Connected successfully");
app.listen(3001,()=>{
    console.log("SERVER STARTED");
    
});
}).catch(err=>{
    console.error("Database Not Connected ");
    
})


