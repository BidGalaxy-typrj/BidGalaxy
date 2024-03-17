import { useEffect, useState } from "react";
import HomeNav from "../components/HomePrimaryNav";
import queryString from "query-string";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDroprightCircle
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#0F2D37",
        transform: "translateX(40px) scale(1.5)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowDropleftCircle
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#0F2D37",
        transform: "translateX(-40px) scale(1.5)",
      }}
      onClick={onClick}
    />
  );
}

function AuctionItemDetails() {
  document.title = "BidGalaxy | AuctionItemDetails";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: "ease-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    // Parse the query string to get the user ID
    const { q: id } = queryString.parse(window.location.search);

    // Fetch user details using the user ID
    fetchItemDetails(id);
  }, []);

  const fetchItemDetails = (id) => {
    // Make API call to fetch user details based on the user ID
    axios
      .get(`http://localhost:8081/admin/AuctionItemDetails/${id}`)
      .then((res) => {
        // console.log('Fetched User Details:', res.data);
        setItemDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  function formatDate(datePart, timePart) {
    if (!datePart || !timePart) return 'NA'; // Handle cases where datePart or timePart is empty or undefined
  
    const date = new Date(datePart);
  
    // Get day with ordinal suffix (e.g., 1st, 2nd, 3rd, etc.)
    const dayWithOrdinal = getDayWithOrdinal(date.getDate());
  
    // Get month abbreviation (e.g., Jan, Feb, Mar, etc.)
    const monthAbbreviation = getMonthAbbreviation(date.getMonth());
  
    // Get full year (e.g., 2023)
    const year = date.getFullYear();
  
    // Get hours, minutes, and seconds (in 24-hour format)
    const [hours, minutes, seconds] = timePart.split(':').map(part => padZero(parseInt(part))); // Split timePart and pad zeros if needed
  
    // Construct the formatted date string
    const formattedDate = `${dayWithOrdinal} ${monthAbbreviation}, ${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }
  
  // Helper function to get ordinal suffix for day
  function getDayWithOrdinal(day) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const relevantDigits = (day < 30) ? day % 20 : day % 30;
    const suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return `${day}${suffix}`;
  }
  
  // Helper function to get month abbreviation
  function getMonthAbbreviation(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }
  
  // Helper function to pad zero to single digit hours, minutes, and seconds
  function padZero(number) {
    return (number < 10) ? `0${number}` : number;
  }
  
  // To get the date and time in our desired manner that is auction date and time
  const dateString = (itemDetails && itemDetails.auction_date && itemDetails.auction_time) ? `${itemDetails.auction_date} ${itemDetails.auction_time}`.trim() : 'NA';
  const [datePart, timePart] = dateString.split(' ');
  const formattedDateTime = formatDate(datePart, timePart);


  //Here we are trying to subtract our auction date to today's date and converting it to particular format so that we can get howmany days are left
  let daysLeft = null;
  if (itemDetails && itemDetails.auction_date) {
    const auctionDate = new Date(itemDetails.auction_date);
    const today = new Date();
    const timeDiff = auctionDate.getTime() - today.getTime();
    if (timeDiff < 1) {
      daysLeft = "Expired"
    }
    else {
      daysLeft = (Math.ceil(timeDiff / (1000 * 3600 * 24)))+" Days Left";
    }
  }

  let image1 = null;
  if (itemDetails && itemDetails.product_image1) {
    let auctionImage1 = itemDetails.product_image1;
    image1 = auctionImage1
      .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
      .replace(/^\.\.\/client\/src\//, '');
  }

  let image2 = null;
  if (itemDetails && itemDetails.product_image2) {
    let auctionImage2 = itemDetails.product_image2;
    image2 = auctionImage2
      .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
      .replace(/^\.\.\/client\/src\//, '');
  }

  let image3 = null;
  if (itemDetails && itemDetails.product_image3) {
    let auctionImage13 = itemDetails.product_image3;
    image3 = auctionImage13
      .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
      .replace(/^\.\.\/client\/src\//, '');
  }

  let image4 = null;
  if (itemDetails && itemDetails.product_image4) {
    let auctionImage4 = itemDetails.product_image4;
    image4 = auctionImage4
      .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
      .replace(/^\.\.\/client\/src\//, '');
  }

  let artistImage = null;
  if (itemDetails && itemDetails.artist_profile_url) {
    let artistProfile = itemDetails.artist_profile_url;
    artistImage = artistProfile
    .replace(/\\/g, '/')
    .replace(/^\.\.\/client\/src\//, '');
  }

  const navigate = useNavigate()

  const handleRegisterButton = () => {
    navigate(`/signin/index`);
  }
  
  return itemDetails ? (
    <div>
      <HomeNav />
      <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] ml-16 ">
        item details
      </div>
      <section className="bg-[#69BEE2] bg-opacity-51 mt-[50px]">
        <div className="w-[1200px] mx-auto">
          <div className="mt-[30px]">
            <Slider {...settings}>
            {image1 &&
              <div className="p-5">
                <img
                  src={require(`../${image1}`)}
                  alt="Image1"
                  className="w-[1200px] h-[350px] m-auto border-[#0F2D37] border-[12px]"
                />
              </div>
            }
              {image2 &&
                <div className="p-5">
                  <img
                    src={require(`../${image2}`)}
                    alt="Image2"
                    className="w-[1200px] h-[350px] m-auto border-[#0F2D37] border-[12px]"
                  />
                </div>
              }
              {image3 &&
                <div className="p-5">
                  <img
                    src={require(`../${image3}`)}
                    alt="Image3"
                    className="w-[1200px] h-[350px] m-auto border-[#0F2D37] border-[12px]"
                  />
                </div>
              }
              {image4 &&
                <div className="p-5">
                  <img
                    src={require(`../${image4}`)}
                    alt="Image4"
                    className="w-[1200px] h-[350px] m-auto border-[#0F2D37] border-[12px]"
                  />
                </div>
              }
            </Slider>
          </div>
        </div>
      </section>
      <section className="w-[1200px] mx-auto mt-[75px] mb-20">
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">title</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{itemDetails.title || 'NA'}</div>
        </div>
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">description</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{itemDetails.description || 'NA'}</div>
        </div>
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">auctioneer</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{itemDetails.auctioneer_name || 'NA'}</div>
        </div>
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">auctioneer contact</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{itemDetails.auctioneer_contact || 'NA'}</div>
        </div>
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">starting bid</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{itemDetails.price * 80 || 'NA'}</div>
        </div>
        <div className="mb-4">
          <div className="textColor text-xl font-cantora uppercase font-bold">auction date and time</div>
          <div className="text-gray-700 font-cantora text-base uppercase mt-2">{formattedDateTime} (in 24hrs)</div>
          <div className="text-red-700 font-cantora text-base mt-2">{daysLeft}</div>
        </div>
        <div className="mb-20">
          <div className="textColor text-xl font-cantora uppercase font-bold">about the artist</div>
          <div className="flex flex-row gap-20 mt-[22px]">
            <div className="w-[160px] h-[160px] admin_user_details_image_holder rounded-full">
              <img src={require(`../${artistImage}`)} alt="artist" className="p-1 w-[160px] h-[160px] rounded-full" />
            </div>
            <div className="flex flex-col items-start justify-start gap-3 w-3/4">
              <div className="textColor font-cantora text-xl uppercase ">{itemDetails.artist_name || 'NA'}</div>
              <div className="textColor font-cantora text-lg">{itemDetails.artist_short_description || 'NA'}</div>
              <div className="textColor font-cantora text-lg">{itemDetails.artist_long_description || 'NA'}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className=' flex justify-center items-center w-[400px] h-[50px] bg-[#0F2D37] rounded-full cursor-pointer hover:scale-105 transition-all ease-out'
          onClick={()=>handleRegisterButton()}
          >
              <div className=' text-white text-2xl font-cantora font-bold uppercase'>
                  Register
              </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  ) : null;
}

export default AuctionItemDetails;
