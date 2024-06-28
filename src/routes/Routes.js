import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import path from "../utils/path";

import {
  Common,
  About,
  Contact,
  ProductDetail,
  HomePage,
  ProductType,
} from "../pages/user";

import { Layout, Dashboard, LoaiSanPham, SanPham } from "../pages/admin";
import CreateLoaiSP from "../pages/admin/LoaiSanPham/create";
import CreateSanPham from "../pages/admin/SanPham/create";

const Routes = () => {
  const routes = useRoutes([
    {
      path: `${path.COMMON}`,
      element: <Common />,
      children: [
        { element: <Navigate to={`${path.HOME}`} />, index: true },
        {
          path: `${path.HOME}`,
          element: <HomePage />,
        },
        {
          path: `${path.ABOUT}`,
          element: <About />,
        },
        {
          path: `${path.CONTACT}`,
          element: <Contact />,
        },
        {
          path: `${path.DETAIL_PRODUCT}/:maSanPham`,
          element: <ProductDetail />,
        },
        {
          path: `${path.CATEGORY}/:maLoaiSanPham`,
          element: <ProductType />,
        },
      ],
    },
    {
      path: `${path.ADMIM}`,
      element: <Layout />,
      children: [
        { element: <Navigate to={`${path.DASHBOARD}`} />, index: true },
        {
          path: `${path.DASHBOARD}`,
          element: <Dashboard />,
        },
        {
          path: `${path.LOAISANPHAM}/${path.CREATE}`,
          element: <CreateLoaiSP type={"create"} />,
        },
        {
          path: `${path.LOAISANPHAM}/${path.UPDATE}/:maLoaiSanPham`,
          element: <CreateLoaiSP type={"edit"} />,
        },
        {
          path: `${path.LOAISANPHAM}`,
          element: <LoaiSanPham />,
        },
        {
          path: `${path.SANPHAM}/${path.CREATE}`,
          element: <CreateSanPham type={"create"} />,
        },
        {
          path: `${path.SANPHAM}/${path.UPDATE}/:maSanPham`,
          element: <CreateSanPham type={"edit"} />,
        },
        {
          path: `${path.SANPHAM}`,
          element: <SanPham />,
        },
      ],
    },
  ]);
  return routes;
};

export default Routes;
