import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoInformationCircle } from "react-icons/io5";
import HomeNav from '../components/HomePrimaryNav';

function Users() {

    document.title = "BidGalaxy | Users"
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8081/admin/Users')
            .then((res) => {
                // console.log('Fetched Users:', res.data);
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
        };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div>
            <HomeNav />
            <div className="w-[1400px] mx-auto">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] ">
                    user list
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
                                                Email
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 hidden border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter lg:table-cell">
                                                Username
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Role
                                            </th>
                                            <th scope="col" className="sticky top-0 z-10 border-b-2 border-[#14CFFC] px-3 py-3.5 text-center text-sm font-semibold textColor backdrop-blur backdrop-filter">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#C9EDED]">
                                        {users.map((user, index) => (
                                            <tr key={user.user_id}>
                                                <td className={classNames(
                                                    index !== users.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium font-cantora text-center textColor sm:pl-6 lg:pl-8'
                                                )}>
                                                    {index + 1}
                                                </td>
                                                <td className={classNames(
                                                    index !== users.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora text-center hidden sm:table-cell'
                                                )}>
                                                    {user.email_address}
                                                </td>
                                                <td className={classNames(
                                                    index !== users.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora hidden text-center lg:table-cell'
                                                )}>
                                                    {user.username}
                                                </td>
                                                <td className={classNames(
                                                    index !== users.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor font-cantora text-center'
                                                )}>
                                                    {user.role}
                                                </td>
                                                <td className={classNames(
                                                    index !== users.length - 1 ? 'border-b-2 border-[#14CFFC]' : '',
                                                    'whitespace-nowrap px-3 py-4 text-lg textColor' 
                                                )}>
                                                    <a href={`/admin/UserDetails?q=${user.user_id}`} className=' mx-auto flex flex-row justify-center items-center bg-[#0F2D37] hover:scale-[1.05] transition-all ease-in-out rounded-full gap-2 py-[0.3rem] cursor-pointer w-32'>
                                                        <IoInformationCircle className='text-white w-5 h-5' />
                                                        <div className=' font-cantora text-white text-base'>Details</div>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
