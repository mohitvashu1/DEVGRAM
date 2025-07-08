# DEVGRAM
DEVGRAM is a social platform designed specifically for developers to connect, collaborate, and share their passion for coding. 🤖💻

Done so far...


- initialized git
 - .gitignore
 - Create a remote repo on github
 - Push all code to remote origin
 - Play with routes and route extensions ex. /hello, / , hello/2, /xyz
 - Order of the routes matter a lot
 - Installed Postman app and make a workspace/collectio > test API call
 - Wrote logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
 - Explored routing and use of ?, + , (), * in the routes
 - Use of regex in routes /a/ ,  /.*fly$/
 - Readed the query params in the routes
 - Readed the dynamic routes

 - Multiple Route Handlers - Play with the code
 - next()
 - next function and errors along with res.send()
 - app.use("/route", rH, [rH2, rH3], rH4, rh5);
 - What is a Middleware? Why do we need it?
 - How express JS basically handles requests behind the scenes
 - Difference app.use and app.all
 - Wrote a dummy auth middleware for admin
 - Wrote a dummy auth middleware for all user routes, except /user/login
 - Error Handling using app.use("/", (err, req, res, next) = {});

 - Create a free cluster on MongoDB official website (Mongo Atlas)
 - Installed mongoose library
 - Connect your application to the Database "Connection-url"/devTinder
 - Call the connectDB function and connect to database before starting application on 7777
 - Created a userSchema & user Model
 - Created POST /sigup API to add data to database
 - Push some documents using API calls from postman
 - Error Handling using try , catch

 - JS object vs JSON (difference)
 - Added the express.json middleware to your app
 - Make your signup API dynamic to recive data from the end user
 - User.findOne with duplucate email ids, which object returned
 - API- Get user by email
 - API - Feed API - GET /feed - get all the users from the database
 - API - Get user by ID
 - Created a delete user API
 - Difference between PATCH and PUT
 - API - Update a user
 - Explored the Mongoose Documention for Model methods
 - What are options in a Model.findOneAndUpdate method, Explored more about it
 - API - Update the user with email ID

 - Explored schematype options from the documention
 - added required, unique, lowercase, min, minLength, trim
 - Added default
 - Created a custom validate function for gender
 - Improved the DB schema - PUT all appropiate validations on each field in Schema
 - Added timestamps to the userSchema
 - Added API level validation on Patch request & Signup post api
 - DATA Sanitizing - Add API validation for each field
 - Installed validator
 - Explored validator library funcation and Use vlidator funcs for password, email, photoURL
 - NEVER TRUST req.body

 - Validate data in Signup API
 - Installed bcrypt package
 - Created PasswordHash using bcrypt.hash & save the user is excrupted password
 - Created login API
 - Compared passwords and throw errors if email or password is invalid

 
 - Installed cookie-parser
 - just send a dummy cookie to user
 - Created GET /profile APi and check if you get the cookie back
 - Installed jsonwebtoken 
 - IN login API, after email and password validation, create e JWT token and send it to user in cookies
 - read the cookies inside your profile API and find the logged in user
- Installed jsonwebtoken 
 - IN login API, after email and password validation, create e JWT token and send it to user in cookies
 - read the cookies inside your profile API and find the logged in user
 - userAuth Middleware
 - Added the userAuth middle ware in profile API and a new sendConnectionRequest API
 - Set the expiry of JWT token and cookies to 7 days
 - Created userSchema method to getJWT() 
 - Created UserSchema method to comparepassword(passwordInputByUser)

