import imageSlider01 from "../../assets/img/slider/1.jpg";
import imageSlider02 from "../../assets/img/slider/2.jpg";
import imageSlider03 from "../../assets/img/slider/3.jpg";
import path from "../path";

const slider = [
  {
    id: "01",
    title: "Slider 1",
    star: 5,
    image: imageSlider01,
    link: `/${path.CATEGORY}/all`,
    desc_1: "Hiện đại, an toàn",
    desc_2: "Cơ sở sản xuất",
  },
  {
    id: "02",
    title: "Slider 2",
    star: 5,
    image: imageSlider02,
    link: `/${path.CATEGORY}/all`,
    desc_1: "Chuẩn thiết kế của khách hàng",
    desc_2: "Uy tín tạo niềm tin cho khách hàng",
  },
  {
    id: "03",
    title: "Slider 3",
    star: 4,
    image: imageSlider03,
    link: `/${path.CATEGORY}/all`,
    desc_1: "Chất liệu nhựa thân thiện khi sử dụng",
    desc_2: "An toàn",
  },
];

export default slider;
