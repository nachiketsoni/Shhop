import User from '../models/userModel.js';
import {sendToken} from '../utils/jwtToken.js'
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import cloudinary from 'cloudinary';
import { dataUri } from '../utils/convertToURI.js';
//Register a User
export const registerUser=async(req,res,next)=>{
    try{
        const {username,name,email,password}=req.body;
        const uData=await User.create({
            name,email,password,username
        })
  
        sendToken(uData,201,res,req);
    }catch(err){
        res.status(409).json({message:err.message});
    }


}

export const Login=async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        //checking if user has given password and email both 
        if((!username) || (!password)){
           return res.status(400).json({message:"please Enter username and password"});
        }
        const uData=await User.findOne({username}).select("+password");
        if(!uData){
           return res.status(401).json({message:"Invalid username or password"});
        }
        const isPasswordMatched=await uData.comparePasswords(password);
        if(!isPasswordMatched){
           return res.status(401).json({message:"Invalid username or password"});
        }  
        sendToken(uData,200,res,req);

 

    }catch(err){
        res.status(400).json({message:err.message});
    }
}

export const LogOut=async(req,res,next)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({success:true,message:"logOut"})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

//forgot password
export const forgotPassword=async(req,res,next)=>{
    try{
        const uData=await User.findOne({email:req.body.email});
        if(!uData)
        return res.status(404).json({message:"user not found"});

        const resetToken=await uData.getResetPasswordToken();
      
        await uData.save({validateBeforeSave:false});

        res.status(200).json({resetToken});
        //send mail abhi work nahi kar raha hai

        // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        // const message=`Your password reset token is :- \n\n
        // ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;
        // try{
        //     await sendEmail({
        //        email:uData.email,
        //        subject:'Shhop. Password Recovery',
        //        message,
        //     });
        //     res.status(200).json({
        //         success:true,
        //         message:`Email set to ${uData.email} successfully`,
        //     })


        // }catch(err){
        //     uData.resetPasswordToken=undefined;
        //     uData.resetPasswordExpire=undefined;
        //     await uData.save({validateBeforeSave:false});
        //     return next(res.status(500).json({message:err.message}));

        // }

    }catch(err){
        return res.status(400).json({message:err.message})
    }
   
}

//reset password
export const resetPassword=async(req,res,next)=>{

    console.log(req.params.token)
    //creating token hash
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const uData=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    console.log(uData)
    if(!uData)
    return res.status(404).json({message:"reset password token is invalid or has been expried"});

    if(req.body.password !==req.body.confirmPassword){
        return res.status(400).json({message:"Password does not match"});
    }
    uData.password=req.body.password;
    uData.resetPasswordExpire=undefined;
    uData.resetPasswordToken=undefined;
    console.log(uData);
    await uData.save();
    sendToken(uData,200,res,req);

}


//get user details
export const getUserDetails=async(req,res,next)=>{
        const user=await User.findById(req.user.id);
        let isShipInfo=user.shippingInfo.writtenBy;
        return res.status(200).json({success:true,
        user,isShipInfo});
    
   

}

//update user password 
export const updateUserPassword=async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePasswords(req.body.oldPassword);

    if(!isPasswordMatched)
    return res.status(401).json({message:"Invalid Old password!"});

    if(req.body.newPassword !==req.body.confirmPassword){
        return res.status(400).json({message:"password doesn't match"})
    };
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res,req);





}

//update userprofile by image url
export const updateAvatarByLink=async (req,res,next)=>{
    try{
        // console.log(req.body);
        const user=await User.findById(req.user.id);
        if(user.avatar.public_id.slice(0,11)==='userAvatars'){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }
        let updateData={
            public_id:nanoid(),
            url:req.body.url,
        }
        user.avatar=updateData;
        await user.save();
        res.status(200).json({
            success:true,
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
//user avtar upload
export const uploadAvatarByFile=async(req,res,next)=>{
    try{
        // console.log(req.files)
        if(req.files){
             let data=dataUri(req.files);
        let cloudData=await cloudinary.v2.uploader.upload(data,{
            folder: "userAvatars",
        })
        const {public_id,url}=cloudData;
        let user=await User.findById(req.user.id)
        user.avatar={
            public_id,url
        }
        await user.save()
        res.status(200).json({success:true,cloudData}) 
        }else{
            res.status(404).json({message:'file ni mili'})
        }
        
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message})

    }
}

//update userdetails 
export const updateDetails=async (req,res,next)=>{
    try{
        const {username,email,name}=req.body;
        const user=await User.findById(req.user.id);
        user.username=username;
        user.email=email;
        user.name=name;
        await user.save();
        res.status(200).json({
            success:true,
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })

    }
}

//update ShipInfo
export const updateShipInfo=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        user.shippingInfo={...req.body,writtenBy:true};
        await user.save();
        res.status(200).json({success:true});

    }catch(err){
        res.status(400).json({success:false,message:err.message});

    }
}

//get all user --admin
export const getAllUsers=async (req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            success:true,
            users,
            totalUsers:users.length
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}

//get individual user --admin
export const getIndividualUser=async (req,res,next)=>{
    try{
      const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:`User does not exist with Id: ${req.params.id}`})
    }
    res.status(200).json({
        success:true,
        user,
    });  
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
    
}

//update user Role --admin
export const updateUserRole=async(req,res,next)=>{
    try{
        const newData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
        }
        await User.findByIdAndUpdate(req.params.id,newData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        res.status(200).json({
            success:true,
        })

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}

//delete User --admin
export const deleteUser=async(req,res,next)=>{
    try{

        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({message:`User does not exist with Id: ${req.params.id}`})
        }
        await user.remove();
        res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        })
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }

}

