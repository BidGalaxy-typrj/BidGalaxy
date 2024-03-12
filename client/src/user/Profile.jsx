import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


const Profile = () => {

    document.title = "BidGalaxy | Profile";

    const inputRef = useRef(null)
    const [image,setImage] = useState("");

    const handleImageClick = () =>{
        inputRef.current.click();
    }

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        const imageName = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            const img = new Image();
            img.src = reader.result;
            img.onload = ()=>{
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width,img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img,(maxSize-img.width)/2,(maxSize-img.height)/2);
                canvas.toBlob(
                    (blob)=>{
                    const file = new File([blob],imageName,{
                        type: "image/*",
                        lastModified : Date.now()
                    });
                    console.log(file);
                    setImage(file);
                },
                "image/jpeg",0.8
                );
            };
        }
    }

    return (
        <div className="w-full bg-primaryColor h-full">
            <div>
                <div className="flex justify-center w-full">
                    <div className=" size-48 rounded-full bg-gray-500 border-red-700 cursor-pointer" onClick={handleImageClick}>
                        {image ? 
                            <img src={URL.createObjectURL(image)} title="Profile Image" alt ='' className="rounded-full w-full h-full overflow-hidden"/>
                        :
                            <HiUser className="w-full h-full p-5" title="Profile Image"/>
                        }
                        <input type="file" ref={inputRef} className="hidden" onChange={handleImageChange}></input>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col">
                <div className="flex w-full justify-center text-xl font-cantora textColor uppercase"><span>{"name"}</span></div>
                <div className="flex w-full justify-center text-xl font-cantora textColor"><span>{"email"}</span></div>
            </div>
            <form>
                <div className="w-full p-5">
                    <div className="font-extrabold text-[24px] m-1 textColor font-cantora underline tracking-tighter uppercase">Profile Settings</div>
                    <div className="flex p-2 w-full justify-start items-start">
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="first_name" className="font-bold font-cantora required-highlight textColor">First Name</label>
                            <input type="text" id="first_name" name="first_name" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="middle_name" className="font-bold textColor font-cantora">Middle Name</label>
                            <input type="text" id="middle_name" name="middle_name" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="last_name" className="font-bold required-highlight texxtColor font-cantora">Last Name</label>
                            <input type="text" id="last_name" name="last_name" className="textColor font-cantora mt-2"></input>
                        </div>
                    </div>
                    <div className="flex p-2 w-full justify-start">
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="contact_number" className="font-bold required-highlight font-cantora textColor">Contact Number</label>
                            <input type="text" id="contact_number" name="contact_number" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="email_id" className="font-bold required-highlight textColor font-cantora">Email Id</label>
                            <input type="text" id="email_id" name="email_id" contentEditable="false" value={""} className=" bg-gray-400 textColor font-cantora mt-2 hover:cursor-not-allowed"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="gender" className="font-bold textColor font-cantora required-highlight">Gender</label>
                            <select id="gender" name="gender" className="textColor font-cantora mt-2">
                                <option>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex p-2 w-full justify-between">
                        <div className="flex flex-col p-2 w-1/2 ml-2">
                            <label htmlFor="street_address1" className="font-bold required-highlight textColor font-cantora">Address Line 1</label>
                            <input type="text" id="street_address1" name="street_address1" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/2 ml-2">
                            <label htmlFor="street_address2" className="font-bold textColor required-highlight font-cantora">Address Line 2</label>
                            <input type="text" id="street_address2" name="street_address2" className="textColor font-cantora mt-2"></input>
                        </div>
                    </div>
                    <div className="flex p-2 w-full justify-between">
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="city" className="font-bold required-highlight font-cantora textColor">City</label>
                            <input type="text" id="city" name="city" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="state" className="font-bold required-highlight textColor font-cantora">State</label>
                            <input type="text" id="state" name="state" className="textColor font-cantora mt-2"></input>
                        </div>
                        <div className="flex flex-col p-2 w-1/3 ml-2">
                            <label htmlFor="postal_code" className="font-bold font-cantora required-highlight textColor">Pincode</label>
                            <input type="number" id="postal_code" name="postal_code" className="textColor font-cantora mt-2"></input>
                        </div>
                    </div>
                    <div className="flex justify-center mt-20">
                        <button type="submit" className="flex justify-center items-center w-[300px] h-[50px] bg-[#0F2D37] rounded-full">
                            <div className=' text-white text-2xl font-cantora font-bold uppercase'>
                                update profile
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Profile;
