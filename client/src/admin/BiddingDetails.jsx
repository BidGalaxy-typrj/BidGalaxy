import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HomeNav from '../components/HomePrimaryNav';
import Footer from '../components/Footer';
import { MdOutgoingMail } from "react-icons/md";
import {message} from 'antd';
import { FaCircleCheck } from "react-icons/fa6";



function BiddingDetails () {

  document.title = "BidGalaxy | BiddingDetails";

    const location = useLocation();
    const product = location.state?.product;

    const [userIds, setUserIds] = useState([]);
    const [userDetails, setUserDetails] = useState("");

    useEffect(() => {
      if (product) {
          fetchUserIds(product.id);
      }
    }, [product]);

    const fetchUserIds = (productId) => {
      axios.get(`http://localhost:8081/admin/bidItemDetails/users/${productId}`)
          .then((res) => {
              const fetchedUserIds = res.data; 
              setUserIds(fetchedUserIds);
          })
          .catch((error) => {
              console.error('Error fetching user IDs:', error);
          });
    };

    useEffect(() => {
      if (userIds.length > 0) {
        fetchUserDetails(userIds);
      }
    }, [userIds]);

    const fetchUserDetails = (userIds) => {
      axios.post('http://localhost:8081/admin/bidUserDetails', { userIds })
          .then((res) => {
              setUserDetails(res.data);
          })
          .catch((error) => {
              console.error('Error fetching user details:', error);
              // Handle error
          });
    };
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ');
    }

    const [link, setLink] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [mailSentStatus, setMailSentStatus] = useState({});

    const sendMail = (email_address, first_name) => {
      axios.post('http://localhost:8081/admin/sendMail', {
        email_address,
        first_name,
        link,
        productName: product.title,
        artistName: product.artist_name,
      })
      .then(res => {
        // Handle success (e.g., close modal, show success message)
        console.log('Mail sent successfully:', res.data);
        setSelectedUser(null);
        message.success(`Email sent Successfully to ${first_name}!`);
      })
      .catch(error => {
        // Handle error (e.g., show error message)
        console.error('Error sending mail:', error);
      });
    };

    const handleSendMailClick = (user) => {
      // Set the selected user
      setSelectedUser(user);
      // Show modal or perform any other action
      setShowModal(true);
  };

  const handleConfirmClick = () => {
      if (!link.trim()) {
        // If the link is empty or contains only whitespace
        message.error("Please provide a link!");
        return;
      }
      // Send mail with the link
      if (selectedUser) {
          sendMail(selectedUser.email_address, selectedUser.first_name);
          setMailSentStatus(prevState => ({
            ...prevState,
            [selectedUser.user_id]: true // Update mail sent status for the selected user
        }));
      }
      setShowModal(false);
  };

  return userDetails ? (
    <div className='wrapper'>
        <HomeNav />
          <section className="w-[1400px] mx-auto mb-60">
                {showModal && (
                  <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden absolute top-10 z-50 justify-center items-center w-full mx-auto md:inset-0 h-[calc(100%-1rem)]">
                    <div class="relative mx-auto p-4 w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Send Meeting Link
                                </h3>
                                <button onClick={() => setShowModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div class="p-4 md:p-5 space-y-2">
                                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className='dark:bg-gray-700 font-cantora dark:text-white' placeholder='Enter meeting link' required />
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleConfirmClick} data-modal-hide="static-modal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
                                <button onClick={() => setShowModal(false)} data-modal-hide="static-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-600 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-800">Decline</button>
                            </div>
                        </div>
                    </div>
                  </div>
                )}
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
                                                Name
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 hidden border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter lg:table-cell">
                                                Email Address
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 hidden border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter lg:table-cell">
                                                Status
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Send Mail
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#C9EDED]">
                                        {userDetails.map((user, index) => (
                                            <tr key={user.user_id}>
                                                <td className={classNames(
                                                    index !== userDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium font-cantora text-center textColor sm:pl-6 lg:pl-8'
                                                )}>
                                                    {index + 1}
                                                </td>
                                                <td className={classNames(
                                                    index !== userDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora text-center hidden sm:table-cell'
                                                )}>
                                                    {`${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}`.trim() || 'NA'}
                                                </td>
                                                <td className={classNames(
                                                    index !== userDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora hidden text-center lg:table-cell'
                                                )}>
                                                    {user.email_address}
                                                </td>
                                                <td className={classNames(
                                                    index !== userDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora hidden text-center lg:table-cell'
                                                )}>
                                                  <FaCircleCheck 
                                                      className={`w-5 h-5 
                                                          ${selectedUser && selectedUser.user_id === user.user_id ? 'text-blue-500' : ''} 
                                                          ${mailSentStatus[user.user_id] ? 'text-green-600' : 'text-gray-500'} 
                                                          mx-auto`} 
                                                  />
                                                </td>
                                                <td className={classNames(
                                                    index !== userDetails.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <button data-modal-target="static-modal" data-modal-toggle="static-modal" className=' mx-auto flex flex-row justify-center items-center bg-[#0F2D37] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-28' onClick={() => handleSendMailClick(user)}>
                                                        <MdOutgoingMail className='text-white w-5 h-5' />
                                                        <div className=' font-cantora text-white text-base'>Send</div>
                                                    </button>
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
  ) : null;
}


export default BiddingDetails;