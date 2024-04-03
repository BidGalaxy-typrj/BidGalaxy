import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import HomeNav from "../components/HomePrimaryNav";
import Logo from "../assets/BidGalaxyLogo.png"



function ChangePassword () {

    document.title = "BidGalaxy | Change Password";

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const {r : userId} = queryString.parse(window.location.search); 
        setUserId(userId);
    }, [userId]);

    const [values, setValues] = useState({
        new_password : '',
        conf_password : ''
      });

    const navigate = useNavigate();

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (values.new_password !== values.conf_password) {
            message.error("New password and confirm password do not match!");
            return;
        }
        axios.put(`http://localhost:8081/reset_password/ChangePassword/${userId}`, values)
        .then((res) => {
            if (res.data.Status === "Success") {
                message.success("Password changed successfully!");
                setTimeout(() => {
                    navigate('/signin/index');
                }, 1000);
            } else {
                message.error("There is some error while updating the password. Plese try again after some time!");
            }
        })
        .catch((err) => {
            console.log("Error : ",err);
        });
    }
    return (
        <div className="wrapper">
            <HomeNav />
            <div className="w-[600px] mx-auto mt-20">
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-10 w-auto" src={Logo} alt="logo" />
                        <h2 class=" font-cantora mt-10 text-center text-3xl font-bold leading-9 tracking-wide text-gray-900">Change Password</h2>
                    </div>
                    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" onSubmit={handleChangePassword}>
                            <div>
                                <label for="new_password" class="font-cantora tracking-wide block text-lg leading-6 text-gray-900">New Password</label>
                                <div class="mt-2">
                                <input id="new_password" name="new_password" type="password" onChange={e => setValues({...values, new_password : e.target.value})} required class=" font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2" placeholder="Enter New Password" />
                                </div>
                            </div>
                            <div>
                                <label for="conf_password" class="font-cantora tracking-wide block text-lg leading-6 text-gray-900">Confirm Password</label>
                                <div class="mt-2">
                                <input id="conf_password" name="conf_password" type="password" onChange={e => setValues({...values, conf_password : e.target.value})} required class=" font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2" placeholder="Enter Confirm Password" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-full bg-[#0F2D37] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2D37]">Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;