import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please provide name for the product"]
  },
  category:{
    type:String,
    required:[true,"please provide the category name"]
  },
  description:{
    type:String,
    required:[true,"please add description"]
  },
  image:{
    type:String,
    required:[true,"Please provide an image"]
  },
  price:{
    type:Number,
    default:0,
  },
  oldPrice:{
    type:Number,
    default:0,
  },
  discount:{
    type:Number,
    default:0,
  },
  tags:[{
    type:String
  }
  ],

  Note:{
    type:String,
  },
  Stock:{
    type:Number,
    required:[true,"please provide the Stock"],
    max:[1000,"Stock cannot exceed 4 characters"],
    default:1,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }, 
   images:[
    {
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    }
  ],
  ratings:{
    type:Number,
    default:0,
  },
  numOfReviews:{
    type:Number,
    default:0,
  },
  reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
      },
      rating:{
        type:Number,
        required:true,
      },
      comment:{
        type:String,
        required:true,
      },
    }
  ],
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }


})
const ProductCard=mongoose.model('ProductCards',productSchema);
export default ProductCard;