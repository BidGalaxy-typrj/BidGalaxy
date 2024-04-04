import React, { useEffect, useState } from "react";
import { HiArrowNarrowLeft, HiHome } from "react-icons/hi";
import { TbFileInvoice } from "react-icons/tb";
import { CgBrowser } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Auction from "./Auction";
import UpcomingBids from "./UpcomingBids";
import OngoingBids from "./OngoingBids";
import HomeNav from "../components/HomePrimaryNav";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BidHistory from "./BidHistory";


const SideBar = () => {
  document.title = "BidGalaxy | UserDashboard";

  const [open, setOpen] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [upcomingBidsOpen, setUpcomingBidsOpen] = useState(false);
  const [ongoingBidsOpen, setOngoingBidsOpen] = useState(false);
  const [bidResultOpen, setBidResultopen] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setDropDownOpen(false);
    setUpcomingBidsOpen(false);
    setOngoingBidsOpen(false);
    setBidResultopen(false);
  };

  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/user/Sidebar')
    .then(res => {
        if(res.data.valid) {
            axios.get(`http://localhost:8081/user/details/${res.data.userId}`)
            .then(userRes => {
                setUserId(res.data.userId);
                setUsername(userRes.data.username);
            })
            .catch(err => console.log("Error fetching user details:", err));
        } else {
            navigate('/');
        }
    })
    .catch(err => console.log(err))
}, [navigate])

  return (
    <div className="wrapper">
      <HomeNav />
      <div className="flex w-screen">
        <div
          className={`${
            open ? "w-1/4" : "w-16"
          } duration-300 p-3 pt-14 min-h-screen bg-side-bar sticky top-0`}
        >
          <HiArrowNarrowLeft
            className={`absolute cursor-pointer rounded-sm right-0 h-14 top-9 w-14 px-3 pt-1 bg-side-bar text-white border-1 ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <h1
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              {username}
            </h1>
          </div>
          <ul className="pt-6">
            <li
              className={`hover:bg-hover-sidebar hover:cursor-pointer px-3 ${
                selectedTab === "dashboard" ? "bg-selected" : ""
              }`}
              onClick={() => handleTabClick("dashboard")}
            >
              <div className={`flex h-12 items-center`}>
                <div className="w-1/3">
                  <HiHome className={`text-white size-5`} />
                </div>
                <div className="w-1/3">
                  <span className={`text-white ${!open && "hidden"}`}>
                    Dashboard
                  </span>{" "}
                </div>
              </div>
            </li>
            <li
              className={`hover:bg-hover-sidebar hover:cursor-pointer px-3 ${
                selectedTab === "auctions" ? "bg-selected" : ""
              }`}
              onClick={() => handleTabClick("auctions")}
            >
              <div className="flex h-12 items-center">
                <div className="w-1/3">
                  <TbFileInvoice className={`text-white size-5`} />
                </div>
                <div className="w-1/3">
                  <span className={`text-white ${!open && "hidden"}`}>
                    Auctions
                  </span>{" "}
                </div>
              </div>
            </li>
            <li>
              <div
                className="flex h-12 items-center px-3 hover:bg-hover-sidebar hover:cursor-pointer"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              >
                <div className="w-1/3">
                  <CgBrowser className={`text-white size-5`} />
                </div>
                <div className="w-1/3">
                  <span className={`text-white ${!open && "hidden"}`}>
                    My Bids
                  </span>
                </div>
                <div className="w-1/3 flex justify-end">
                  <IoIosArrowDown
                    className={`text-white size-5 ${
                      dropDownOpen && "rotate-180"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`${dropDownOpen ? "" : "hidden"} ${
                  !open && "hidden"
                }`}
              >
                <ul>
                  <li
                    className={`hover:bg-hover-sidebar hover:cursor-pointer px-3`}
                    onClick={() => {
                      setUpcomingBidsOpen(true);
                      setDropDownOpen(false);
                      setSelectedTab(false);
                      setOngoingBidsOpen(false);
                      setBidResultopen(false);
                    }}
                  >
                    <div className="p-2 justify-center pl-6">
                      <span className="text-white">Upcoming Bids</span>
                    </div>
                  </li>
                  <li
                    className={`hover:bg-hover-sidebar hover:cursor-pointer px-3`}
                    onClick={() => {
                      setUpcomingBidsOpen(false);
                      setOngoingBidsOpen(true);
                      setDropDownOpen(false);
                      setSelectedTab(false);
                      setBidResultopen(false);
                    }}
                  >
                    <div className="p-2 justify-center pl-6">
                      <span className="text-white">Ongoing Bids</span>
                    </div>
                  </li>
                  <li className={`hover:bg-hover-sidebar hover:cursor-pointer px-3`}
                      onClick={() => {
                      setUpcomingBidsOpen(false);
                      setOngoingBidsOpen(false);
                      setDropDownOpen(false);
                      setSelectedTab(false);
                      setBidResultopen(true);
                    }}
                    >
                    <div className="p-2 justify-center pl-6">
                      <span className="text-white">Bid Results</span>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={`hover:bg-hover-sidebar hover:cursor-pointer px-3 ${
                selectedTab === "profile" ? "bg-selected" : ""
              }`}
              onClick={() => handleTabClick("profile")}
            >
              <div className={`flex h-12 items-center`}>
                <div className="w-1/3">
                  <FaRegUserCircle className={`text-white size-5`} />
                </div>
                <div className="w-1/3">
                  <span className={`text-white ${!open && "hidden"}`}>
                    Profile
                  </span>{" "}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={`${selectedTab === "dashboard" ? "" : "hidden"} ${
            open ? "w-3/4" : "w-full"
          }`}
        >
          <Dashboard userId={userId} />
        </div>

        <div
          className={`${selectedTab === "auctions" ? "" : "hidden"} ${
            open ? "w-3/4" : "w-full"
          }`}
        >
          <Auction userId={userId} />
        </div>

        <div
          className={`${selectedTab === "profile" ? "" : "hidden"} ${
            open ? "w-3/4 my-20" : "w-full"
          }`}
        >
          <Profile userId={userId} />
        </div>

        <div
          className={`${upcomingBidsOpen ? "" : "hidden"} ${
            open ? "w-3/4" : "w-full"
          }`}
        >
          <UpcomingBids userId={userId} />
        </div>

        <div
          className={`${ongoingBidsOpen ? "" : "hidden"} ${
            open ? "w-3/4" : "w-full"
          }`}
        >
          <OngoingBids userId={userId} />
        </div>

        <div
          className={`${bidResultOpen ? "" : "hidden"} ${
            open ? "w-3/4" : "w-full"
          }`}
        >
          <BidHistory userId={userId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SideBar;
