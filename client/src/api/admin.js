import axios from 'axios';


// to creat new product 
export const createProduct=(data)=>axios.post('/api/v1/products',data);
export const getAdminProducts=()=>axios.get('/api/v1/products/admin/allProducts');
export const updateProduct=(id,data)=>axios.put(`/api/v1/products/admin/update/${id}`,data);
export const deleteProduct=(id)=>axios.delete(`/api/v1/products/admin/delete/${id}`);


//orders
export const getAdminOrders=()=>axios.get('/api/v1/order/admin/allOrders');
export const updateStatus=(id,status)=>axios.put(`/api/v1/order/admin/update/status/${id}`,{status})




//users
export const getAdminUsers=()=>axios.get('/api/v1/user/admin/allUsers');
export const updateRole=(id,data)=>axios.put(`/api/v1/user/admin/updateRole/${id}`,data)