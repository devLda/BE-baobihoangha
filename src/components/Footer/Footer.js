import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative block bg-blue-600 py-8 z-10">
      <div className="container flex flex-wrap">
        {/* Địa chỉ liên hệ  */}
        <div className="w-full md:w-1/2 xl:w-4/12">
          <h3 className="text-2xl uppercase text-green-400">
            Hoàng Hà Plasticc
          </h3>
          <h4 className="text-lg text-white mb-3">Tiện lợi trong tầm tay</h4>

          <ul className="text-lg text-white m-0">
            <li className="flex flex-col mb-3 xl:mb-6">
              <p className="flex items-baseline text-green-400">
                <FaLocationDot className="mr-2 text-lg" /> Địa chỉ
              </p>
              <p className="leading-none">
                Cụm CN Hồng Vân, thôn Vân La , Xã Hồng Vân , Huyện Thường Tín,
                TP Hà Nội
              </p>
            </li>
            <li className="flex flex-col mb-3 xl:mb-6">
              <p className="flex items-baseline text-green-400">
                <FaPhone className="mr-2 text-lg" /> Điện thoại liên hệ
              </p>
              <p className="leading-normal">
                <a
                  className="hover:text-green-300 hover:pl-4 transition-all ease-in-out duration-500"
                  href="tel:0866789282"
                >
                  Ms.Dương: 0866.789.282
                </a>
              </p>
            </li>
            <li className="flex flex-col mb-3 xl:mb-6">
              <p className="flex items-baseline text-green-400">
                <FaFacebook className="mr-2 text-lg" /> Fanpage
              </p>
              <p className="leading-none">
                <a
                  className="hover:text-green-300 hover:pl-4 transition-all ease-in-out duration-500"
                  href="https://www.facebook.com/profile.php?id=100081980643690"
                >
                  Hoàng Hà Plasticc
                </a>
              </p>
            </li>
          </ul>
        </div>
        {/* Hỗ trợ khách hàng */}
        <div className="w-full md:w-1/2 xl:w-3/12 xl:px-5">
          <h3 className="text-2xl uppercase text-green-400 mb-3">
            Hỗ trợ khách hàng
          </h3>
          <ul className="text-lg text-white">
            <li className="mb-2">
              <Link
                className="relative block hover:pl-4 hover:text-green-400 transition-all ease-in-out duration-500"
                to="/"
              >
                Chính sách giao hàng
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="relative block hover:pl-4 hover:text-green-400 transition-all ease-in-out duration-500"
                to="/"
              >
                Chính sách đổi trả hàng
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="relative block hover:pl-4 hover:text-green-400 transition-all ease-in-out duration-500"
                to="/"
              >
                Hướng dẫn bảo quản
              </Link>
            </li>
            <li className="mb-2">
              <Link
                className="relative block hover:pl-4 hover:text-green-400 transition-all ease-in-out duration-500"
                to="/"
              >
                Trở thành đối tác kinh doanh
              </Link>
            </li>
          </ul>
        </div>
        {/* Bản Đồ */}
        <div className="w-full mt-5 xl:mt-0 xl:w-5/12 xl:pl-5">
          <iframe
            title="Bao bì Hoàng Hà"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d554.1837236939218!2d105.90227365307345!3d20.86846859669549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b10bd350dfaf%3A0xabd0accbf936047d!2zVGjGsCBQaMO6LCBUaMaw4budbmcgVMOtbiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1711875838681!5m2!1svi!2s"
            className="border-none w-full min-h-[30vh] h-full rounded-md"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="w-full container mt-5 xl:mt-0 text-white">
        <p className="text-xs">
          © Bản quyền thuộc về Bao bì Hoàng Hà - Thiết kế bởi Lê Đức Anh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
