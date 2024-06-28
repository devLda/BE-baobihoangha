import { FaPhoneFlip } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./slider.css";

const Slider = ({ sliders }) => {
  const navigate = useNavigate();

  const [indexCurrent, setIndexCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const timeOut = useRef;

  const handleNext = () => {
    setIndexCurrent(indexCurrent === 2 ? 0 : indexCurrent + 1);
  };

  useEffect(() => {
    timeOut.current =
      autoplay &&
      setTimeout(() => {
        handleNext();
      }, 5000);
  });

  return (
    <div
      className="slider-wrapper"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="slider">
        {sliders?.map((slider, index) => {
          return (
            <div
              key={index}
              className={
                index === indexCurrent
                  ? "slider-card justify-end items-center slider-card-active"
                  : "slider-card justify-end items-center"
              }
            >
              <img
                className="card-image"
                src={slider.image}
                alt={slider.title}
              />
              <div className="text-start item-slider">
                <div className="v-middle caption">
                  <div className="container">
                    <div className="flex flex-wrap">
                      <div className="md:w-9/12 md:ml-20 text-white tracking-widest uppercase">
                        <span className="animate-slider">
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                          <i className="star-rating"></i>
                        </span>
                        <h4 className="my-5 text-base md:text-xl animate-slider font-bold tracking-widest font-NunitoSans">
                          {slider.desc_1}
                        </h4>
                        <h1 className="relative my-5 text-4xl md:text-6xl font-normal leading-snug animate-slider font-NunitoSans">
                          {slider.desc_2}
                        </h1>
                        <div className="butn-light my-7 animate-slider">
                          <p
                            className="relative inline-block cursor-pointer bg-transparent text-white px-5 py-3 m-0 rounded-lg"
                            data-scroll-nav="1"
                            onClick={() => {
                              navigate(slider.link);
                            }}
                          >
                            <span>Xem sản phẩm ngay</span>
                          </p>
                        </div>
                        {/* reservation */}
                        <div className="m-0 z-10">
                          <a className="inline-flex group/contact" href="tel:0866789282">
                            <div className="flex w-16 h-16 rounded-full border border-solid border-white justify-center items-center group-hover/contact:border-green-600">
                              <FaPhoneFlip className="text-white text-3xl rotate-90" />
                            </div>
                            {/* call */}
                            <div className="ml-2 text-white uppercase font-BarlowCondensed tracking-widest text-base leading-8 font-normal group-hover/contact:text-green-600">
                              <span className="font-TimeNewRoman text-2xl tracking-wide">0866.789.282</span> <br />
                              Liên hệ ngay
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="slider-pagination">
        {sliders?.map((slider, index) => {
          return (
            <div
              onClick={() => setIndexCurrent(index)}
              key={index}
              className={
                index === indexCurrent
                  ? "pagination-dot pagination-dot-active"
                  : "pagination-dot"
              }
            ></div>
          );
        })}
      </div>

      {/* <div className="reservation">
        <a href="tel:0866789282">
          <div className="icon flex justify-center items-center">
            <FaPhoneFlip className="text-white text-3xl rotate-90" />
          </div>
          <div className="call">
            <span>0866.789.282</span> <br />
            Liên hệ ngay
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Slider;
