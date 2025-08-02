const mongoose=require('mongoose');
const validator = require("validator");
const jWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema= new mongoose.Schema({
    
      firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 10
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 10
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
        
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {

      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others","Male", "Female", "Others"],
        message: `{VALUE} is not a valid gender type`,
      },
     
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    hobbies: {
      type: String,
    },
},{
    timestamps: true,

});


userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jWT.sign({ _id: user._id }, "DEV@GRAM810", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);