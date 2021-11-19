const asyncHandler = require('express-async-handler');
const User = require('../Models/signUpdata');

const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    const existUser = await User.findOne({email})

    if(existUser){
        res.status(400);
        throw new Error('User Already Exists');

    }
    else {
        const newUser = User.create({
            name,
            email,
            password
        });
        if(newUser){
            res.status(201).json({
                name:newUser.name,
                email:newUser.email,
                password:newUser.password,
                token:generateToken(newUser._id)

            })
        }
        else {
            res.status(400);
            throw new Error ('Something is wrong')
        }
    }
    
   
})

module.exports = registerUser