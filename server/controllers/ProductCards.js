import ProductCard from "../models/products.js";
import mongoose from "mongoose";
import {nanoid} from 'nanoid';
import ApiFeatures from "../utils/apiFeatures.js";

import cloudinary from 'cloudinary';
// import { json } from "body-parser";

export const getCards=async (req,res)=>{
    try{

        const resultPerPage=8;
        const productsCount=await ProductCard.countDocuments();

        const apiFeature=new ApiFeatures(ProductCard,req.query)
        .search()
        .filter();

        let products=await apiFeature.query;
        let filteredProductsCount=products.length;
        apiFeature.pagination(resultPerPage);
        products=await apiFeature.query.clone();

        
        res.status(200).json({
            success:true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount,
        });

    }catch(err){
        res.status(400).json({message:err.message})
    }
}

//get single product card
export const getProductDetails=async(req,res)=>{
    try{
    const product=await ProductCard.findById(req.params.id);
    // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id');
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({
        success:true,
        product,
    });

    }catch(err){
        res.status(404).json({message:err.message})

    }

}

//create newReview or update the review
export const createProductReview=async (req,res)=>{
    try{
        const {rating,comment,productId}=req.body;
        const review={
            user:req.user._id,
            rating:Number(rating),
            comment,
        }
        const product=await ProductCard.findById(productId);
    
        const isReviewed=product.reviews.find(
            (rev)=>rev.user.toString()===req.user._id.toString()
            );
        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev.user.toString()===req.user._id.toString()){
                    rev.rating=rating,
                    rev.comment=comment;
                }
            })
            product.numOfReviews=product.reviews.length;

        }else{
            product.reviews.push(review);
            product.numOfReviews=product.reviews.length;
        }
        let avg=0;
        product.reviews.forEach((rev)=>{
            avg+=rev.rating;
        })
        product.ratings=avg/product.reviews.length;
        await product.save({validateBeforeSave:false});

        return  res.status(200).json({success:true,product})

    }catch(err){
        return res.status(404).json({message:err.message})
    }
}
//get all product reviews
export const getPRoductReviews=async (req,res)=>{
    try{
        const product=await ProductCard.findById(req.query.id).populate({path:'reviews',populate:{
            path:'user',
            model:'User'
        }})
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({
            success:true,
            data:product.reviews
        })

    }catch(err){
       return res.status(404).json({message:err.message});
    }
}

// Admin Routes 
//create new Products
export const createCard=async(req,res)=>{
    try{
        let images=[];
        if(typeof req.body.images==="string"){
            images.push(req.body.images);
        }else{
            images=req.body.images;
        }
         let {oldPrice,discount,tags}=req.body;
         let p=oldPrice-(oldPrice*(discount/100));
         let t=tags.split(" ");
         const imgLinks=[];
            for(let i=0;i<images?.length;i++){
                 const {public_id,url}=await cloudinary.v2.uploader.upload(images[i],{
                        folder: "productsImages",
                    });
            imgLinks.push({public_id,url})

            }  

         let  createdBy=req.user.id;
         let data={...req.body,price:p,tags:t,images:imgLinks,createdBy}
        let cData=await ProductCard.create(data)
       return res.status(200).json({message:"checking!",data});

    }catch(err){
       return res.status(409).json({message:err.message});
    }
}

//get Products ---admin
export const getProductsAdmin=async(req,res)=>{
    try{
        const allData=await ProductCard.find();
        res.status(200).json({
            success:true,
            allProducts:allData,
            ProductCount:allData.length,
        })

    }catch(err){
        res.status(400).json({message:"There is problem in loading data."})

    }
}

//delete Products --admin
export const deleteCard=async(req,res)=>{
    try{
        let id=req.params.id;
        let data=await ProductCard.findByIdAndDelete(id);
        res.status(200).json({success:true,data})

    }catch(err){
        res.status(400).json({message:err.message})
    }
}
//edit Product --admin
export const updateProductDetails=async(req,res)=>{
    try{
        let product=await ProductCard.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
         let t=req.body.tags.split(',')
         req.body.tags=t;

        // check for single and multiple images
        let images=[];
        if(typeof req.body.images==='string'){
            images.push(req.body.images);
        }else{
            images=req.body.images;
        }
        console.log(images);
        if(images!==undefined){
            //deleting previous images from cloudinary
            for(let i=0;i<product.images.length;i++){
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imgLinks=[];
            for(let i=0;i<images.length;i++){
                const {public_id,url}=await cloudinary.v2.uploader.upload(images[i],{
                    folder:'productsImages'
                })
                imgLinks.push({
                    public_id,url
                })
            }
            console.log(imgLinks);
            req.body.images=imgLinks;
        }
        // console.log(req.body);
        product=await ProductCard.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        return res.status(200).json({success:true});

    }catch(err){
       return res.status(404).json({success:false,
    message:err.message});
    }
}

