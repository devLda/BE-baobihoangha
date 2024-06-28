import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllLSP } from "../../api";

export const getAllLSP = createAsyncThunk(
  "loaisanpham",
  async (data, { rejectWithValue }) => {
    const response = await apiGetAllLSP();
    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
