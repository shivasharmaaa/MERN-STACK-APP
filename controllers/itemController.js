const itemModel=require('../models/itemModel')
 const getItemController=async(req,res)=>{
    try {
        const items=await itemModel.find()
        res.send(items)
    } catch (error) {
       console.log(error) 
    }
}

const addItemController=async(req,res)=>{
    try {
        const newItem=new itemModel(req.body)
        await newItem.save()
        res.send('Item created Successfully')
    } catch (error) {
        res.send('error',error)
        console.log(error)
    }
}

//edit controller
const editItemController=async(req,res)=>{
    try {
        const {itemId}=req.body;
       console.log(itemId)
        await itemModel.findOneAndUpdate({_id:itemId},req.body,{
            new:true,
        })
        res.send('Item Updated')
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

//update controller
const deleteItemController=async(req,res)=>{
    try {
        const {itemId}=req.body;
     
        await itemModel.findOneAndDelete({_id:itemId})
        res.json('Item Deleted ')
    } catch (error) {
        res.send(error)
        console.log(error)
    }
    }


module.exports={getItemController,addItemController,editItemController,deleteItemController}

