import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dashboard = () =>{

    document.title = "BidGalaxy | UserDashboard";

    const [activityOpen,setActivityOpen] = useState(false)

    const [performanceOpen,setPerformanceOpen] = useState(false)

    const [overviewOpen,setOverviewOpen] = useState(false)

    return (
        <div className="w-full">
            <div className={`flex w-full h-20 bg-tabcolor hover:cursor-pointer`} onClick={()=>setActivityOpen(!activityOpen)}>
                <div className="flex w-2/3 justify-center p-5"><span className="font-bold text-3xl">Bidding Activity</span></div>
                <div className="flex w-1/3 justify-end p-5 items-center"><IoIosArrowDown className={`font-bold text-3xl ${activityOpen && "rotate-180"}`}/></div>
            </div>
            <div className={`p-5 flex justify-around ${activityOpen ? "duration-500" : "hidden"}`}>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-bl from-tabcolor rounded-xl">
                    <div className="p-5 flex m-5 justify-center"><span className="text-4xl">Total Bids</span></div>
                    <div className="p-5 flex mt-0 m-5 justify-center pt-0"><span className="text-4xl">128</span></div>
                </div>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-br from-tabcolor rounded-xl">
                    <div className="p-5 m-5 flex justify-center"><span className="text-4xl">Average Bids</span></div>
                    <div className="p-5 m-5 mt-0 flex justify-center pt-0"><span className="text-4xl">25</span></div>
                </div>
            </div>
            <div className={`flex w-full h-20 bg-tabcolor hover:cursor-pointer`} onClick={()=>setPerformanceOpen(!performanceOpen)}>
                <div className="flex w-2/3 justify-center p-5"><span className="font-bold text-3xl">Winning Performance</span></div>
                <div className="flex w-1/3 justify-end p-5 items-center"><IoIosArrowDown className={`font-bold text-3xl ${performanceOpen && "rotate-180"}`}/></div>
            </div>
            <div className={`p-5 flex justify-around ${performanceOpen ? "duration-500" : "hidden"}`}>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-bl from-tabcolor rounded-xl">
                    <div className="p-5 flex m-5 justify-center"><span className="text-4xl">Total Wins</span></div>
                    <div className="p-5 flex mt-0 m-5 justify-center pt-0"><span className="text-4xl">30</span></div>
                </div>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-br from-tabcolor rounded-xl">
                    <div className="p-5 m-5 flex justify-center"><span className="text-4xl">Winning Rate</span></div>
                    <div className="p-5 m-5 mt-0 flex justify-center pt-0"><span className="text-4xl">23.33%</span></div>
                </div>
            </div>
            <div className={`flex w-full h-20 bg-tabcolor hover:cursor-pointer`} onClick={()=>setOverviewOpen(!overviewOpen)}>
                <div className="flex w-2/3 justify-center p-5"><span className="font-bold text-3xl">Financial Overview</span></div>
                <div className="flex w-1/3 justify-end p-5 items-center"><IoIosArrowDown className={`font-bold text-3xl ${overviewOpen && "rotate-180"}`}/></div>
            </div>
            <div className={`p-5 flex justify-around ${overviewOpen ? "duration-500" : "hidden"}`}>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-bl from-tabcolor rounded-xl">
                    <div className="p-5 flex m-5 justify-center"><span className="text-4xl">Total Amount Spent</span></div>
                    <div className="p-5 flex mt-0 m-5 justify-center pt-0"><span className="text-4xl">$23,000</span></div>
                </div>
                <div className="flex flex-col size-1/3 pl- bg-gradient-to-br from-tabcolor rounded-xl">
                    <div className="p-5 m-5 flex justify-center"><span className="text-4xl">Highest Bid Amount</span></div>
                    <div className="p-5 m-5 mt-0 flex justify-center pt-0"><span className="text-4xl">$4,000</span></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard