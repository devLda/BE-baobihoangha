/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
// import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { useDispatch } from "react-redux";
import { getAllLSP } from "../../../stores/loaisanpham/asyncAction";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLSP());
    // dispatch(getAllSanPham());
  }, []);
  return (
    <StyledRoot>
      {/* <Header onOpenNav={() => setOpen(true)} /> */}

      <Nav />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

export default Layout;
