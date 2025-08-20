const mongoose = require('mongoose');



async function connectDB() {
  await mongoose.connect(process.env.DB_SECRET_KEY);
  
}

module.exports=connectDB;


