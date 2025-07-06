const mongoose = require('mongoose');



async function connectDB() {
  await mongoose.connect('mongodb+srv://mohitvashuchoubey:C38qUwnucAsCReDn@devgram.rakrvby.mongodb.net/devGRAM');
  
}

module.exports=connectDB;


