import axios from 'axios';


export const updateUserDetails=(data)=>axios.put('/api/v1/user/update/details',data);
export const updatePassword=(data)=>axios.put('/api/v1/user/update/password',data);
export const updateShippingInfo=(data)=>axios.put('/api/v1/user/update/shipInfo',data);
export const uploadAvatar=(data)=>axios.put('/api/v1/user/upload/avatar',data);
export const updloadAvatarViaLink=(data)=>axios.put('/api/v1/user/update/avatarViaLink',data)