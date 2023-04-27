import { configureStore } from "@reduxjs/toolkit"
import userInforSlice from '../modules/auth/redux/userReducer'
import productReducer from "../modules/home/redux/productReducer";

const store = configureStore({
    reducer: {
        UserInfor: userInforSlice,
        ProductData: productReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
