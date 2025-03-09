import { configureStore } from '@reduxjs/toolkit';
import cartItemsReducer from './Reducers/cartItems';

const store = configureStore({
    reducer: {
        cartItems: cartItemsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
