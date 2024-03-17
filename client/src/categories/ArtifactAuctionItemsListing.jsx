import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ArtifactAuctionItemsListing() {
    document.title = "BidGalaxy | AuctionItems";

    const [modifiedItems, setItems] = useState([]);

    const navigate = useNavigate();

    function handleArtifactItemDetailsClick(itemId) {
        navigate(`/categories/category/Artifact/item?q=${itemId}`);
    }


    useEffect(() => {
        const category = "artifact";
        fetchAuctionItems(category);
    }, []);

    const fetchAuctionItems = (category) => {
        axios.get(`http://localhost:8081/home/artItems/${category}`)
            .then((res) => {
                console.log('Fetched Details:', res.data);
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
                    item.price = item.price * 83;
                    item.auction_date = formattedDate;
                    return item;
                });
                setItems(modifiedItems);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="wrapper">
            <div className="w-full flex flex-row justify-center items-center flex-wrap p-10">
                <div className=" flex flex-row justify-start items-start gap-7">
                    {modifiedItems.map((modifiedItem, index) => (
                        <div key={modifiedItem.id} className="w-80">
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2">
                                {modifiedItem.product_image1 &&
                                    <img className={index !== modifiedItem.length - 1 ? "rounded-t-lg" : ""} src={require(`../${modifiedItem.product_image1}`)}  alt="hello" />
                                }
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden">{modifiedItem.title}</h5>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-start">{modifiedItem.artist_name} (Artist)</div>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-start">Type : <span className="text-sm uppercase">{modifiedItem.type}</span></div>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1">
                                        <MdDateRange className="h-5 w-5" />
                                        {modifiedItem.auction_date}
                                    </div>
                                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1">
                                        <FaRupeeSign className="h-4 w-4" />
                                        {modifiedItem.price} /-
                                        (Inclusive 18% margin)
                                    </div>
                                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <div className="flex flex-row items-center gap-2" onClick={()=>handleArtifactItemDetailsClick(modifiedItem.id)}>
                                            Show Interest
                                            <svg className="rtl:rotate-180 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArtifactAuctionItemsListing;
