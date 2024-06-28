/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import bgParalax from "../../assets/img/paralax/bg-slider.jpg";
import Paralax from "../../components/UI/paralax/Paralax";

import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ProductItem from "../../components/UI/productItem/ProductItem";
import { apiGetAllLSP, apiGetAllSanPham, apiGetLSP } from "../../api";
import { Commit } from "../../components/UI/commit";
import { Select } from "../../components/UI/form";
import { useSelector } from "react-redux";
import path from "../../utils/path";

const ProductType = () => {
  const { loaiSanPham } = useSelector((state) => state.loaiSanPham);

  const LoaiSP = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [breadcrumb, setBreadcumb] = useState(null);
  const [ds_sanpham, setDs_sanpham] = useState(null);

  const [optionSel, setOptionSel] = useState(null);
  const [valOption, setValOption] = useState(LoaiSP?.maLoaiSanPham);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setTtemsPerPage] = useState(8);
  const endOffset = useRef(0);
  const currentItems = useRef([]);
  const pageCount = useRef(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ds_sanpham.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    endOffset.current = newOffset + itemsPerPage;
    currentItems.current = ds_sanpham.slice(newOffset, endOffset.current);
  };

  useEffect(() => {
    setValOption(LoaiSP?.maLoaiSanPham)
    if (LoaiSP?.maLoaiSanPham !== "all") {
      apiGetLSP(LoaiSP?.maLoaiSanPham)
        .then((result) => {
          console.log("resultv ", result);
          setBreadcumb([
            {
              ten: "Tất cả sản phẩm",
              link: "/category/all",
            },
            {
              ten: result?.data?.tenLoaiSanPham,
              link: "",
            },
          ]);
          apiGetAllSanPham(LoaiSP?.maLoaiSanPham)
            .then((res) => {
              console.log("resv ", res);
              setDs_sanpham(res.data);
              if (res.data?.length) {
                endOffset.current = itemOffset + itemsPerPage;
                currentItems.current = res.data.slice(
                  itemOffset,
                  endOffset.current
                );
                console.log('curent ', currentItems)
                pageCount.current = Math.ceil(res.data.length / itemsPerPage);
              } else {
                endOffset.current = 0;
                currentItems.current = [];
                pageCount.current = 0;
              }
              setIsLoading(false);
            })
            .catch((err) => {
              console.log("err ", err);
            });
        })
        .catch((err) => {
          console.log("err ", err);
        });
    } else
      apiGetAllSanPham(null)
        .then((res) => {
          console.log("resv ", res);

          setBreadcumb([
            {
              ten: "Tất cả sản phẩm",
              link: "/category/all",
            },
          ]);
          setDs_sanpham(res.data);
          if (res.data?.length) {
            endOffset.current = itemOffset + itemsPerPage;
            currentItems.current = res.data.slice(
              itemOffset,
              endOffset.current
            );
            pageCount.current = Math.ceil(res.data.length / itemsPerPage);
          } else {
            endOffset.current = 0;
            currentItems.current = [];
            pageCount.current = 0;
          }

          setIsLoading(false);
        })
        .catch((err) => {
          console.log("err ", err);
        });
  }, [window.location.href, LoaiSP?.maLoaiSanPham]);

  useEffect(() => {
    if (loaiSanPham?.length) {
      const lsp = loaiSanPham?.map((item) => {
        return {
          id: item.maLoaiSanPham,
          title: item.tenLoaiSanPham,
        };
      });

      lsp.unshift({
        id: "all",
        title: "Tất cả",
      });
      setOptionSel(lsp);
    } else {
      apiGetAllLSP().then((result) => {
        const lsp = result.data?.map((item) => {
          return {
            id: item.maLoaiSanPham,
            title: item.tenLoaiSanPham,
          };
        });

        lsp.unshift({
          id: "all",
          title: "Tất cả",
        });
        setOptionSel(lsp);
      });
    }
  }, []);
  return (
    <>
      <Paralax
        title="Danh mục sản phẩm"
        content="Tất cả sản phẩm"
        image={bgParalax}
        breadcrumb={breadcrumb}
      />

      {!isLoading && (
        <div className="w-full my-5 container">
          <div className="mt-6 mb-3 w-full">
            <Select
              label="Loại sản phẩm"
              name="loaiSanPham"
              options={optionSel ? optionSel : []}
              value={valOption ? valOption : ""}
              setChange={ (val) => {
                navigate(`/${path.CATEGORY}/${val}`)
                setValOption(val)
              }
              }
            />
          </div>
          <div className="flex flex-wrap">
            {!currentItems.current?.length && (
              <h1 className="my-10 w-full flex justify-center text-3xl">
                Không có sản phẩm
              </h1>
            )}
            {!!currentItems.current?.length && (
              <ProductItem productItem={currentItems.current} />
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
    </>
  );
};

export default ProductType;
