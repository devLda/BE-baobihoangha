import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { getAllLSP } from "../../stores/loaisanpham/asyncAction";

const Common = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLSP())
      .then((res) => {})
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch]);
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Common;
