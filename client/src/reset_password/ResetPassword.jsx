import React, { useState } from "react";
import HomeNav from "../components/HomePrimaryNav";
import Logo from "../assets/BidGalaxyLogo.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {message} from 'antd';


function ResetPassword () {

    document.title = "BidGalaxy | Reset Password";

    const [values, setValues] = useState({
        email_address : '',
    });

    const navigate = useNavigate();

    const handleResetPassword = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/reset_password/ResetPassword', values)
        .then(res => {
            if (res.data.Error === "No such email found") {
                message.error("This Email Address is not registered.");
            } else {
                message.success("Email Sent!");
                setTimeout(() => {
                    navigate('/reset_password/Confirmation');
                }, 1000);
            }
        })
        .catch(err => {
            console.log("Error :", err);
            message.error("An error occurred. Please try again.");
        });
      }
    return (
        <div className="wrapper">
            <HomeNav />
            <div className="w-[600px] mx-auto mt-20">
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-10 w-auto" src={Logo} alt="logo" />
                        <h2 class=" font-cantora mt-10 text-center text-3xl font-bold leading-9 tracking-wide text-gray-900">Recover Your Account</h2>
                        <p className=" mt-4 font-cantora">Enter Your Registered Email Address</p>
                    </div>
                    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" onSubmit={handleResetPassword}>
                            <div>
                                <label for="email_address" class="font-cantora tracking-wide block text-lg leading-6 text-gray-900">Email address</label>
                                <div class="mt-2">
                                <input id="email_address" name="email_address" type="email" onChange={e => setValues({...values, email_address : e.target.value})} autocomplete="email" required className=" font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-full bg-[#0F2D37] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2D37]">Send Mail</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;