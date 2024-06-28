import React from "react";
import { Link } from "react-router-dom";
import productType from "../../../utils/fake-data/product-type";
import path from "../../../utils/path";

const ProductType = () => {
  return (
    <div className="my-10 w-full md:container">
      <div className="w-full p-3 flex flex-wrap border-blue-500 border-2 border-solid rounded-xl text-black">
        {productType?.map((item, index) => (
          <Link
            to={`/${path.CATEGORY}/${item.MaLoai}`}
            key={index}
            className="flex flex-col basis-1/3 sm:basis-1/5 lg:basis-[10%] p-2 hover:border rounded-lg border-solid border-green-600"
          >
            <div className="h-3/4">
              <img
                className="w-full h-full"
                src={item.image}
                alt={item.ten}
              ></img>
            </div>
            <p className="h-1/4 flex justify-center items-center">{item.ten}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductType;
