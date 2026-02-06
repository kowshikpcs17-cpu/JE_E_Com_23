import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("fullfilled action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
