import { keyframes } from '@emotion/react';
import axios from 'axios';
// const url="http://localhost:3020/api/v1";

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('withCredentials',true)

// let productLink=`/api/v1/products?keyword=green&category=shoes&price[gte]=30&price[lt]=10000&page=1`
export const fetchProducts=(page=1,range=[0,75000],category=null,keyword=null)=>{
    let productLink=`/api/v1/products?keyword=${keyword?keyword:""}&page=${page}&price[gte]=${range[0]}&price[lt]=${range[1]}${(category)?`&category=${category}`:" "}`
    return axios.get(productLink, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
    })
};
//fetch single product
export const fetchProductDetails=(id)=>axios.get(`/api/v1/products/details/${id}`);

//fetch product reviews
export const fetchProductReviews=(id)=>axios.get('/api/v1/products/reviews',{ params: id });
//create review
export const createReview=(data)=>axios.put('/api/v1/products/create/review',data);


//getting user orders
export const fetchMyOrders=()=>axios.get('/api/v1/order/userOrders')

// ORDER CREATION 
export const createOrder=(data)=>axios.post('/api/v1/order',data)
export const createRazorpayOrderId=(price)=>axios.post('/api/v1/payment/order',{price});

//user authentication
export const getUserData=()=>axios.get('/api/v1/user/details');
export const logOut=()=>axios.get("/api/v1/user/logout");
export const loginUser=(user)=>axios.post(`/api/v1/user/login`,user,{headers});
export const registerUser=(userData)=>axios.post('/api/v1/user/register',userData,{headers});







