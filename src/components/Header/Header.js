/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import listNavbar from "./ListNavbar";
import logo from "../../assets/img/Logo.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";
import path from "../../utils/path";

const Header = () => {
  const { statusLSP, loaiSanPham } = useSelector((state) => state.loaiSanPham);
  const navigate = useNavigate();

  const wrapperRef = useRef(null);

  const [backColor, setBackColor] = useState("bg-transparent");
  const [openNavi, setOpenNavi] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { innerWidth } = window;
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBackColor("bg-white");
      } else {
        setBackColor("bg-transparent");
      }
    };

    if (innerWidth < 992) setOpenNavi(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // detect click outside
  useEffect(() => {
    const { innerWidth } = window;
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        innerWidth < 992
      ) {
        setOpenNavi(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (statusLSP === "fulfilled" && loaiSanPham) {
      console.log("loaisp ", loaiSanPham);
      listNavbar[1].subNav = loaiSanPham?.map((item) => {
        return {
          link: `/${path.CATEGORY}/${item?.maLoaiSanPham}`,
          title: item?.tenLoaiSanPham,
        };
      });
      console.log("list ", listNavbar);
      setIsLoading(false);
    }
  }, [statusLSP]);

  return (
    <header
      className={`h-full fixed right-0 w-fit lg:w-full z-20 ${
        backColor === "bg-white" ? "lg:bg-white" : "lg:bg-transparent"
      } ${
        backColor === "bg-white"
          ? "lg:shadow-lg"
          : "text-black lg:text-slate-100"
      }  lg:h-24`}
    >
      <div className="lg:container w-full h-full mx-auto flex justify-between">
        <div
          className={`max-w-24 mx-10 my-5 lg:m-0 hidden lg:flex items-start lg:items-center overflow-hidden`}
        >
          <Link
            className={`inline-block w-20 rounded-xl transition ease-in-out duration-500 ${
              backColor === "bg-white" ? "scale-125" : ""
            }`}
            to="/"
          >
            <img className="rounded-xl" src={logo} alt="Logo" />
          </Link>
          {backColor !== "bg-white" && (
            <p className="ml-5 flex flex-col">
              <span className="text-white font-bold italic text-lg tracking-widest uppercase font-TimeNewRoman">
                Công ty TNHH
              </span>
              <span className="text-white font-bold italic text-lg tracking-widest uppercase font-TimeNewRoman">
                sản xuất Hoàng Hà
              </span>
            </p>
          )}
        </div>

        <div className="flex">
          {!openNavi && (
            <button
              className={`h-fit ${
                openNavi ? "hidden" : "absolute right-0"
              } px-10 py-5`}
              onClick={() => {
                setOpenNavi(!openNavi);
              }}
            >
              <TiThMenu className="text-5xl text-yellow-500" />
            </button>
          )}
          {openNavi && (
            <nav
              ref={wrapperRef}
              className={`relative lg:shadow-none h-full ${
                openNavi ? "right-0 shadow-3xl" : "-right-full"
              } flex items-center space-x-1 bg-white lg:bg-inherit 
                transition-all duration-300 ease-in-out`}
            >
              <ul className="flex flex-col lg:flex-row min-w-[40vw] md:min-w-[20vw] font-normal tracking-widest">
                {listNavbar?.map((item, index) => (
                  <li
                    key={index}
                    className={`group/navParent w-full h-10 lg:h-fit lg:w-fit relative flex items-center ${
                      index === listNavbar.length - 1
                        ? "pl-6 lg:pl-4 xl:pl-6"
                        : "pl-6 lg:px-4 xl:px-6"
                    } cursor-pointer ${
                      item?.subNav ? "group/navParentSub" : ""
                    }`}
                    onClick={() => {
                      if (!item?.subNav) {
                        navigate(item.link);
                        const { innerWidth } = window;
                        if (innerWidth < 992) setOpenNavi(false);
                      }
                      return;
                    }}
                  >
                    <span className="group-hover/navParent:text-green-300 text-sm xl:text-lg font-semibold">
                      {item.title}
                    </span>
                    {!isLoading && item?.subNav && (
                      <>
                        <IoIosArrowDown className="inline-block pl-2 text-2xl font-bold group-hover/navParent:text-yellow-600" />
                        <ul
                          className="invisible absolute top-0 w-48 lg:top-8 right-full lg:-left-1 p-3 opacity-0 bg-white shadow-2xl 
                                translate-y-5 transition-all duration-300 group-hover/navParentSub:visible group-hover/navParentSub:opacity-100 group-hover/navParentSub:translate-y-0
                                "
                        >
                          {item?.subNav?.map((val, index) => (
                            <li
                              key={index}
                              className={`group/subnav relative inline-block w-full text-stone-800 transition-all duration-300 border-solid border-white py-2 px-4 hover:pl-2 hover:cursor-pointer ${
                                index === item?.subNav?.length - 1
                                  ? "border-none"
                                  : "border-b"
                              }`}
                              onClick={() => {
                                const { innerWidth } = window;
                                if (innerWidth < 992) setOpenNavi(false);
                                navigate(val.link);
                                return;
                              }}
                            >
                              <span className="group-hover/subnav:text-green-300">
                                {val.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
