const express=require('express')
const { getItemController, editItemController,addItemController,deleteItemController } = require('../controllers/itemController')

const router=express.Router()

// route method -get
router.get('/get-item',getItemController)

//rote method -post

router.post('/add-item',addItemController)

//method put
router.put('/edit-item',editItemController)

//delete -method
router.post('/delete-item',deleteItemController)


module.exports=router