const User = require("./../modals/userModel");
const JWT =require('jsonwebtoken')
exports.signup =async(req,res,next)=>{
    
 try{ const newUser =await User.create(req.body)
       
       const token=JWT.sign({id:newUser._id},process.env.JWT_SECRET)
      
    res.status(201).json({
        status:'success',
        data:{
            user:newUser,
            token_d:token
        }
    })}
    catch(err){
        
        res.json({
            
            status:'error',
            data:err
        })
    }
}