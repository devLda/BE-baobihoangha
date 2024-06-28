/* eslint-disable react-hooks/exhaustive-deps */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
// user
// import user from "../../api/user/index";
import avata from "../../../assets/img/avatars/avatar_default.jpg";

// hooks
// import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from "../../../assets/img/Logo.jpg";
import Scrollbar from "../../../components/UI/scrollbar";
import NavSection from "../../../components/UI/nav-section";
//
import navConfig from "./NavConfig";
// import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import path from "../../../utils/path";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const Nav = () => {
  // const { current } = useSelector((state) => state.user);

  // const isDesktop = useResponsive('up', 'lg');

  const [openNavi, setOpenNavi] = useState(true);
  const [hiddenNav, setHiddenNav] = useState(false);
  // const isDesktop = openNav;

  // useEffect(() => {
  //   if (openNav) {
  //     onCloseNav();
  //   }
  // }, [pathname]);

  useEffect(() => {
    const { innerWidth } = window;

    console.log("inner ", innerWidth);

    setOpenNavi(!(innerWidth < 1200));
    setHiddenNav(innerWidth < 1200);
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Link to={`/${path.ADMIM}`}>
          <img className="w-1/2 lg:w-full" src={Logo} alt="logo" />
        </Link>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={avata} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                Bao bì Hoàng Hà
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <div className="flex">
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}
      >
        {openNavi ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: "background.default",
                borderRightStyle: "dashed",
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNavi}
            onClose={true}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
      {hiddenNav && (
        <button
          className={`h-fit absolute top-0 right-0 p-5`}
          onClick={() => {
            setOpenNavi(!openNavi);
          }}
        >
          <TiThMenu className="text-5xl text-yellow-500" />
        </button>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default Nav;
