import { configureStore } from "@reduxjs/toolkit";

import sanPhamSlice from "./sanpham/sanPhamSlice";
import loaiSPSlice from "./loaisanpham/loaiSPSlice";

export const store = configureStore({
  reducer: {
    loaiSanPham: loaiSPSlice,
    sanPham: sanPhamSlice,
  },
});
