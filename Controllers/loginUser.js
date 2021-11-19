const asyncHandler = require('express-async-handler');
const User = require('../Models/signUpdata');
const generateToken = require('../utils/generateToken');


const loginUser = asyncHandler(async(req,res)=>{

   const email = req.body.email;
   const password = req.body.password;
   const user = await User.findOne({email});
   console.log(user.password)

   if(user && password === user.password){
    //res.send('Yayyyy')  
    res.send({
        id:user._id,
        token:generateToken(user._id),
        name:user.name,
        email:user.email,
        password:user.password
    })
   }
   else{
       res.send("Invalid Password")
   }
   
})

module.exports = loginUser