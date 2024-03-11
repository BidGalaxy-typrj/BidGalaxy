import HomeNav from "./HomePrimaryNav";
import HomeSecondNav from "./HomeSecondNav";
import CarouselPic1 from "../assets/CarousalPic1.svg";
// import CarouselPic2 from "../assets/CarouselPic2.svg";
import HomeCarousel from "./HomeCarousel";
// import { useNavigate } from "react-router-dom";
import ucAuction1 from '../assets/ucAuction1.svg';
import ucAuction2 from '../assets/ucAuction2.svg';
import ucAuction3 from '../assets/ucAuction3.svg';
import serviceImage1 from '../assets/serviceImage.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDroprightCircle
      className={className}
      style={{ ...style, display: "block", color: "#0F2D37", transform: "translateX(40px) scale(1.5)"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDropleftCircle
      className={className}
      style={{ ...style, display: "block", color: "#0F2D37", transform: "translateX(-40px) scale(1.5)"}}
      onClick={onClick}
    />
  );
}

function Home() {
  document.title = "BidGalaxy | Home";
  let slides = [CarouselPic1, CarouselPic1, CarouselPic1];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "ease-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const navigate = useNavigate();

  const handleUpcomingAuctioncardClick = () => {
    navigate("./categories/Category");
  };

  return (
    <div className="wrapper">
      <HomeNav />
      <HomeSecondNav />
      <div className="w-full bg-[#62CDEF]/[0.5]">
        <section className="w-[80%] mx-auto">
          <HomeCarousel slides={slides} />
        </section>
      </div>
      <section className="w-[1400px] mt-14 mx-auto">
        <div className="text-[24px] font-extrabold text-[#28303F] uppercase underline tracking-tighter font-cantora ">
          upcoming auctions
        </div>
        <div className="w-3/4 mx-auto">
          <div className="mt-[30px]">
            <Slider {...settings}>
              {data.map((d) => (
                <div onClick={handleUpcomingAuctioncardClick} className=" rounded-[24px] w-[330px] h-[357px] flex justify-center items-center ucAuctionCards cursor-pointer">
                  <div className="p-6">
                    <img
                      src={d.img}
                      alt="..."
                      className="rounded-[24px] w-[282px] h-[309px] m-auto"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="mt-14 mx-auto ">
        <div className="text-[24px] font-extrabold text-[#28303F] uppercase underline tracking-tighter ml-16 font-cantora">
          our services
        </div>
        <div className="homeServiceSection">
          <div className="w-3/4 mx-auto mt-[30px] ">
            <div className="p-10">
              <div className="flex flex-row flex-wrap mx-auto gap-[40px]">
                <div className="homeServiceUpperCircleBorder p-1 rounded-full">
                  <div className="rounded-full w-[315px] h-[315px] homeServiceUpperCircle text-[#28303F] uppercase underline tracking-tighter text-center pt-[3.5rem] text-[22px] font-extrabold">
                    Client Advisory
                    <div className="flex justify-center mt-[2.5rem]">
                      <img
                        src={serviceImage1}
                        alt="serviceImage1"
                        className="w-[197px] h-[120px] rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="homeServiceUpperCircleBorder p-1 rounded-full">
                  <div className="rounded-full w-[315px] h-[315px] homeServiceUpperCircle text-[#28303F] uppercase underline tracking-tighter text-center pt-[3.5rem] text-[22px] font-extrabold">
                    storage
                    <div className="flex justify-center mt-[2.5rem]">
                      <img
                        src={serviceImage1}
                        alt="serviceImage1"
                        className="w-[197px] h-[120px] rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="homeServiceUpperCircleBorder p-1 rounded-full">
                  <div className="rounded-full w-[315px] h-[315px] homeServiceUpperCircle text-[#28303F] uppercase underline tracking-tighter text-center pt-[3.5rem] text-[22px] font-extrabold font-cantora">
                    collection service
                    <div className="flex justify-center mt-[2.5rem]">
                      <img
                        src={serviceImage1}
                        alt="serviceImage1"
                        className="w-[197px] h-[120px] rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="">
                <div className="flex flex-row flex-wrap mx-auto">
                  <div className="homeServiceUpperCircleBorder p-1 rounded-full">
                    <div className="rounded-full w-[315px] h-[315px] homeServiceUpperCircle text-[#28303F] uppercase underline tracking-tighter text-center pt-[3.5rem] text-[22px] font-extrabold font-cantora">
                      valuation
                      <div className="flex justify-center mt-[2.5rem]">
                        <img
                          src={serviceImage1}
                          alt="serviceImage1"
                          className="w-[197px] h-[120px] rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-14 mx-auto mb-24">
        <div className="text-[24px] text-[#28303F] underline tracking-tighter ml-16 font-cantora font-extrabold">
          WHY BidGalaxy
        </div>
        <div className="homeServiceSection mt-[30px]">
          <div className="text-center text-[24px] font-cantora uppercase py-10">
            Discover bIDGALAXY , <br />
            your premier online auction <br />
            destination for a seamless and exhilarating <br />
            experience. Register effortlessly to explore a <br />
            diverse range of coveted items, from rare collectibles <br />
            to cutting-edge gadgets. Engage in spirited bidding wars on our
            user-friendly <br />
            platform and real-time bidding system for a competitive yet
            transparent
            <br /> atmosphere. Benefit from comprehensive item descriptions,
            high-quality images,
            <br /> and transparent auction histories. BidGalaxy offers
            convenient features like
            <br /> automated bidding, personalized watchlists, and timely
            notifications,
            <br /> transforming the platform into a dynamic and interactive
            community. Join
            <br /> BidGalaxy today to redefine your auction experience with
            every click bringing you
            <br /> closer to your desired treasures.
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

let data = [
  {
    img : ucAuction1,
  },
  {
    img : ucAuction2,
  },
  {
    img : ucAuction3,
  },
  {
    img : ucAuction1,
  },
]

export default Home;
