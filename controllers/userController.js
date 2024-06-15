const userModel=require('../models/userModel')

//login user
 const loginController=async(req,res)=>{
    try {
        const {userId,password}=req.body
       
        const user=await userModel.findOne({userId,password})
        if(!user)
        {
          
            return res.status(404).send('User Not Found') 
        }
        res.status(200).json(user)
            
    
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
       
    }
}
//register user
const registerController=async(req,res)=>{
    try {
        const newUser=new userModel(req.body)
        await newUser.save()
        res.send('New User Added  Successfully')
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}


module.exports={loginController,registerController}

