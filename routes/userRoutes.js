const express=require('express')
const { loginController,registerController } = require('../controllers/userController')

const router=express.Router()

// route method -get
router.post('/login',loginController)

//rote method -post

router.post('/register',registerController)



module.exports=router