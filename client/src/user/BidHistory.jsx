import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';



function BidHistory ({userId}) {
    
    document.title = "BidGalaxy | Bidding History";

    const [items, setItems] = useState();
    const [Message, setMessage] = useState('');

    const fetchItemDetails = (userId) => {
        axios.get(`http://localhost:8081/user/bidding_history/${userId}`)
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
                setMessage("No Previous Bids!");
            }
        })
        .catch((err) => {
            console.log("Error : ",err);
            message.error("There are some server-side error while fetching the data!");
        })
    }

    useEffect(() => {
        if (userId) {
            fetchItemDetails(userId);
        }
    }, [userId]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    console.log(items);

  return items ? (
    <div className='wrapper'>
         <div className="text-[24px] font-extrabold textColor uppercase underline tracking-wide font-cantora mt-[50px] ml-16 ">
            Bidding history
        </div>
        {items.length === 0 ? (
            <div className="text-center text-3xl text-gray-500 font-cantora font-bold dark:text-gray-400 mt-14 mb-3">{Message}</div>
        ) : (
            <div className="w-full flex flex-row justify-center items-center flex-wrap p-10">
                <div className=" flex flex-row justify-start items-start gap-7">
                    {Array.isArray(items) && items.map((item, index) => (
                        <div key={item.id} className=" w-80">
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                {item.product_image1 &&
                                    <img className={classNames(index !== items.length - 1 ? "rounded-t-lg" : "", "rounded-t-lg w-full h-56")} src={require(`../${item.product_image1}`)} alt="hello" />
                                }
                                <div className="p-5">
                                    <div className={classNames(index !== items.length - 1 ? "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" : "", " mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white")} style={{ wordWrap: 'break-word' }}>{item.title}</div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")} style={{ wordWrap: 'break-word' }}>{item.artist_name} (Artist)</div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start")}>Type : <span className="text-sm uppercase">{item.type}</span></div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")} style={{ wordWrap: 'break-word' }}>
                                        <MdDateRange className="h-5 w-5" />
                                        {item.auction_date}
                                    </div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                        Starting Price
                                    </div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")} style={{ wordWrap: 'break-word' }}>
                                        <FaRupeeSign className="h-4 w-4" />
                                        {item.price} /-
                                        (Inclusive 18% margin)
                                    </div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")}>
                                        Final Price
                                    </div>
                                    <div className={classNames(index !== items.length - 1 ? "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start" : "", "mb-3 font-normal text-gray-700 dark:text-gray-400 text-start flex items-center gap-1")} style={{ wordWrap: 'break-word' }}>
                                        <FaRupeeSign className="h-4 w-4" />
                                        {item.final_price} /-
                                        (Inclusive 18% margin)
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  ) : null;
}

export default BidHistory