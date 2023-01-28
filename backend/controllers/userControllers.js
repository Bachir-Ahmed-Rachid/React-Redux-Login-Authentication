const User=require('../models/userModel')
const asyncHandler = require("express-async-handler")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

//GENERATE JWT
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//@desc Get user
//@route GET/api/user/profile
//@access Private
exports.getProfile=asyncHandler(async(req,res)=>{
     const{name,email,_id}=await User.findById(req.user._id)
     res.status(200).json({
        id:_id,
        name,
        email
        
     })

   
})

//@desc Register user
//@route POST/api/user/register
//@access Public
exports.registerUser=asyncHandler(async(req,res)=>{
   const {name,password,email}=req.body


   //verification
   if(!name|| !password || !email){
    res.status(400)
    throw new Error('Please add all fields')
 
   }
   
   //check if the user exist
   const isUserExist=await User.findOne({email})

   if (isUserExist) {
    res.status(400)
    throw new Error('User already exists')

   } else {
    

    //hash password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // create the new user


    const user =await User.create({
        name,email,password:hashedPassword
    }) 

    if(user){
        res.status(201).json({...user._doc,token:generateToken(user._id)})
       }else{
        res.status(400)
        throw new Error('Invalid user data')
       }
    
   }


  
   
})

//@desc Login user
//@route PUT/api/user/login
//@access public
exports.loginUser=asyncHandler(async(req,res)=>{
   const{email,password}=req.body
   const user=await User.findOne({email})
   if(user && (await bcrypt.compare(password,user.password))){
    res.status(201).json({
        name:user.name,
        email:user.email,
        token:generateToken(user._id)

    })
   }else{
    res.status(400)
    throw new Error('Invalid user data')
   }
    
   
})

