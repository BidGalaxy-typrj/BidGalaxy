import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../assets/auctionItemImages/mentor_profile_demo.png';
import queryString from 'query-string';
import HomeNav from '../components/HomePrimaryNav';



function UserDetails () {

    document.title = "BidGalaxy | UserDetails";

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Parse the query string to get the user ID
        const { q: userId } = queryString.parse(window.location.search);

        // Fetch user details using the user ID
        fetchUserDetails(userId);
    }, []);

    const fetchUserDetails = (userId) => {
        // Make API call to fetch user details based on the user ID
        axios.get(`http://localhost:8081/admin/UserDetails/${userId}`)
            .then((res) => {
                // console.log('Fetched User Details:', res.data);
                setUserDetails(res.data);
            })
            .catch((err) => console.log(err));
    };
    return userDetails ? (
        <div>
            <HomeNav />
            <section className="w-[1400px] mx-auto">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] ">
                    user details
                </div>
                <div className="mt-14 w-[1100px] mx-auto flex flex-row justify-between items-center gap-5">
                    <div className="flex flex-col justify-center items-center gap-5 admin_user_details_card rounded-xl">
                        <div className="w-[160px] h-[160px] admin_user_details_image_holder rounded-full mt-14 mx-[4.5rem]">
                            <img className="p-1" src={profile} alt="profile" />
                        </div>
                        <div className="flex flex-col gap-3 items-center justify-center mb-14 mx-20 ">
                            <div className="textColor font-cantora text-xl uppercase">
                                {`${userDetails.first_name || ''} ${userDetails.middle_name || ''} ${userDetails.last_name || ''}`.trim() || 'NA'}
                            </div>
                            <div className="textColor font-cantora text-base">
                                {userDetails.email_address || 'NA'}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 flex flex-col justify-center gap-[56px] admin_user_details_card rounded-xl">
                        <div className='mx-14 mt-14'>
                            <div className="text-[20px] font-extrabold textColor uppercase underline tracking-tighter font-cantora ">
                                basic details
                            </div>
                            <div className='flex flex-row gap-[100px] mt-[20px]'>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>NAME</div>
                                    <div className='textColor text-[14px] font-cantora uppercase'>
                                        {`${userDetails.first_name || ''} ${userDetails.middle_name || ''} ${userDetails.last_name || ''}`.trim() || 'NA'}
                                    </div>
                                </div>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>EMAIL</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {userDetails.email_address || 'NA'}
                                    </div>
                                </div>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>CONTACT</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {userDetails.contact_number || 'NA'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-14 mb-14'>
                            <div className="text-[20px] font-extrabold textColor uppercase underline tracking-tighter font-cantora ">
                                address details
                            </div>
                            <div className='flex flex-row gap-[100px] mt-[20px]'>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>STREET</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {`${userDetails.street_address1 || ''} ${userDetails.street_address2 || ''}`.trim() || 'NA'}
                                    </div>
                                </div>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>CITY</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {userDetails.city || 'NA'}
                                    </div>
                                </div>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>STATE</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {userDetails.state || 'NA'}
                                    </div>
                                </div>
                                <div>
                                    <div className='textColor text-[15px] font-cantora font-bold'>POSTAL CODE</div>
                                    <div className='textColor text-[14px] font-cantora'>
                                        {userDetails.postal_code || 'NA'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : null;
}

export default UserDetails;