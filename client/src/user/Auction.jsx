import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';


function Auction ({userId}) {

    document.title = "BidGalaxy | AuctionItems";

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchAuctionItems();
    }, []);

    const fetchAuctionItems = () => {
        axios.get('http://localhost:8081/admin/AuctionItems')
        .then((res) => {
            if (Array.isArray(res.data)) {
                const modifiedItems = res.data.map(item => {
                    if (item.product_image1) {
                        item.product_image1 = item.product_image1
                            .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
                            .replace(/^\.\.\/client\/src\//, '');
                    }
                    const dateString = item.auction_date;
                    const date = new Date(dateString);
                    const options = { month: 'long', day: 'numeric', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    item.auction_date = formattedDate;
                    return item;
                });
                setItems(modifiedItems);
            } else {
                console.error("Response data is not an array:", res.data);
            }
        })
        .catch((err) => console.error("Error fetching item details:", err));
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const navigate = useNavigate();

    function handleAuctionInterestClick (itemId) {
        navigate(`/user/AuctionDetails?q=${itemId}&r=${userId}`);
    }

    return (
        <div className="wrapper">
            <div className="w-[1000px] mx-auto flex flex-row justify-between items-center mt-10">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-wide font-cantora  ">
                    ongoing bids
                </div>
                <div>
                    <form class="w-[20rem] mx-auto shadow-lg">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">GO</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm font-cantora text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0F2D37] focus:border-[#0F2D37] dark:bg-white dark:border-white dark:placeholder-textColor dark:text-gray-900" placeholder="Search Item Names..." required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-[#0F2D37] hover:bg-[#1a4857]  font-medium rounded-lg text-sm px-4 py-2 font-cantora">GO</button>
                        </div>
                    </form>
                </div>
            </div>
            {items.length === 0 ? (
                <div className="text-center text-3xl text-gray-500 font-cantora font-bold dark:text-gray-400 mt-14 mb-3">No Upcoming Auctions!</div>
            ) : (
                <div className="w-full flex flex-row justify-center items-center flex-wrap p-10">
                    <div className=" flex flex-row justify-start items-start gap-7">
                        {items.map((item, index) => (
                            <div key={item.id} className=" w-80">
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    {item.product_image1 &&
                                        <img className={classNames(index !== items.length - 1 ? "rounded-t-lg" : "", "rounded-t-lg w-full h-60")} src={require(`../${item.product_image1}`)} alt="hello" />
                                    }
                                    <div class="p-5">
                                        <h5 className={classNames(index !== items.length - 1 ? "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" : "", "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white")}>{item.title}</h5>
                                        <div class={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")}>{item.artist_name} (Artist)</div>
                                        <div class={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")}>Type : <span className="text-sm uppercase">{item.type}</span></div>
                                        <div class={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                            <MdDateRange className="h-5 w-5" />
                                            {item.auction_date}
                                        </div>
                                        <div class={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                            <FaRupeeSign className="h-4 w-4" />
                                            {item.price} /-
                                            (Inclusive 18% margin)
                                        </div>
                                        <div onClick={() => handleAuctionInterestClick(item.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <div className="flex flex-row items-center gap-2">
                                                Show Interest
                                                <svg className="rtl:rotate-180 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Auction;