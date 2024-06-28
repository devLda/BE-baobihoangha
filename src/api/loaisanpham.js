import axios from "../axios";

export const apiAddLSP = (data) =>
  axios({
    url: "/loaisanpham/add",
    method: "post",
    data,
  });

export const apiGetAllLSP = () =>
  axios({
    url: `/loaisanpham`,
    method: "get",
  });

export const apiGetLSP = (maLoaiSanPham) =>
  axios({
    url: `/loaisanpham/get/${maLoaiSanPham}`,
    method: "get",
  });

export const apiUpdateLSP = (tenLoaiSanPham, data) =>
  axios({
    url: `/loaisanpham/update/${tenLoaiSanPham}`,
    method: "put",
    data,
  });

export const apiDeleteLSP = (tenLoaiSanPham) =>
  axios({
    url: `/loaisanpham/delete/${tenLoaiSanPham}`,
    method: "delete",
  });

export const apiUploadImg = (data) =>
  axios({
    url: `/loaisanpham/uploadimage`,
    method: "put",
    data,
  });
