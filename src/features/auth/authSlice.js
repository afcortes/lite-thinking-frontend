import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import constants from '../../constants/constants';
import { register, login, logout } from './authService';

const user = JSON.parse(localStorage.getItem(constants.localStorage.user));

const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

const registerLifeCycle = createAsyncThunk(
    `${constants.redux.actions.auth.base + constants.redux.actions.auth.register}`,
    async (registerData, thunkAPI) => {
        try {
            return await register(registerData)
        } catch (error) {
            if (error instanceof AxiosError) {
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                return thunkAPI.rejectWithValue(message);
            }

            throw error;
        }
    });

const loginLifeCycle = createAsyncThunk(
    `${constants.redux.actions.auth.base + constants.redux.actions.auth.login}`,
    async (loginData, thunkAPI) => {
        try {
            return await login(loginData)
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
    });

const logoutLifeCycle = createAsyncThunk(
    `${constants.redux.actions.auth.base + constants.redux.actions.auth.logout}`,
    () => logout())

const authSlice = createSlice({
  name: constants.redux.actions.auth.base,
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLifeCycle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(registerLifeCycle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.user = null
      })
      .addCase(logoutLifeCycle.fulfilled, (state) => {
        state.user = null
      })
      .addCase(loginLifeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginLifeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(loginLifeCycle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.user = null
      })
  }
})

const { reset } = authSlice.actions
const authReducer = authSlice.reducer

export { registerLifeCycle, loginLifeCycle, logoutLifeCycle, authSlice, reset, authReducer };