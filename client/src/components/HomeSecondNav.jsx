// import { Link, useNavigate } from "react-router-dom";
// import homeIcon from "../assets/HomeIcon.svg";
// import arrow from "../assets/arrow.svg";
// import Contactus from "./Contactus";




function HomeSecondNav() {

  // const navigate = useNavigate();

  // const handleContactus = () =>{
  //   navigate("/Contactus");
  // }
  return (
    <>
       <nav className="relative secondNavBg">
      {/*  <div className="flex flex-row secondNav justify-center gap-16 items-center">
          <div className="">
            <a href="Home.jsx">
              <img src={homeIcon} alt="Home Icon" className="" />
            </a>
          </div>
          <button className="relative flex flex-row gap-1 cursor-pointer group">
            <div className="textColor text-[17px] font-cantora ">AUCTIONS</div>
            <div>
              <img src={arrow} alt="Arrow Icon" />
            </div>
            <div id="dropdownHover" className="absolute hidden z-10 group-focus:block  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 top-full mt-3 ">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 text-left">
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Upcoming</Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Live</Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Auction Results</Link>
                </li>
              </ul>
            </div>
          </button>
          <button className="flex flex-row gap-1 cursor-pointer group">
            <div className="textColor text-[17px] font-cantora ">DEPARTMENTS</div>
            <div>
              <img src={arrow} alt="Arrow Icon" />
            </div>
            <div id="dropdownHover" className="z-10 hidden group-focus:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 text-left">
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Art</Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Artifact</Link>
                </li>
              </ul>
            </div>
          </button>
          <button className="flex flex-row gap-1 cursor-pointer group">
            <div className="textColor text-[17px] font-cantora ">BIDGALAXY</div>
            <div>
              <img src={arrow} alt="Arrow Icon" />
            </div>
            <div id="dropdownHover" className="z-10 hidden group-focus:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 text-left">
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About Us</Link>
                </li>
                <li>
                  <Link onClick={handleContactus} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Contact Us</Link>
                </li>
              </ul>
            </div>
          </button>
        </div>*/}
      </nav> 
    </>
  );
}

export default HomeSecondNav;