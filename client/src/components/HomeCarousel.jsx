import { useState } from "react";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";


function HomeCarousel ({slides}) {

    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
      if (current === 0) setCurrent(slides.length - 1);
      else setCurrent(current - 1);
    };

    let nextSlide = () => {
      if (current === slides.length - 1) setCurrent(0);
      else setCurrent(current + 1);
    };

    return (
      <div className="relative overflow-hidden">
        <div
          className={`flex transition ease-out duration-40`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s) => {
            return <img src={s} className="w-full" alt="..." />;
          })}
        </div>

        <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-10 text-4xl">
          <button onClick={previousSlide}>
            <IoIosArrowDropleftCircle />
          </button>
          <button onClick={nextSlide}>
            <IoIosArrowDroprightCircle />
          </button>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-4 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-5 h-5 cursor-pointer  ${
                  i === current ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    );
}

export default HomeCarousel;