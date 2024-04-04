import logo from "../assets/BidGalaxyLogo.png";
import signinBtn from "../assets/signinBtn.svg";
import registerBtn from "../assets/registerBtn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";

function HomeNav() {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate("./signup/index");
  };
  const handleSigninButtonClick = () => {
    navigate("./signin/index");
  };

  const handleAdminDashboardClick = () => {
    navigate("/admin/SideBar");
  };

  const handleUserDashboardClick = () => {
    navigate("/user/SideBar");
  };

  const handleLogoutButtonClick = () => {
    axios
      .post("http://localhost:8081/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  axios.defaults.withCredentials = true;
  const Registration =
    document.title === "BidGalaxy | Registration" ||
    document.title === "BidGalaxy | Registration" ||
    document.title === "BidGalaxy | Signin" ||
    document.title === "BidGalaxy | PrivatePolicy" ||
    document.title === "BidGalaxy | Terms&Conditions" ||
    document.title === "BidGalaxy | Reset Password" ||
    document.title === "BidGalaxy | Change Password" ||
    document.title === "BidGalaxy | Contact" ||
    document.title === "BidGalaxy | ArtAuctionItems" ||
    document.title === "BidGalaxy | ArtifactAuctionItems";
  const AdminSection =
    document.title === "BidGalaxy | AdminDashboard" ||
    document.title === "BidGalaxy | PlaceItem" ||
    document.title === "BidGalaxy | Users" ||
    document.title === "BidGalaxy | UserDetails" ||
    document.title === "BidGalaxy | AuctionItems" ||
    document.title === "BidGalaxy | AuctionItemDetails" ||
    document.title === "BidGalaxy | AuctionedItems" ||
    document.title === "BidGalaxy | AuctionedItemDetails" ||
    document.title === "BidGalaxy | AddBuyerDetails" ||
    document.title === "BidGalaxy | BidingList" ||
    document.title === "BidGalaxy | BiddingDetails";
  const UserDashboard = 
    document.title === "BidGalaxy | UserDashboard" ||
    document.title === "BidGalaxy | Profile" ||
    document.title === "BidGalaxy | AuctionDetails" ||
    document.title === "BidGalaxy | RegisterItem" ||
    document.title === "BidGalaxy | RegisterSuccess" ||
    document.title === "BidGalaxy | UpcomingBidDetails" ||
    document.title === "BidGalaxy | Bidding History";
  return (
    <nav className="relative primaryNavBg">
      <div className="primaryNav flex flex-row justify-between items-center mx-[100px]">
        <div>
          <img src={logo} alt="logo" className="w-[145px] h-[45px] " />
        </div>
        {Registration ? (
          <div> {/* Render nothing if registration successful */} </div>
        ) : UserDashboard ? (
          <div className="flex flex-row items-center gap-7">
            <div
              onClick={handleUserDashboardClick}
              className="flex flex-row gap-1 items-center text-white cursor-pointer"
            >
              <div>
                <CgProfile className="w-[25px] h-[25px]" />
              </div>
              <div className=" font-cantora uppercase text-[15px]">
                Dashboard
              </div>
            </div>
            <div
              className="cursor-pointer flex flex-row items-center gap-1 text-white"
              onClick={handleLogoutButtonClick}
            >
              <div>
                <HiOutlineLogout className="w-[25px] h-[25px]" />
              </div>
              <div className="font-cantora uppercase text-[15px]">Logout</div>
            </div>
          </div>
        ) : AdminSection ? (
          <div className="flex flex-row items-center gap-7">
            <div
              onClick={handleAdminDashboardClick}
              className="flex flex-row gap-1 items-center text-white cursor-pointer"
            >
              <div>
                <CgProfile className="w-[25px] h-[25px]" />
              </div>
              <div className=" font-cantora uppercase text-[15px]">
                Dashboard
              </div>
            </div>
            <div
              className="cursor-pointer flex flex-row items-center gap-1 text-white"
              onClick={handleLogoutButtonClick}
            >
              <div>
                <HiOutlineLogout className="w-[25px] h-[25px]" />
              </div>
              <div className="font-cantora uppercase text-[15px]">Logout</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <div onClick={handleSigninButtonClick}>
              <img
                src={signinBtn}
                alt="signin btn"
                className="cursor-pointer hover:scale-105 transition-all ease-in-out"
              />
            </div>
            <div className="font-cantora text-white">OR</div>
            <div onClick={handleRegisterButtonClick}>
              <img
                src={registerBtn}
                alt="register btn"
                className="cursor-pointer hover:scale-105 transition-all ease-in-out"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HomeNav;
