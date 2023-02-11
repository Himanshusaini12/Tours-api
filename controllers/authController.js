const User = require("./../modals/userModel");

exports.signup =async(req,res,next)=>{
    
 try{ const newUser =await User.create(req.body)
    
    res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
    })}
    catch(err){
        
        res.json({
            
            status:'error',
            data:err
        })
    }
}