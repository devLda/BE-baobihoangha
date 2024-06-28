import { FaPhoneVolume } from "react-icons/fa6";
import React from "react";

import product1 from "../../../assets/img/product/product-1.png";
import product2 from "../../../assets/img/product/product-2.jpg";

const Introduce = () => {
  return (
    <section className="about pt-10 xl:pt-20 xl:pb-10">
      <div className="w-full flex justify-center relative">
        <p className="text-4xl mb-5 uppercase text-blue-600 before:contents('') before:w-10 ">
          Giới thiệu
        </p>
      </div>
      <div className="container flex flex-wrap">
        <div className="mb-7 px-3 w-full lg:w-6/12">
          <span>
            <i className="star-rating"></i>
            <i className="star-rating"></i>
            <i className="star-rating"></i>
            <i className="star-rating"></i>
            <i className="star-rating"></i>
          </span>
          <div className="section-subtitle relative mb-5 font-BarlowCondensed text-lg font-normal text-neutral-600 uppercase tracking-widest">
            Nơi khách hàng gửi gắm niềm tin
          </div>
          <div className="section-title relative mb-5 lg:leading-5 font-Gilda text-3xl font-normal tracking-wider">
            Công ty TNHH sản xuất Hoàng Hà
          </div>
          <p className="mb-5 mr-10 text-lg font-normal leading-7 text-neutral-500 opacity-70">
            Xưởng sản xuất của chúng tôi với nhiều năm kinh nghiệm hoạt động,
            đội ngũ thợ lành nghề đã và đang cung cấp hàng trăm ngàn sản phẩm
            bao bì các chủng loại.
          </p>
          <p className="mb-5 mr-10 text-lg font-normal leading-7 text-neutral-500 opacity-70">
          Công ty TNHH sản xuất Hoàng Hà là sự lựa chọn hoàn hảo cho nhu cầu của bạn. Chúng
            tôi tạo dựng và phát triển thương hiệu trên cơ sở niềm tin và sự tín
            nhiệm của khách hàng
          </p>
          <div className="reservation flex items-center">
            <div className="icon border-none relative mt-1">
              <FaPhoneVolume className="text-blue-600 text-5xl" />
            </div>
            <div className="call ml-3">
              <p className="inline mr-10 text-lg font-normal text-neutral-500 opacity-70">
                Số điện thoại liên hệ
              </p>
              <br />
              <span>0866.789.282</span>
            </div>
          </div>
        </div>
        <div className="px-3 w-full lg:w-3/12">
          <img
            src={product1}
            alt="product 1"
            className="my-10 lg:mt-20 lg:mb-7 hover:scale-125"
          />
        </div>
        <div className="px-3 w-full lg:w-3/12">
          <img src={product2} alt="product 2" className="hover:scale-125" />
        </div>
      </div>
    </section>
  );
};

export default Introduce;
