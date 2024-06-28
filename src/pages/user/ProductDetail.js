/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Paralax from "../../components/UI/paralax/Paralax";
import bgParalax from "../../assets/img/paralax/bg-slider.jpg";
import waterMark from "../../assets/img/water-mark/logo.png";
import dangCapNhat from "../../assets/img/product/dang-cap-nhat-san-pham.png";

import { FaPhoneVolume, FaFacebookMessenger, FaComment } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import path from "../../utils/path";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Commit } from "../../components/UI/commit";
import { apiGetAllSanPham, apiGetSanPham } from "../../api";

const ProductDetail = () => {
  const sanPham = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [typeProduct, setTypeProduct] = useState("");
  const [productSimilar, setProductSimilar] = useState(null);
  const [breadcrumb, setBreadcumb] = useState(null);
  const [imgCurrent, setImgCurrent] = useState(0);
  const responsive = useRef({
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  });

  useEffect(() => {
    setImgCurrent(0)
    apiGetSanPham(sanPham.maSanPham)
      .then((res) => {

        console.log("resv ", res);

        setProductDetail(res.data);

        setTypeProduct(res.data.maLoaiSanPham);

        if (window.location.href.includes("product-detail")) {
          setBreadcumb([
            {
              ten: "Danh sách sản phẩm",
              link: "/category/all",
            },
            {
              ten: res.data.tenSanPham,
              link: "",
            },
          ]);
        }

        apiGetAllSanPham(res.data.maLoaiSanPham)
          .then((result) => {
            setProductSimilar(result.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("err ", err);
          });
      })
      .catch((err) => {
        console.log("err ", err);
      });

    // product.forEach((item) => {
    //   if (maSanPham === item?.maSanPham) {
    //     setProductDetail(item);

    //     ds_loaiSP.forEach((val) => {
    //       if (item?.MaLoai === val?.MaLoai) setTypeProduct(val?.ten);
    //     });

    //     setProductSimilar(() => {
    //       return product.filter((val) => val?.MaLoai === item?.MaLoai);
    //     });
    //     setIsLoading(false);
    //   }
    // });
  }, [window.location.href, sanPham.maSanPham]);
  return (
    <>
      {productDetail && (
        <>
          <Paralax
            title="Chi tiết sản phẩm"
            content="Sản phẩm bao bì cao cấp"
            image={bgParalax}
            breadcrumb={breadcrumb}
          />

          <div className="container mx-auto my-10">
            {!isLoading && (
              <div className="flex flex-wrap">
                <div className="w-full lg:w-3/5 xl:w-2/5 lg:pr-8 flex flex-col">
                  {productDetail && (
                    <img
                      className="w-full h-fit xl:h-3/4 rounded-lg"
                      src={productDetail?.hinhAnh?.length ? productDetail?.hinhAnh[imgCurrent] : dangCapNhat}
                      alt={productDetail?.tenSanPham}
                    />
                  )}
                  <div className="my-5 w-full h-1/4 flex justify-around items-center">
                    {productDetail?.hinhAnh?.length &&
                      productDetail?.hinhAnh?.map((item, index) => (
                        <div
                          key={index}
                          className={`w-1/5 cursor-pointer overflow-hidden rounded-lg ${
                            index === imgCurrent
                              ? ""
                              : "group/imgDetail opacity-50"
                          }`}
                          onClick={() => {
                            setImgCurrent(index);
                          }}
                        >
                          <img
                            className="w-full scale-125 group-hover/imgDetail:-translate-y-1 ease-in-out transition duration-300"
                            src={item}
                            alt={productDetail?.tenSanPham}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-full h-fit px-3 grid grid-rows-8 lg:w-2/5 xl:w-3/5 bg-stone-200 rounded-md">
                  <div className="row-span-1 my-2">
                    <h1 className="w-fit text-2xl lg:text-3xl font-bold">
                      {productDetail?.tenSanPham}
                    </h1>
                  </div>
                  <div className="row-span-1 my-2 grid grid-cols-5">
                    <div className="col-span-1">
                      <span className=" text-base xl:text-xl">Mã:</span>
                    </div>
                    <div className="col-span-4">
                      <p className="font-bold text-base xl:text-xl">
                        {productDetail?.maSanPham}
                      </p>
                    </div>
                  </div>
                  <div className="row-span-1 my-2 grid grid-cols-5">
                    <div className="col-span-1">
                      <span className=" text-base xl:text-xl">Nhóm:</span>
                    </div>
                    <div className="col-span-4">
                      <p className="font-bold text-base xl:text-xl">
                        {productDetail?.tenLoaiSanPham}
                      </p>
                    </div>
                  </div>
                  <div className="row-span-1 my-2 grid grid-cols-5">
                    <div className="col-span-1">
                      <span className=" text-xl xl:text-2xl text-blue-600">
                        Giá:
                      </span>
                    </div>
                    <div className="col-span-4">
                      <p className="text-xl xl:text-2xl text-blue-600">
                        Mời liên hệ
                      </p>
                    </div>
                  </div>
                  <div className="row-span-1 my-2 grid grid-cols-1">
                    <p className="text-base xl:text-xl">Mô tả</p>
                  </div>
                  <div className="row-span-1 my-2">
                    <button className="w-full px-6 py-3 bg-red-600 rounded-lg hover:opacity-80 hover:shadow-3xl transition duration-500">
                      <a
                        href="tel:0866789282"
                        className="text-white text-xl"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Liên hệ tư vấn
                      </a>
                    </button>
                  </div>
                  <div className="row-span-1 my-2 grid grid-cols-2">
                    <div className="col-span-1">
                      <button className="w-full px-6 py-3 mr-0 sm:mr-3 lg:mr-0 xl:mr-3 bg-green-600 rounded-lg hover:opacity-80 hover:shadow-3xl transition duration-500">
                        <a
                          className="flex items-baseline text-white text-xl"
                          href="https://www.facebook.com/profile.php?id=100081980643690"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFacebookMessenger className="text-base xl:text-lg mx-2" />{" "}
                          Facebook
                        </a>
                      </button>
                    </div>
                    <div className="col-span-1">
                      <button className="w-full px-6 py-3 ml-0 sm:ml-3 lg:ml-0 xl:ml-3 bg-green-600 rounded-lg hover:opacity-80 hover:shadow-3xl transition duration-500">
                        <a
                          className="flex items-baseline text-white text-xl"
                          href="https://zalo.me/0866789282"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaComment className="text-base xl:text-lg mx-2" />{" "}
                          Chat Zalo
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className="row-span-1 mt-2 mb-4 grid grid-cols-2">
                    <div className="col-span-1">
                      <button className="w-full px-6 py-3 bg-blue-600 rounded-lg hover:opacity-80 hover:shadow-3xl transition duration-500">
                        <a
                          href="tel:0866789282"
                          className="flex items-baseline text-white text-xl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaPhoneVolume className="text-base xl:text-lg mx-2" />{" "}
                          0866.789.282
                        </a>
                      </button>
                    </div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* <div className="py-4 px-8 font-Roboto">
                    <h1 className="my-4 w-fit text-yellow-600 text-2xl sm:text-4xl lg:text-3xl xl:text-5xl font-bold leading-normal border-b-2 border-solid border-yellow-600">
                      {productDetail?.tenSanPham}
                    </h1>
                    <p className="my-5 text-red-600 text-xl sm:text-3xl lg:text-2xl xl:text-4xl font-bold">
                      Vui lòng liên hệ
                    </p>

                    <ul className="list-disc mx-4">
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          Mã sản phẩm:
                        </span>{" "}
                        {productDetail?.maSanPham}
                      </li>
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          Danh mục:
                        </span>{" "}
                        {typeProduct}
                      </li>
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        Cam kết{" "}
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          {" "}
                          100% gỗ theo yêu cầu
                        </span>
                      </li>
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          Miễn phí{" "}
                        </span>{" "}
                        vận chuyển bán kính{" "}
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          30 Km
                        </span>
                      </li>
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        Kích thước được làm theo{" "}
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          yêu cầu của khách hàng
                        </span>
                      </li>
                      <li className="my-2 text-base xl:text-lg text-stone-600">
                        Bảo hành{" "}
                        <span className="text-yellow-700 font-bold text-base xl:text-xl">
                          {" "}
                          5 năm
                        </span>
                      </li>
                    </ul>

                    <div className="w-full my-3 border border-dashed border-red-400 bg-red-100 rounded-2xl">
                      <p className="px-3 py-1 text-yellow-700 text-base xl:text-lg">
                        Giá sản phẩm biến động theo từng thời điểm thị trường.
                        Quý khách vui lòng liên hệ{" "}
                        <a
                          className="text-red-700 hover:text-blue-600"
                          href="tel:0866789282"
                          target="_blank"
                          rel="noreferrer"
                        >
                          0866.789.282
                        </a>{" "}
                        để được cung cấp thông tin về giá tốt nhất
                      </p>
                    </div>

                    <button className="w-fit px-6 py-2 my-3 bg-red-600 rounded-lg hover:opacity-100 hover:shadow-3xl transition duration-500">
                      <a
                        href="tel:0866789282"
                        className="text-white text-xl"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Đặt hàng ngay
                      </a>
                    </button>
                    <div className="flex flex-wrap sm:flex-nowrap lg:flex-wrap xl:flex-nowrap my-3 lg:my-0 xl:my-3">
                      <button className="w-full px-6 py-3 my-2 mr-0 sm:mr-3 lg:mr-0 xl:mr-3 bg-blue-600 rounded-lg hover:opacity-100 hover:shadow-3xl transition duration-500">
                        <a
                          className="flex items-baseline text-white text-xl"
                          href="https://www.facebook.com/profile.php?id=100081980643690"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFacebookMessenger className="text-base xl:text-lg mx-2" />{" "}
                          Facebook
                        </a>
                      </button>

                      <button className="w-full px-6 py-3 my-2 ml-0 sm:ml-3 lg:ml-0 xl:ml-3 bg-blue-600 rounded-lg hover:opacity-100 hover:shadow-3xl transition duration-500">
                        <a
                          className="flex items-baseline text-white text-xl"
                          href="https://zalo.me/0866789282"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaComment className="text-base xl:text-lg mx-2" />{" "}
                          Chat Zalo
                        </a>
                      </button>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap lg:flex-wrap xl:flex-nowrap">
                      <button className="w-1/2 px-6 py-3 my-2 bg-green-600 rounded-lg hover:opacity-100 hover:shadow-3xl transition duration-500">
                        <a
                          href="tel:0866789282"
                          className="flex items-baseline text-white text-xl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaPhoneVolume className="text-base xl:text-lg mx-2" />{" "}
                          0866.789.282
                        </a>
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>

          <div className="my-3 container border-t border-solid border-gray-500">
            <p className="mt-4 mb-2 text-2xl font-semibold uppercase">
              Sản phẩm tương tự
            </p>
            <Carousel className="-mx-8" responsive={responsive.current}>
              {!isLoading &&
                productSimilar &&
                productSimilar?.map((item, index) => (
                  <Link
                    to={`/${path.DETAIL_PRODUCT}/${item?.maSanPham}`}
                    key={index}
                    className="flex justify-center w-full h-5/6 my-3"
                  >
                    <div className="group/proItem flex flex-col items-center w-3/4 h-full hover:shadow-3xl rounded-lg">
                      <div className="w-full h-3/5 md:h-2/3 relative overflow-hidden">
                        <img
                          className="w-full h-full
                        transition ease-in-out group-hover/proItem:scale-110 duration-300"
                          src={item?.hinhAnh?.length ? item?.hinhAnh[0] : dangCapNhat}
                          alt={item?.tenSanPham}
                        ></img>
                        <img
                          className="w-12 absolute top-0 right-0"
                          src={waterMark}
                          alt="Hoàng Hà"
                        ></img>
                      </div>
                      <div className="h-2/5 md:h-1/3 flex flex-col items-center justify-center">
                        <p className="text-yellow-600 group-hover/proItem:text-red-600">
                          {item?.tenSanPham}
                        </p>

                        <p className="text-blue-600 group-hover/proItem:text-red-600">
                          Mời liên hệ
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </Carousel>
          </div>

          <Commit />
        </>
      )}
    </>
  );
};

export default ProductDetail;
