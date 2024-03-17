import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomeNav from "../components/HomePrimaryNav";
import axios from "axios";
import { IoInformationCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";




function Bidders () {

    document.title = "BidGalaxy | BidingList";

    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetchProducts();
    });

    const fetchProducts = () => {
        axios.get('http://localhost:8081/admin/bidding_list')
            .then((res) => {
                // const products = res.data;
                const productIds = res.data.map(product => product.productId);
                // const userIds = products.map(product => product.users);
                // console.log(productIds);
                fetchProductDetails(productIds);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    };

    const fetchProductDetails = (productIds) => {
        axios.post('http://localhost:8081/admin/bidItemDetails', { productIds })
            .then((res) => {
                setProductDetails(res.data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
                // Handle error
            });
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const navigate = useNavigate();

    const handleDetailsClick = (product) => {
        // Redirect to another page and pass product details and user IDs as state
        navigate('/admin/BiddingDetails', {state: {product} });
    };

    return (
        <div className="wrapper">
            <HomeNav />
            <section className="w-[1400px] mx-auto mb-60">
                <div className="flex flex-row justify-between items-center mt-10">
                    <div className="text-[24px] font-extrabold textColor uppercase underline tracking font-cantora">
                        bidding list
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
                                        {productDetails.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className={classNames(
                                                    index !== productDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium font-cantora text-center textColor sm:pl-6 lg:pl-8'
                                                )}>
                                                    {index + 1}
                                                </td>
                                                <td className={classNames(
                                                    index !== productDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora text-center hidden sm:table-cell'
                                                )}>
                                                    {item.title}
                                                </td>
                                                <td className={classNames(
                                                    index !== productDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora hidden text-center lg:table-cell'
                                                )}>
                                                    {item.type}
                                                </td>
                                                <td className={classNames(
                                                    index !== productDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <div className=' mx-auto flex flex-row justify-center items-center bg-[#0F2D37] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32' onClick={() => handleDetailsClick(item)}>
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

export default Bidders;