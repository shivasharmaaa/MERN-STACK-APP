const billsModel=require('../models/billsModel')

const addBillsController=async(req,res)=>{
    try {
        const newBill=new billsModel(req.body)
        await newBill.save()
        res.send('Bill Generated Successfully')
    } catch (error) {
        res.send('Something Went wrong')
        console.log(error)
    }
}

//get bill datsa
const getBillsController=async(req,res)=>{
    try {
        const bills=await billsModel.find()
        res.send(bills)
    } catch (error) {
       console.log(error) 
    }
}





    module.exports={addBillsController, getBillsController}

