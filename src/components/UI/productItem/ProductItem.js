import React from "react";
import { Link } from "react-router-dom";
import waterMark from "../../../assets/img/water-mark/logo.png";
import path from "../../../utils/path";
import dangCapNhat from "../../../assets/img/product/dang-cap-nhat-san-pham.png";

const ProductItem = ({ productItem }) => {
  return productItem?.map((item, index) => (
    <Link
      to={`/${path.DETAIL_PRODUCT}/${item?.maSanPham}`}
      key={index}
      className="flex justify-center basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 my-3"
    >
      <div
        className={`group/proItem flex flex-col ${
          index === 0 || index === productItem?.length
            ? "items-start"
            : "items-center"
        } w-5/6 h-full shadow-xl rounded-lg`}
      >
        <div className="w-full h-3/4 relative overflow-hidden rounded-t-2xl">
          <img
            className="max-w-full max-h-full
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
        <div className="w-full flex flex-col items-center justify-around group-hover/proItem:bg-slate-100">
          <p className="h-20 px-3 flex items-center hover:text-green-600 text-blue-600 text-base xl:text-xl">
            {item?.tenSanPham}
          </p>

          <p className="h-12 flex items-center text-orange-600 text-xl">
            Mời liên hệ
          </p>
        </div>
      </div>
    </Link>
  ));
};

export default ProductItem;
