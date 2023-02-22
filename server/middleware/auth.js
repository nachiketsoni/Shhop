import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

export const isAuthenticatedUser=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        
        if(!token){
           return res.status(401).json({message:"Please login to access these resources"})
        }else{
            const decodedData=jwt.verify(token,process.env.JWT_SECRET)
            req.user= await User.findById(decodedData.id);
            next();
        }
        
    }catch(err){
       return res.status(400).json({message:err.message});
      
    }
   
}
export const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(res.status(403).json({message:`Role: ${req.user.role} is not allowed to access this resource` }));
        }
        next();
    }

}