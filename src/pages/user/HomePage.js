/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import Slider from "../../components/UI/slider";
import slider from "../../utils/fake-data/slider";
import Introduce from "../../components/UI/introduce";
import ProductItem from "../../components/UI/productItem/ProductItem";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { Commit } from "../../components/UI/commit";

const HomePage = () => {
  const { statusSP, sanPham } = useSelector((state) => state.sanPham);
  const [isLoading, setIsLoading] = useState(true);

  // page
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setTtemsPerPage] = useState(8);
  const endOffset = useRef(0);
  const currentItems = useRef([]);
  const pageCount = useRef(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % sanPham.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    endOffset.current = newOffset + itemsPerPage;
    currentItems.current = sanPham.slice(newOffset, endOffset.current);
  };

  useEffect(() => {
    if (statusSP === "fulfilled" && sanPham) {
      if (sanPham?.length) {
        endOffset.current = itemOffset + itemsPerPage;
        currentItems.current = sanPham.slice(itemOffset, endOffset.current);
        pageCount.current = Math.ceil(sanPham.length / itemsPerPage);
      } else {
        endOffset.current = 0;
        currentItems.current = [];
        pageCount.current = 0;
      }
      setIsLoading(false);
    }
  }, [statusSP, sanPham]);

  return (
    <>
      <Slider sliders={slider} />

      <Introduce />

      {/* <ProductType /> */}

      {/* {product?.map((item, index) => (
        <ProductByRoom key={index} product={item} />
      ))} */}

      <div className="w-full md:container mt-20 mb-10">
        <div className="w-full flex justify-center relative">
          <p className="text-4xl mb-5 uppercase text-blue-600 before:contents('') before:w-10 ">
            Sản phẩm
          </p>
        </div>
        <div className="container flex flex-col">
          <p className="w-full text-lg">
            Với yêu cầu ngày càng cao của Quý Khách hàng chính là động lực để{" "}
            <span className="font-bold text-xl text-blue-600 hover:text-green-400">
              Hoàng Hà
            </span>{" "}
            ngày càng phấn đấu đổi mới công nghệ, nâng cao chất lượng sản phẩm.
            Luôn đáp ứng yêu cầu của khách hàng, chú trọng chất lượng trong từng
            sản phẩm.
          </p>
          {/* {!isLoading &&
            (sanPham?.length === 0 ? (
              <p className="text-2xl mt-5">Chưa có sản phẩm nào</p>
            ) : (
              <div className="mt-5 flex flex-wrap">
                <ProductItem productItem={sanPham} />
              </div>
            ))} */}

          {!isLoading && (
            <div className="w-full my-5 container">
              <div className="flex flex-wrap">
                {!currentItems.current?.length && (
                  <h1 className="text-2xl mt-5">Không có sản phẩm</h1>
                )}
                {!!currentItems.current?.length && (
                  <div className="mt-5 flex flex-wrap">
                    <ProductItem productItem={currentItems.current} />
                  </div>
                )}
              </div>

              <div className="mt-5 w-full relative flex justify-center">
                <ReactPaginate
                  previousLabel={<GrCaretPrevious className="text-xl" />}
                  nextLabel={<GrCaretNext className="text-xl" />}
                  className="flex justify-center w-full lg:w-1/2 bg-slate-100 text-sky-700 py-2 rounded-lg overflow-x-auto"
                  pageClassName={`w-10 h-10 mx-3 flex items-center justify-center rounded-full border-solid border-slate-400 hover:border hover:bg-white cursor-pointer`}
                  pageLinkClassName="w-10 h-full flex items-center justify-center"
                  previousClassName="flex absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center"
                  previousLinkClassName="hover:text-red-600"
                  nextClassName="flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center"
                  nextLinkClassName="hover:text-red-600"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  pageCount={pageCount.current}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  activeClassName="bg-white border"
                />
              </div>
            </div>
          )}

          <Commit />
        </div>
      </div>
    </>
  );
};

export default HomePage;
