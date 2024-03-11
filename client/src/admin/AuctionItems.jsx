import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoInformationCircle } from "react-icons/io5";
import HomeNav from "../components/HomePrimaryNav";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";


function AuctionItems () {

    document.title = "BidGalaxy | AuctionItems";

    const navigate = useNavigate();
    const handleItemPlaceClick = () => {
        navigate("/admin/PlaceItem")
    }

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchAuctionItems();
    }, []);

    const fetchAuctionItems = () => {
        axios.get('http://localhost:8081/admin/AuctionItems')
            .then((res) => {
                // console.log('Fetched Products:', res.data);
                setItems(res.data);
            })
            .catch((err) => console.log(err));
        };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function handleAuctionItemDetailsClick(itemId) {
        navigate(`/admin/AuctionItemDetails?q=${itemId}`);
    }
    
    function toggleDisabled(itemId, item) {
        const newDisabledValue = item.disabled === '0' ? '1' : '0';
        // console.log('New disabled value:', newDisabledValue);
        axios.put(`http://localhost:8081/admin/AuctionItems/EnableDisable/${itemId}`, { disabled: newDisabledValue })
            .then(() => {
                const updatedItems = items.map((currentItem) => {
                    if (currentItem.id === itemId) {
                        return { ...currentItem, disabled: newDisabledValue };
                    }
                    return currentItem;
                });
                setItems(updatedItems);
            })
            .catch((err) => console.error(err));
    }

    function deleteProduct(itemId) {
        axios.put(`http://localhost:8081/admin/AuctionItems/Delete/${itemId}`)
        .then(() => {
            fetchAuctionItems();
        })
        .catch((err) => console.error(err));
    }

    return (
        <div>
            <HomeNav />
            <section className="w-[1400px] mx-auto">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] hover:scale-105 transition-all ease-out ">
                    add item
                </div>
                <div className="w-[190px] h-[45px] bg-[#0F2D37] flex flex-row justify-center items-center rounded-2xl gap-3 cursor-pointer mt-[34px]" onClick={handleItemPlaceClick}>
                    <FaPlus className="text-white w-[20px] h-[20px] " />
                    <span className={`text-white font-cantora font-semibold text-lg uppercase`}>add item</span>
                </div>
            </section>
            <section className="w-[1400px] mx-auto mt-[63px] mb-40">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora">
                        auction item
                    </div>
                    <div>
                        <form class="w-[20rem] mx-auto">   
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
                <div className="w-[1000px] mx-auto mt-14 flex flex-col">
                    <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                                    <thead className="bg-[#62CDEF] bg-opacity-[51%]">
                                        <tr>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC]  py-3.5 pl-4 pr-3 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
                                                Sr. No.
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 hidden border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter sm:table-cell">
                                                Title
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 hidden border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter lg:table-cell">
                                                Category
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Details
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Enable/Disable
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#C9EDED]">
                                        {items.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium font-cantora text-center textColor sm:pl-6 lg:pl-8'
                                                )}>
                                                    {index + 1}
                                                </td>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora text-center hidden sm:table-cell'
                                                )}>
                                                    {item.title}
                                                </td>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora hidden text-center lg:table-cell'
                                                )}>
                                                    {item.type}
                                                </td>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <div onClick={() => handleAuctionItemDetailsClick(item.id)} className=' mx-auto flex flex-row justify-center items-center bg-[#0F2D37] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                        <IoInformationCircle className='text-white w-5 h-5' />
                                                        <div className=' font-cantora text-white text-base'>Details</div>
                                                    </div>
                                                </td>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <div onClick={() => toggleDisabled(item.id, item)}>
                                                    {item.disabled === '1' ? (
                                                        <div className=' mx-auto flex flex-row justify-center items-center bg-[#30ad32] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                            <FaLockOpen className='text-white w-5 h-5' />
                                                            <div className=' font-cantora text-white text-base'>Enabled</div>
                                                        </div>
                                                    ) : (
                                                        <div className=' mx-auto flex flex-row justify-center items-center bg-red-700 hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                            <FaLock className='text-white w-5 h-5' />
                                                            <div className=' font-cantora text-white text-base'>Disabled</div>
                                                        </div>
                                                    )}
                                                    </div>
                                                </td>
                                                <td className={classNames(
                                                    index !== items.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <div onClick={() => deleteProduct(item.id)} className=' mx-auto flex flex-row justify-center items-center bg-red-700 hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                        <FaTrash className='text-white w-5 h-5' />
                                                        <div className=' font-cantora text-white text-base'>Delete</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default AuctionItems;