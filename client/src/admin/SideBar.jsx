import {React, useEffect, useState} from "react";
import { HiArrowNarrowLeft, HiHome} from "react-icons/hi";
import { CgBrowser } from "react-icons/cg";
import { TbFileInvoice} from "react-icons/tb"
import HomeNav from "../components/HomePrimaryNav";
import { FaPlus } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import AdminDash from "./Index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SideBar = () =>{

    document.title = "BidGalaxy | AdminDashboard";
    const [open, setOpen] = useState(true)

    // const [dropDownOpenA, setDropDownOpenA] = useState(false)

    // const [dropDownOpenB, setDropDownOpenB] = useState(false)

    // eslint-disable-next-line
    const [dashboardOpen, setDashboardOpen] = useState(true)

    // const [profileOpen,setProfileOpen] = useState(false)

    // const [userId, setUserId] = useState();
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/admin/Sidebar')
        .then(res => {
            if(res.data.valid) {
                axios.get(`http://localhost:8081/admin/details/${res.data.userId}`)
                .then(userRes => {
                    setUsername(userRes.data.username);
                })
                .catch(err => console.log("Error fetching user details:", err));
            } else {
                navigate('/');
            }
        })
        .catch(err => console.log(err))
    }, [navigate])

    const handleItemPlaceClick = () => {
        navigate("/admin/PlaceItem")
    }

    const handleUsersClick = () => {
        navigate("/admin/Users");
    }

    const handleAuctionItemsClick = () => {
        navigate("/admin/AuctionItems");
    }

    const handleAuctionedItemsClick = () => {
        navigate("/admin/AuctionedItems");
    }

    return (
    <div className="mx-auto">
        <HomeNav />
        <div className="flex flex-row">
            <div className={`${open ? "w-1/4" : "w-16"} duration-300 p-3 pt-14 h-screen bg-[#69BEE2] sticky top-0`}>
                <HiArrowNarrowLeft className={`absolute cursor-pointer rounded-sm right-0 h-14 top-9 w-14 px-3 pt-1 text-[#28303F] border-1 ${!open && 'rotate-180'}`} onClick={()=>setOpen(!open)}/>
                <div className="flex justify-center gap-x-4 items-center">
                    <h1 className={`text-[#28303F] font-cantora font-semibold text-3xl duration-300 ${!open && 'scale-0'}`}>Hello {username}</h1>
                </div>
                <ul className="pt-8">
                    <li className={`hover:cursor-pointer px-3`}> 
                        <div className={`flex h-12 items-center justify-center`} >
                            <div className="w-[270px] h-[45px] bg-[#0F2D37] flex flex-row justify-center items-center rounded-full gap-3" onClick={handleItemPlaceClick}>
                                <FaPlus className="text-white w-[20px] h-[20px] " />
                                <span className={`text-white font-cantora font-semibold text-lg uppercase ${!open && 'hidden'}`}>place an item for bid</span>
                            </div>
                        </div>
                    </li>
                    <li className={`hover:bg-hover-sidebar hover:rounded-full h-[45px] hover:cursor-pointer  px-3 rounded-full mt-3 bg-[#2a98bd]`}> 
                        <div className={`flex h-12 items-center`}>
                            <div className="w-1/3"><HiHome className={`text-[#28303F] size-5`}/></div>
                            <div className="w-2/3"><span className={`text-[#28303F] font-cantora font-bold text-xl ${!open && 'hidden'}`}>Dashboard</span> </div>
                            <div className="w-1/3 flex justify-end"><FaArrowRightLong className={`text-[#28303F] size-5`}/></div>
                        </div>
                    </li>
                    <li className="hover:cursor-pointer"> 
                        <div className="flex px-3 h-12 items-center hover:bg-hover-sidebar hover:rounded-full " onClick={handleUsersClick}>
                            <div className="w-1/3"><FaUsers className={`text-[#28303F] size-5`}/></div>
                            <div className="w-2/3"><span className={`text-[#28303F] font-cantora font-bold text-xl ${!open && 'hidden'}`}>Users</span> </div>
                            <div className="w-1/3 flex justify-end"><FaArrowRightLong className={`text-[#28303F] size-5`}/></div>
                        </div>
                    </li>
                    <li className="hover:cursor-pointer"> 
                        <div className="flex h-12 items-center px-3 hover:bg-hover-sidebar hover:rounded-full" onClick={handleAuctionItemsClick}>
                            <div className="w-1/3"><TbFileInvoice className={`text-[#28303F] size-5`}/></div>
                            <div className="w-2/3"><span className={`text-[#28303F] font-cantora font-bold text-xl ${!open && 'hidden'}`}>Auction Items</span></div>
                            <div className="w-1/3 flex justify-end"><FaArrowRightLong className={`text-[#28303F] size-5`}/></div>
                        </div>
                    </li>
                    <li className={`hover:bg-hover-sidebar hover:rounded-full hover:cursor-pointer px-3`} onClick={handleAuctionedItemsClick}> 
                        <div className={`flex h-12 items-center`}>
                            <div className="w-1/3"><CgBrowser className={`text-[#28303F] size-5`}/></div>
                            <div className="w-2/3"><span className={`text-[#28303F] font-cantora font-bold text-xl ${!open && 'hidden'}`}>Auctioned Items</span> </div>
                            <div className="w-1/3 flex justify-end"><FaArrowRightLong className={`text-[#28303F] size-5`}/></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={`${dashboardOpen ? "" : "hidden"} ${open ? "w-3/4" : "w-full"}`}>
                <AdminDash />
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default SideBar;