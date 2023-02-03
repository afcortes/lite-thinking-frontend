import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getProducts, createProduct } from './productService';

const initialState = {
  products: [],
  product: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

const getProductsLifeCycle = createAsyncThunk('products/getAll', async (company_NIT, thunkAPI) => {
  try {
    return await getProducts(company_NIT)
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }

    throw error;
  }
})

const createProductLifeCycle = createAsyncThunk('products/createProduct', async (productData, thunkAPI) => {
  try {
    return await createProduct(productData)
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
    throw error;
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductsLifeCycle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProductLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createProductLifeCycle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

const productReducer = productSlice.reducer;

export { getProductsLifeCycle, createProductLifeCycle, productReducer };