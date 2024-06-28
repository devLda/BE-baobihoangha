import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const getAllSanPham = createAsyncThunk(
  "sanpham",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetAllSanPham(null);

    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
