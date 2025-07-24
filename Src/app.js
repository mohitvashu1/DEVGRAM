const express =require('express');
const connectDB=require("./config/database")
const app =express();
const cookieParser =require('cookie-parser');
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


//Middlewares
app.use(express.json());
app.use(cookieParser());


//Routes
const authRouter =require("./routes/authRout");
const requestRouter =require("./routes/request");
const profileRouter =require("./routes/profile");
const userRouter = require("./routes/userRout");

app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/", userRouter);

connectDB().then(()=>{
console.log("Database Connected successfully");
app.listen(3001,()=>{
    console.log("SERVER STARTED");
    
});
}).catch(err=>{
    console.error("Database Not Connected ");
    
})


