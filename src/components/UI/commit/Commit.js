import React from "react";
import { FaSquareCheck, FaFacebook } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Commit = () => {
  return (
    <div className="container my-5">
      <div className="w-full lg:w-4/5 mx-auto bg-amber-100 rounded-lg">
        <h1 className="w-full px-6 lg:px-0 pt-8 flex justify-center text-2xl lg:text-4xl font-bold text-blue-600">
          Tại sao lựa chọn Hoàng Hà
        </h1>
        <ul className="my-3 mx-6">
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Đáp ứng
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                mọi tiến độ
              </span>
              khách hàng yêu cầu
            </p>
          </li>
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Hệ thống máy móc
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                hiện đại
              </span>
            </p>
          </li>
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Đội ngũ thiết kế
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                chuyên nghiệp, sáng tạo
              </span>
            </p>
          </li>
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Đáp ứng được
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                những tiêu chuẩn khắt khe nhất
              </span>
            </p>
          </li>
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Cam kết sản phẩm
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                đúng kích thước, mẫu mã
              </span>{" "}
              làm vừa lòng khách hàng
            </p>
          </li>
          <li className="flex items-baseline border-b border-dotted border-gray-600">
            <FaSquareCheck className="text-green-600 text-base lg:text-xl" />
            <p className="mx-2 text-base lg:text-xl leading-relaxed">
              Hoàn thiện
              <span className="mx-1 text-blue-700 text-base lg:text-xl">
                tỉ mỉ, tận tâm
              </span>{" "}
              mang đến cho bạn sản phẩm tuyệt vời nhất
            </p>
          </li>
        </ul>

        <div className="py-4 mx-6">
          <h2 className="text-xl lg:text-2xl font-bold">Liên hệ</h2>
          <p className="my-1 text-base lg:text-xl font-bold">
            Mọi thắc mắc của các bạn về sản phẩm vui lòng liên hệ Bao bì Hoàng
            Hà để được tư vấn một cách tận tình nhất.
          </p>
          <p className="flex items-baseline text-base lg:text-xl">
            <FaPhoneSquareAlt className="mr-2 text-blue-600 text-base lg:text-xl" />
            <span class="inline-block w-1/3 sm:w-1/5 lg:w-1/6 xl:w-1/12">
              SĐT/Zalo:{" "}
            </span>
            <span className="text-blue-600 text-base lg:text-xl">
              0866.789.282
            </span>
          </p>
          <p className="flex items-baseline text-base lg:text-xl">
            <FaFacebook className="mr-2 text-blue-600 text-base lg:text-xl" />{" "}
            <span class="inline-block w-1/3 sm:w-1/5 lg:w-1/6 xl:w-1/12">
              Facebook:
            </span>
            <a
              className="text-blue-600 text-base lg:text-xl hover:text-blue-600"
              href="https://www.facebook.com/profile.php?id=100081980643690"
              target="_blank"
              rel="noreferrer"
            >
              Hoàng Hà Plasticc
            </a>
          </p>
          <p className="flex items-baseline text-base lg:text-xl">
            <IoLocationSharp className="mr-2 text-blue-600 text-base lg:text-xl" />
            <span class="inline-block w-1/3 sm:w-1/5 lg:w-1/6 xl:w-1/12">
              Địa chỉ:{" "}
            </span>
            <span className="inline-block w-1/2 sm:w-fit text-blue-600 text-base lg:text-xl">
              Cụm CN Hồng Vân, thôn Vân La , Xã Hồng Vân , Huyện Thường Tín, TP
              Hà Nội
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Commit;
