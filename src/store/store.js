import { configureStore } from '@reduxjs/toolkit';
import { companyReducer } from '../features/company/companySlice';
import { productReducer } from '../features/product/productSlice';
import { authReducer } from './../features/auth/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
        product: productReducer
    },
})

export default store;