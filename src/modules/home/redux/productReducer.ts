import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../../models/product'
import { RootState } from '../../../redux/store'
import moment from 'moment'

interface productDataState {
    productDataList: IProduct[],
    productFilter: IProduct[]
}

const initialState: productDataState = {
    productDataList: [],
    productFilter: []
}


const productDataSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductData(state, action: PayloadAction<IProduct[]>) {
            state.productDataList = action.payload
            state.productFilter = action.payload
        },
        addProductData(state, action: PayloadAction<IProduct>) {
            state.productDataList.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<{ index: number; value: IProduct }>) {
            const { index, value } = action.payload;
            state.productDataList[index] = value;
        },
        deleteProduct(state, action: PayloadAction<number>) {
            state.productDataList.splice(action.payload, 1);
        },
        filterProduct: (state, action: PayloadAction<any>) => {
            const { status, client, from, to } = action.payload;
            console.log(from, to);

            let filteredData = state.productDataList.slice();
            if (status !== undefined && status !== "all" && status !== "") {
                filteredData = filteredData.filter((item) =>
                    item?.status?.toLowerCase()?.includes(status?.toLowerCase())
                );
            }
            if (client !== undefined && client !== "all" && client !== "") {
                filteredData = filteredData.filter((item) =>
                    item?.client?.toLowerCase()?.includes(client?.toLowerCase())
                );
            }
            if (from !== undefined && to !== undefined && from !== "" && to !== "") {
                filteredData = filteredData?.filter((item) => {
                    const itemDate = new Date(item.createdAt.split('T')[0]);
                    return itemDate >= new Date(from) && itemDate <= new Date(to);
                });
            }
            state.productFilter = filteredData;

        },
    }
})

export const { setProductData, addProductData, updateProduct, deleteProduct, filterProduct } = productDataSlice.actions

export const selectProductData = (state: RootState) => state.ProductData.productDataList
export const selectProductDataFilter = (state: RootState) => state.ProductData.productFilter

export default productDataSlice.reducer;
