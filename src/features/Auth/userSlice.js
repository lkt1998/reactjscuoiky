import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import storageKeys from "constants/storage-key";



export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    const data = await userApi.register(payload);

    localStorage.setItem(storageKeys.TOKEN, data.jwt);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

    return data.user;
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    const data = await userApi.login(payload);

    localStorage.setItem(storageKeys.TOKEN, data.jwt);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

    return data.user;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      state.current = {};
      localStorage.removeItem(storageKeys.USER);
      localStorage.removeItem(storageKeys.TOKEN);
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload
    }
  },
})

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer



