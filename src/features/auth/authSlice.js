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

const registerLyfeCycle = createAsyncThunk(
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

const loginLyfeCycle = createAsyncThunk(
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

const logoutLyfeCycle = createAsyncThunk(
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
      .addCase(registerLyfeCycle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerLyfeCycle.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(registerLyfeCycle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.user = null
      })
      .addCase(logoutLyfeCycle.fulfilled, (state) => {
        state.user = null
      })
      .addCase(loginLyfeCycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginLyfeCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(loginLyfeCycle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
        state.user = null
      })
  }
})

const { reset } = authSlice.actions
const authReducer = authSlice.reducer

export { registerLyfeCycle, loginLyfeCycle, logoutLyfeCycle, authSlice, reset, authReducer };