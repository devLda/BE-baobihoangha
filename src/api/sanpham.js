import axios from "../axios";

// export const apiMultiDataSanPham = () =>
//   axios({
//     url: "/sanpham/multiphong",
//     method: "get",
//   });

export const apiGetAllSanPham = (maLoaiSanPham) =>
  axios({
    url: `/sanpham${maLoaiSanPham ? `/getbyloai?maLoaiSanPham=${maLoaiSanPham}` : ""}`,
    method: "get",
  });

export const apiAddSanPham = (data) =>
  axios({
    url: "/sanpham/add",
    method: "post",
    data,
  });

export const apiGetSanPham = (_id) =>
  axios({
    url: `/sanpham/get/${_id}`,
    method: "get",
  });

export const apiUpdateSanPham = (_id, data) =>
  axios({
    url: `/sanpham/update/${_id}`,
    method: "put",
    data,
  });

export const apiDeleteSanPham = (_id) =>
  axios({
    url: `/sanpham/delete/${_id}`,
    method: "delete",
  });

export const apiStaticSanPham = () =>
  axios({
    url: `/sanpham/static`,
    method: "get",
  });
