import axios from "axios";
import {React, useEffect, useState} from "react";
import { MdDateRange } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";


function OngoingBids ({userId}) {

    document.title = "BidGalaxy | UpcomingBids";

    const [items, setItems] = useState([]);

    useEffect(() => {
        if(userId) {
            fetchItemDetails(userId);
        }
    }, [userId]);

    const fetchItemDetails = (userId) => {
        axios.get(`http://localhost:8081/user/ongoing_bids/${userId}`)
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

    return items ? (
        <div className="wrapper">
            <div className="text-[24px] font-extrabold textColor uppercase underline tracking-wide font-cantora mt-[50px] ml-16 ">
                ongoing bids
            </div>
            {items.length === 0 ? (
                <div className="text-center text-3xl text-gray-500 font-cantora font-bold dark:text-gray-400 mt-14 mb-3">No Ongoing Bids!</div>
            ) : (
                <div className="w-full flex flex-row justify-center items-center flex-wrap p-10">
                    <div className=" flex flex-row justify-start items-start gap-7">
                        {Array.isArray(items) && items.map((item, index) => (
                            <div key={item.id} className=" w-80">
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    {item.product_image1 &&
                                        <img className={classNames(index !== items.length - 1 ? "rounded-t-lg" : "", "rounded-t-lg w-full h-60")} src={require(`../${item.product_image1}`)} alt="hello" />
                                    }
                                    <div className="p-5">
                                        <h5 className={classNames(index !== items.length - 1 ? "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" : "", "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white")}>{item.title}</h5>
                                        <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")}>{item.artist_name} (Artist)</div>
                                        <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")}>Type : <span className="text-sm uppercase">{item.type}</span></div>
                                        <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                            <MdDateRange className="h-5 w-5" />
                                            {item.auction_date}
                                        </div>
                                        <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                            <FaRupeeSign className="h-4 w-4" />
                                            {item.price} /-
                                            (Inclusive 18% margin)
                                        </div>
                                        <div className="w-full mx-auto">
                                            <a href={item.meeting_link} target="_blank" rel="noreferrer" className="mx-auto flex justify-center mt-4 items-center px-3 py-2 text-base font-medium text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-48">
                                                <div className="flex flex-row items-center">
                                                    Join Meet
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    ) : null ;
};

export default OngoingBids;