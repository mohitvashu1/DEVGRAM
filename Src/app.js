const express =require('express');
const app =express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/help', (req, res) => {
  res.send('Hello World help')
})


app.listen(3000,()=>{
    console.log("SERVER STARTED");
    
});