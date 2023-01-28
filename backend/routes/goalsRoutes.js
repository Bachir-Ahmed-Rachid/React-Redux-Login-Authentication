const express=require('express')
const { setGoal, updateGoal, deleteGoal, getGoals } = require('../controllers/goalsController')
const { protect } = require('../middleware/authMiddleware')
const router=express.Router()

router.route('/')
    .get(protect,getGoals)
    .post(protect,setGoal)
router.route('/:id')
    .put(protect,updateGoal)
    .delete(protect,deleteGoal)

module.exports=router   