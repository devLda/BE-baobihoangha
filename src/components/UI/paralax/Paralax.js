import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";


const Paralax = ({ title, content, image, breadcrumb }) => {
  const [heightPara, setHeightPara] = useState("h-[40vh]");
  useEffect(() => {
    const { innerHeight } = window;
    if (innerHeight >= 1400) setHeightPara("h-[40vh]");
    if (innerHeight >= 1200 && innerHeight < 1400) setHeightPara("h-[40vh]");
    if (innerHeight >= 992 && innerHeight < 1200) setHeightPara("h-[50vh]");
    if (innerHeight >= 768 && innerHeight < 992) setHeightPara("h-[50vh]");
    if (innerHeight >= 576 && innerHeight < 768) setHeightPara("h-[50vh]");
    if (innerHeight < 576) setHeightPara("h-[100vh]");
  }, []);
  return (
    <div
      className={`${heightPara} relative bg-fixed bg-cover 
    before:content-[''] before:absolute before:w-full before:h-full 
    before:top-0 before:left-0 before:z-10 before:opacity-50 
    before:bg-black`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="container z-10 relative flex justify-start h-full items-center">
        <div className="w-full translate-y-1/4">
          <div className="relative bg-transparent py-8">
            <h6 className="text-yellow-600 uppercase mb-2 md:mb-4 tracking-[.25em] text-lg md:text-xl font-OpenSans">
              {title ? title : "Title"}
            </h6>
            <h4 className="text-white text-3xl md:text-6xl font-normal mb-1 md:mb-3 font-Alegreya">
              {content ? content : "Content"}
            </h4>
            <Breadcrumb titles={breadcrumb} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paralax;
