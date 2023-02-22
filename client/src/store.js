import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import themeSlice from './features/themeSlice';
import productSlice from './features/productSlice';
import userAuth from './features/userAuth';
import cartSlice from './features/cartSlice';
import orderSlice from './features/OrderSLice';
import myOrderSlice from './features/myOrderSlice';
import productDetailSlice from './features/productDetailSlice';
import ReviewSlice from './features/productReviewSlice';

import adminProductSlice from './features/admin/adminProductSlice';
import adminOrderSlice from './features/admin/adminOrderSlice';
import adminUserSlice from './features/admin/adminUserSlice';


import DetailsUpdate from './features/detailsUpdate/userDetailsUpdate';
import userAvatarUpdate from './features/detailsUpdate/userAvatarUpdate';
import userShipInfoUpdate from './features/detailsUpdate/userShipInfoUpdate';
import userPasswordUpdate from './features/detailsUpdate/userPasswordUpdate';

const persistConfig={
    key:'root',
    storage,
}

const persistedReducer=persistReducer(persistConfig,userAuth);

export const store=configureStore({
    reducer:{
        themeControl:themeSlice,
        products:productSlice,
        user:persistedReducer,
        cartData:cartSlice,
        orderData:orderSlice,
        myOrders:myOrderSlice,
        productDetails:productDetailSlice,
        productReview:ReviewSlice,

        adminProducts:adminProductSlice,
        adminOrders:adminOrderSlice,
        adminUsers:adminUserSlice,

        userDetailsUpdate:DetailsUpdate,
        userAvatarUpdate:userAvatarUpdate,
        userShipInfoUpdate:userShipInfoUpdate,
        userPasswordUpdate:userPasswordUpdate

    },
    middleware:[thunk]
})

export const persistor=persistStore(store);