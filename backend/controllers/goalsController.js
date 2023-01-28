const Goal=require('../models/goalModel')
const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')

//@desc Get goals
//@route GET/api/goals
//@access Private
exports.getGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.find({user:req.user._id}).sort ( { createdAt: -1 } )
    res.status(200).json(goal)
   
})

//@desc Set goals
//@route POST/api/goal
//@access Private
exports.setGoal=asyncHandler(async(req,res)=>{
    const{text}=req.body
    console.log(req.body)
    try {
        const goal=await Goal.create({text,user:req.user._id})
        res.status(200).json(goal)
    } catch (error) {
        res.status(400)
        throw new Error('pleas add a text field')
    }

  
   
})

//@desc Update goals
//@route PUT/api/goal/:id
//@access Private
exports.updateGoal=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const{text}=req.body
    try {
        const user=await User.findOne({id:req.user.id})
        if(!user){
            res.status(400)
            throw new Error('User not found')
        }
      
        const goal=await Goal.findByIdAndUpdate(id,{text:text},{new:true})
        if(goal.user.toString()!==user.id){
            res.status(400)
            throw new Error('NOt Authorized')
        }
        res.status(200).json(goal)
    } catch (error) {
        res.status(400)
        throw new Error('pleas add a text field')
    }
    
   
})

//@desc Delete goals
//@route DELETE/api/goal/:id
//@access Private
exports.deleteGoal=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(req.user.id)

        if(!user){
            res.status(400)
            throw new Error('User not found')
        }
        const goal=await Goal.findById(id)

        if(goal.user.toString()!==user.id){
            res.status(400)
            throw new Error('NOt Authorized')
        }
        if (goal) {
            goal.remove()
            res.status(200).json({message: 'deleted'})
        } else {
            res.status(400)
            throw new Error('pleas add a text field')
        }
       
    
      
    
   
   
})