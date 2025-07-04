const express =require('express');
const app =express();


app.use('/help', (req, res, next) => {
  // res.send('Hello World 1');
  next();
},
 (req, res,next) => {
  res.send('Hello World 2');
  next();
},
 (req, res) => {
  res.send('Hello World 3')
}
)

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })




app.listen(3000,()=>{
    console.log("SERVER STARTED");
    
});