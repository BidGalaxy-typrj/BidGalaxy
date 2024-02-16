import homeIcon from "../assets/HomeIcon.svg";
import arrow from "../assets/arrow.svg";

function HomeSecondNav() {
  return (
    <nav className="relative secondNavBg">
      <div className="flex flex-row secondNav justify-center gap-16 items-center">
        <div className="">
          <a href="Home.jsx">
            <img src={homeIcon} alt="Home Icon" className="" />
          </a>
        </div>
        <div className="flex flex-row gap-1">
          <div className="textColor text-[17px] font-cantora ">AUCTIONS</div>
          <div>
            <img src={arrow} alt="Arrow Icon" />
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="textColor text-[17px] uppercase font-cantora">
            Departments
          </div>
          <div>
            <img src={arrow} alt="Arrow Icon" />
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="textColor text-[17px] font-cantora">BIDGALAXY</div>
          <div>
            <img src={arrow} alt="Arrow Icon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeSecondNav;