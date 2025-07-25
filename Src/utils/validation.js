const validator= require('validator')


const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
  
}; 


const validateEditProfileData =(req) =>{
  const allowEditFields= [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];


const isEditAllowed = Object.keys(req.body).every((fields)=>
  allowEditFields.includes(fields)
);
return isEditAllowed;

};








module.exports = {validateSignUpData,validateEditProfileData};