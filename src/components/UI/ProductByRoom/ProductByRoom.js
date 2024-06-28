import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
// import waterMark from "../../../assets/img/water-mark/logo.png";
import New from "../../../assets/img/water-mark/New.png";
import path from "../../../utils/path";
import ProductItem from "../productItem/ProductItem";


const ProductByRoom = (productItem) => {
  return (
    <div className="w-full md:container mt-20 mb-10">
      {productItem?.product && (
        <div className="relative w-full border-2 border-solid border-yellow-600 rounded-xl">
          <div className="absolute -top-10 left-10 bg-yellow-700 w-60 text-center rounded-t-lg">
            <p className="py-2 text-white text-xl">
              {productItem?.product?.nameType}
            </p>
          </div>

          <div className="relative flex flex-col z-10 bg-white rounded-xl">
            <div className="mt-3 px-3 h-[70vh] xl:h-[80vh] w-full flex flex-row justify-center items-center">
              <div className="relative w-full md:w-5/6 h-full">
                <div className="absolute top-0 right-0 w-24 h-24 flex justify-center items-center rounded-full bg-red-600 opacity-80">
                  <img className="w-2/3" src={New} alt="Sản phẩm mới"></img>
                </div>
                <img
                  className="w-full h-full"
                  src={productItem.product?.hot?.image[0]}
                  alt={productItem.product?.hot?.ten}
                ></img>
                <p className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center w-3/4 p-2 bg-amber-100 opacity-80 text-center text-red-700">
                  {productItem.product?.hot?.moTa}
                </p>
                <div className="w-full absolute bottom-[10%] flex flex-col sm:flex-row justify-around items-center">
                  <div className="h-fit flex flex-col sm:flex-row items-center justify-center">
                    <span className="text-white text-xl">Giá chỉ</span>
                    <p className="py-2 px-3 mx-2 my-4 bg-yellow-700 h-fit rounded-md text-xl text-white cursor-pointer">
                      {productItem.product?.hot?.gia}
                    </p>
                  </div>

                  <div className="h-fit flex items-center justify-center">
                    <Link
                      to={`/${path.DETAIL_PRODUCT}/${productItem.product?.hot?.MaSP}`}
                      className="group/detail py-2 px-3 w-40 relative flex justify-start bg-yellow-700 h-fit rounded-md text-xl text-white cursor-pointer"
                    >
                      Xem chi tiết
                      <MdKeyboardArrowRight className="text-3xl absolute top-1/2 -translate-y-1/2 right-4 group-hover/detail:right-1 transition duration-1000" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap text-stone-500">
              {<ProductItem productItem={productItem.product?.list} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductByRoom;
