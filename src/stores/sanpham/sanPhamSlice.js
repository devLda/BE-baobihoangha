/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const sanPhamSlice = createSlice({
  name: "sanpham",
  initialState: {
    sanPham: null,
    isLoading: false,
    statusSP: "pending",
  },
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllSanPham.pending, (state) => {
      state.isLoading = true;
      state.statusSP = "pending";
    });

    builder.addCase(action.getAllSanPham.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sanPham = action.payload;
      state.statusSP = "fulfilled";
    });

    builder.addCase(action.getAllSanPham.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message;
      state.statusSP = "rejected";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = sanPhamSlice.actions;

export default sanPhamSlice.reducer;
