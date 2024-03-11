import axios from "axios";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import HomeNav from "../components/HomePrimaryNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";




function AuctionedItems () {

    document.title = "BidGalaxy | AuctionedItems";

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchAuctionedItems();
    }, []);

    const fetchAuctionedItems = () => {
        axios.get('http://localhost:8081/admin/AuctionedItems')
            .then((res) => {
                // console.log('Fetched Products:', res.data);
                setItems(res.data);
            })
            .catch((err) => console.log(err));
        };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const navigate = useNavigate();

    function handleAuctionedItemDetailsClick(itemId) {
        navigate(`/admin/AuctionedItemDetails?q=${itemId}`);
    }
    return (
        <div>
            <HomeNav />
            <section className="w-[1400px] mx-auto mt-[63px] mb-72">
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
                                                    <div onClick={() => handleAuctionedItemDetailsClick(item.id)} className=' mx-auto flex flex-row justify-center items-center bg-[#0F2D37] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                        <IoInformationCircle className='text-white w-5 h-5' />
                                                        <div className=' font-cantora text-white text-base'>Details</div>
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

export default AuctionedItems;