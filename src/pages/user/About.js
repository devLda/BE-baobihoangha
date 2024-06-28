import React, { useEffect, useState } from "react";
import bgParalax from "../../assets/img/paralax/bg-slider.jpg";
import Paralax from "../../components/UI/paralax/Paralax";

import coSoSX from "../../assets/img/about/coSoSX.jpg";
import mayMocHienDai from "../../assets/img/about/mayMocHienDai.jpg";

const About = () => {
  const [breadcrumb, setBreadcumb] = useState(null);
  useEffect(() => {
    if (window.location.href.includes("about")) {
      setBreadcumb([
        {
          ten: "Giới thiệu",
          link: "/about",
        },
      ]);
    }
  }, []);
  return (
    <>
      <Paralax
        title="Giới thiệu"
        content="Về Công ty TNHH Sản Xuất Hoàng Hà"
        image={bgParalax}
        breadcrumb={breadcrumb}
      />

      <section className="container my-8">
        <div className="my-4">
          <h1 className="mb-4 flex justify-center text-3xl font-semibold">
            LỜI GIỚI THIỆU
          </h1>
          <h3 className="mb-4 text-xl tracking-wide">
            Lời đầu tiên,{" "}
            <b className="uppercase">CÔNG TY TNHH Sản Xuất Hoàng Hà</b> xin được
            gửi tới Quý khách hàng, đối tác lời chào trân trọng, lời chúc sức
            khỏe và lời cảm ơn sâu sắc về sự quan tâm mà Quý khách dành cho
            chúng tôi.
          </h3>
          <h3 className="mb-4 text-xl tracking-wide">
            Công ty TNHH Sản Xuất Hoàng Hà là cơ sở sản xuất túi nilon được
            thành lập từ năm 2006. Qua quá trình sản xuất và phát triển từ một
            cơ sở sản xuất Công ty đã từng bước vươn lên và khẳng định được vị
            thế của mình trên thị trường về sản xuất và cung cấp sản phẩm đóng
            gói. Các dòng sản phẩm nổi bật của công ty hiện tại như: Túi zipper,
            Màng PE, Màng PVC,...
          </h3>
          <img className="w-full mb-2" src={coSoSX} alt="cơ sở sản xuất"></img>
          <h5 className="mb-2 flex justify-center text-sm italic">
            {" "}
            Hình ảnh cơ sở sản xuất tại xưởng Hoàng Hà{" "}
          </h5>
        </div>

        <div className="my-4">
          <h3 className="mb-4 text-xl tracking-wide">
            Với nguyên vật liệu đầu vào đạt chất lượng cao, sản xuất trên dây
            chuyền máy móc trang thiết bị hiện đại, kỹ thuật công nghệ mới luôn
            được cập nhật, được điều khiển và vận hành dưới đội ngũ kỹ thuật
            chuyên nghiệp, nhân công tay nghề cao. Công ty chúng tôi đã sản xuất
            và cung cấp cho thị trường nhiều loại sản phẩm bao bì khác biệt với
            chất lượng tốt
          </h3>
          <h3 className="mb-4 text-xl tracking-wide">
            Chúng tôi cam kết mang lại cho khách hàng sự hài lòng thông qua việc
            cung ứng những sản phẩm chất lượng tốt nhất.
          </h3>

          <img
            className="w-full mb-2"
            src={mayMocHienDai}
            alt="cơ sở sản xuất"
          ></img>
          <h5 className="mb-2 flex justify-center text-sm italic">
            {" "}
            Hình ảnh máy móc tại xưởng Hoàng Hà{" "}
          </h5>
        </div>

        <div className="my-4">
          <h3 className="mb-4 text-xl tracking-wide font-bold text-black">
            Bộ máy vận hành Công ty của chúng tôi luôn xây dựng giá trị cốt lõi
            với 3 tiêu chí:
          </h3>
          <ol type="1">
            <li className="text-base italic">
              Tận tâm trong công việc – Uy tín với khách hàng.
            </li>
            <li className="text-base italic">
              Tác phong phải chuyên nghiệp – Công việc mới hiệu quả.
            </li>
            <li className="text-base italic">
              Tin tưởng mới lâu dài – Phát triển phải bền vững.​
            </li>
          </ol>

          <h3 className="mb-4 text-xl tracking-wide">
            Với nhiều năm kinh nghiệm trong ngành in ấn và sản xuất bao bì,
            chúng tôi tự hào là một địa chỉ in ấn và sản xuất bao bì uy tín -
            chất lượng - giá cả cạnh tranh. Chúng tôi tự tin khẳng định trình độ
            công nghệ cũng như năng lực sản xuất của mình để đáp ứng tối đa nhu
            cầu của cả khách hàng dễ tính và khó tính. Đội ngũ nhân viên của
            chúng tôi luôn đặt ra phương châm:{" "}
            <i className="text-black">
              “Vui lòng khách đến, vừa lòng khách đi” làm kim chỉ Nam khi bán
              hàng.
            </i>
          </h3>

          <h3 className="mb-4 text-2xl tracking-wide font-bold text-black">
            &rArr; Mục tiêu chiến lược của Công ty là trở thành một trong những
            doanh nghiệp sản xuất & cung cấp bao bì “Hàng đầu tại Việt Nam” cũng
            như sẽ có sức ảnh hưởng và nhân rộng ra nhiều khu vực
          </h3>

          <h3 className="mb-4 text-xl tracking-wide">
            Các vấn đề Quý khách đang gặp phải sẽ được giải đáp một cách nhiệt
            tình, nhanh chóng và chính xác.
          </h3>

          <h3 className="mb-4 text-xl tracking-wide">
            ​Mọi thông tin về sản phẩm vui lòng liên hệ thông qua:
          </h3>

          <h3 className="mb-4 text-xl tracking-wide text-black">
            Số điện thoại:{" "}
            <a
              className="hover:text-green-300 hover:pl-4 transition-all ease-in-out duration-500 text-blue-600 text-xl"
              href="tel:0866789282"
            >
              0866.789.282
            </a>{" "}
            (Ms.Dương)
          </h3>

          <h3 className="mb-4 text-xl tracking-wide text-black">
            Hoặc inbox fanpage:{" "}
            <a
              className="hover:text-green-300 hover:pl-4 transition-all ease-in-out duration-500 text-blue-600 text-xl"
              href="https://www.facebook.com/profile.php?id=100081980643690"
            >
              Hoàng Hà Plasticc
            </a>
          </h3>
        </div>
      </section>

      {/* <div className="container my-8">
        <h1 className="text-3xl font-bold">Thông tin liên hệ:</h1>
        <div className="w-full flex justify-center">
          <div className="flex flex-col">
            <img className="w-80 h-80" src={logo} alt="Logo"></img>
            <p className="text-3xl flex justify-center font-bold uppercase my-5">
              Bao bì Hoàng Hà
            </p>
            <p className="text-xl flex justify-center my-1">SĐT:</p>
            <p className="text-xl flex justify-center my-1">
              Ms.Dương: 0866.789.282
            </p>
            <p className="text-xl flex justify-center my-1">Website:</p>
            <p className="text-xl flex justify-center my-1">
              <a
                className="hover:text-red-700 text-xl text-yellow-600 hover:pl-4 transition-all ease-in-out duration-500"
                href="http://www.dogochaulam.com"
              >
                baobihoangha.com
              </a>
            </p>
            <p className="text-xl flex justify-center my-1">Facebook:</p>
            <p className="flex justify-center my-1">
              <a
                className="hover:text-red-700 text-xl text-yellow-600 hover:pl-4 transition-all ease-in-out duration-500"
                href="https://www.facebook.com/profile.php?id=100081980643690"
              >
                Bao bì Hoàng Hà
              </a>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default About;
