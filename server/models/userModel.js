import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,'Name cannot exceed 30 characters'],
        minLength:[4,'Name should have more than 4 character']
    },
    username:{
        type:String,
        required:[true,"Please Enter your username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
            default:"0000000random"
        },
        url:{
            type:String,
            required:true,
            default:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
        }
    },
    role:{
        type:String,
        default:"user",
    },
    shippingInfo:{
        address:{type:String},
        city:{type:String},
        state:{
            type:String
        },
        pinCode:{
            type:Number
        
        },
        phoneNo:{
            type:Number
        },
        writtenBy:{
            type:Boolean,
            default:false
        }
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE,})
}

//compare Password
userSchema.methods.comparePasswords=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)

}

//generating password reset token
userSchema.methods.getResetPasswordToken=async function(){
    //Generating Token
    const resetToken=crypto.randomBytes(20).toString("hex");
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.resetPasswordExpire=Date.now()+10*60*1000;
    
    return resetToken;

}

export default mongoose.model("User",userSchema);