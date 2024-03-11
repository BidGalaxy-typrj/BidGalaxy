import React from "react";
import {  HiTicket } from "react-icons/hi";

const Auction = ()=>{

    const itemImage = "";
    const date = "03/03/2024";

    return (
        <div>
            <div className={`p-2 flex justify-around`}>
                <div className="flex flex-col size-1/5 bg-gradient-to-bl from-tabcolor rounded-xl cursor-pointer hover:scale-105">
                    <div className="flex justify-center w-full">
                        {itemImage ? 
                            <img src={itemImage} alt ='' className="w-full h-full overflow-hidden"/>
                        :
                            <HiTicket className="w-full h-full"/>
                        }
                    </div>
                    <div className="flex justify-center pt-0 w-full"><span className="text-base font-semibold">Auctionee Name</span></div>
                    <div className="flex justify-center pt-0 w-full"><span className="text-base">Collector's Choice</span></div>
                    <div className="flex justify-center pt-0 w-full"><span className="text-base">{date}</span></div>
                    <div className="flex justify-center p-2">
                        <button type="submit" className="bg-hover-sidebar p-2 rounded-xl font-bold text-white">Show Interest</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Auction;