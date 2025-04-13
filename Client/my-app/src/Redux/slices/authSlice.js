import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // will be null when logged out or loading
  loading: true, // true when data is being fetched
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false; // Data has been fetched, stop loading
    },
    logout: (state) => {
      state.user = null;
      state.loading = false; // Set loading to false even if user logs out
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
