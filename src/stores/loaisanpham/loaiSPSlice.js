/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const LSPSlice = createSlice({
  name: "loaisanpham",
  initialState: {
    isLoading: false,
    loaiSanPham: null,
    statusLSP: "pending",
  },
  reducers: {},
  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllLSP.pending, (state) => {
      state.isLoading = true;
      state.statusLSP = "pending";
    });

    builder.addCase(action.getAllLSP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loaiSanPham = action.payload;
      state.statusLSP = "fulfilled";
    });

    builder.addCase(action.getAllLSP.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message;
      state.statusLSP = "rejected";
    });
  },
});

// // Action creators are generated for each case reducer function
export const {} = LSPSlice.actions;

export default LSPSlice.reducer;
