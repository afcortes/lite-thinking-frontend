import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createCompany, getCompanies, deleteCompany } from './companyService';

const initialState = {
    companies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const getCompaniesLifeCycle = createAsyncThunk('companies/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await getCompanies(token)
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


const createCompanyLifeCycle = createAsyncThunk('companies/createCompany', async (value, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await createCompany(value, token)
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

const deleteCompanyLifeCycle = createAsyncThunk('companies/deleteCompany', async (companyNIT, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    await deleteCompany(companyNIT, token)
    return companyNIT
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

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    reset: (state) => initialState,
    selectCompany: (state, action) => state.company = { ...action.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompaniesLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompaniesLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompaniesLifeCycle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCompanyLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompanyLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createCompanyLifeCycle.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCompanyLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompanyLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = state.companies.filter((company) => company.NIT !== action.payload)
      })
      .addCase(deleteCompanyLifeCycle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

const companyReducer = companySlice.reducer;

export { getCompaniesLifeCycle, deleteCompanyLifeCycle, companyReducer };