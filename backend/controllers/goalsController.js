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
    console.log(id)
    const{text}=req.body
    console.log(text)
    try {

        if(!req.user){
            res.status(400)
            throw new Error('User not found')
        }
      
        const goal=await Goal.findByIdAndUpdate(id,{text:text},{new:true})
        if(goal && goal.user.toString()===req.user._id.toString()){
            res.status(200).json(goal)
        }
        else if(goal  && goal.user.toString()!==req.user._id.toString()){
            res.status(400)
            throw new Error('Not Authorized')
        }
        
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
    console.log('user',req.user)
    console.log('id',id)

    const goal=await Goal.findById(id)
 
    
    console.log(goal)
    if(goal && goal.user.toString()===req.user._id.toString()){
        await goal.remove()
        res.status(200).json({message: 'deleted'})
    }else if(goal && goal.user.toString()!==req.user._id.toString()){
        res.status(400)
        throw new Error('Not Authorized')
    }else if (!goal){
        res.status(400)
        throw new Error('goal was not found')
    }




   

       
    
      
    
   
   
})