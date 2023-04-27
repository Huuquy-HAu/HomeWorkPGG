import { PayloadAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/user";
import { RootState } from "../../../redux/store";


interface UserInforState{
    UserInforData: IUser
}

const initialState: UserInforState = {
    UserInforData:{id:NaN, email:"", name:"", gender:"", avatar:"", description:"", region: NaN, state:NaN, createdAt: "", updatedAt: "" , token:""}
} 

const userInforSlice = createSlice({
    name:"UserInfor",
    initialState,
    reducers:{
        setUserInfor(state, action: PayloadAction<IUser>){
            state.UserInforData = action.payload
        },
        removeUserInfor(state){
            return initialState
        }
    }
})

export const { setUserInfor , removeUserInfor } = userInforSlice.actions

export const selectUserInfor = (state: RootState) => state.UserInfor.UserInforData;

export default userInforSlice.reducer;
