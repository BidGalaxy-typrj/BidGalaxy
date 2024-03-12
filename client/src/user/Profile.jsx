import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { HiUser } from "react-icons/hi";




function Profile({ userId }) {
  document.title = "BidGalaxy | Profile";

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageName = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imageName, {
              type: "image/*",
              lastModified: Date.now(),
            });
            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const [userDetails, setuserDetails] = useState(null);
  console.log(userDetails);

  const fetchUserData = (userId) => {
    axios.get(`http://localhost:8081/user/user_details/${userId}`)
    .then((res) => {
      setuserDetails(res.data);
      console.log(userId);
    })
    .catch((error) => console.log(error));
  };

  const [values, setValues] = useState({
    first_name : '',
    middle_name: '',
    last_name: '',
    contact_number: '',
    gender: '',
    street_address1: '',
    street_address2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  return userDetails ? (
    <div className="w-full bg-primaryColor h-full">
      <div>
        <div className="flex justify-center w-full">
          <div
            className=" size-48 rounded-full bg-gray-500 border-red-700 cursor-pointer"
            onClick={handleImageClick}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                title="Profile Image"
                alt=""
                className="rounded-full w-full h-full overflow-hidden"
              />
            ) : (
              <HiUser className="w-full h-full p-5" title="Profile Image" />
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleImageChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col">
        <div className="flex w-full justify-center text-xl font-cantora textColor uppercase">
          <span>{`${userDetails.first_name || ''} ${userDetails.middle_name || ''} ${userDetails.last_name || ''}`.trim() || 'NA'}</span>
        </div>
        <div className="flex w-full justify-center text-xl font-cantora textColor">
          <span>{userDetails.email_address}</span>
        </div>
      </div>
      <form>
        <div className="w-full p-5">
          <div className="font-extrabold text-[24px] m-1 textColor font-cantora underline tracking-wide uppercase">
            Let's setup your profile
          </div>
          <div className="flex p-2 w-full justify-start items-start mb-3 mt-10">
            <div className="flex flex-col items-start p-2 w-1/3 ml-2">
              <label
                htmlFor="first_name"
                className="font-bold font-cantora required-highlight textColor ProfileSection_labels"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter First Name"
                className="textColor font-cantora mt-2"
                value={userDetails.first_name}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    first_name: e.target.value,
                  }))
                }
                required
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="middle_name"
                className="font-bold textColor font-cantora ProfileSection_labels"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                placeholder="Enter Second Name"
                className="textColor font-cantora mt-2"
                value={userDetails.middle_name}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    middle_name: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="last_name"
                className="font-bold required-highlight texxtColor font-cantora ProfileSection_labels"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter Last Name"
                className="textColor font-cantora mt-2"
                value={userDetails.last_name}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    last_name: e.target.value,
                  }))
                }
                required
              ></input>
            </div>
          </div>
          <div className="flex p-2 w-full justify-start mb-3">
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="contact_number"
                className="font-bold required-highlight font-cantora textColor ProfileSection_labels"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                placeholder="Enter Contact Number"
                className="textColor font-cantora mt-2"
                value={userDetails.contact_number}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    contact_number: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="email_id"
                className="font-bold required-highlight textColor font-cantora ProfileSection_labels"
              >
                Email Id
              </label>
              <input
                type="text"
                id="email_id"
                name="email_id"
                contentEditable="false"
                value={userDetails.email_address}
                className=" bg-gray-400 textColor font-cantora mt-2 hover:cursor-not-allowed"
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="gender"
                className="font-bold textColor font-cantora required-highlight ProfileSection_labels"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="textColor font-cantora mt-2"
                onChange={(e) =>
                  setValues((values) => ({ ...values, gender: e.target.value }))
                }
              >
                <option>Select Gender</option>
                <option value="male" selected={userDetails && userDetails.gender === 'male'}>
                  Male
                </option>
                <option value="female" selected={userDetails && userDetails.gender === 'female'}>
                  Female
                </option>
                <option value="other" selected={userDetails && userDetails.gender === 'other'}>
                  Other
                </option>
                <option
                  value="prefer not to say"
                  selected={userDetails && userDetails.gender === 'prefer not to say'}
                >
                  Prefer not to say
                </option>
              </select>
            </div>
          </div>
          <div className="flex p-2 w-full justify-between mb-3">
            <div className="flex flex-col p-2 w-1/2 ml-2">
              <label
                htmlFor="street_address1"
                className="font-bold required-highlight textColor font-cantora ProfileSection_labels"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="street_address1"
                name="street_address1"
                placeholder="Enter Address1"
                className="textColor font-cantora mt-2"
                value={userDetails.street_address1}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    street_address1: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/2 ml-2">
              <label
                htmlFor="street_address2"
                className="font-bold textColor required-highlight font-cantora ProfileSection_labels"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="street_address2"
                name="street_address2"
                placeholder="Enter Address2"
                className="textColor font-cantora mt-2"
                value={userDetails.street_address2}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    street_address2: e.target.value,
                  }))
                }
              ></input>
            </div>
          </div>
          <div className="flex p-2 w-full justify-between mb-3">
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="city"
                className="font-bold required-highlight font-cantora textColor ProfileSection_labels"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                className="textColor font-cantora mt-2"
                value={userDetails.city}
                onChange={(e) =>
                  setValues((values) => ({ ...values, city: e.target.value }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="state"
                className="font-bold required-highlight textColor font-cantora ProfileSection_labels"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter State"
                className="textColor font-cantora mt-2"
                value={userDetails.state}
                onChange={(e) =>
                  setValues((values) => ({ ...values, state: e.target.value }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="postal_code"
                className="font-bold font-cantora required-highlight textColor ProfileSection_labels"
              >
                Pincode
              </label>
              <input
                type="number"
                id="postal_code"
                name="postal_code"
                placeholder="Enter Postal Code"
                className="textColor font-cantora mt-2"
                value={userDetails.postal_code}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    postal_code: e.target.value,
                  }))
                }
              ></input>
            </div>
            <div className="flex flex-col p-2 w-1/3 ml-2">
              <label
                htmlFor="country"
                className="font-bold required-highlight textColor font-cantora ProfileSection_labels"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                className="textColor font-cantora mt-2"
                value={userDetails.country}
                onChange={(e) =>
                  setValues((values) => ({
                    ...values,
                    country: e.target.value,
                  }))
                }
              ></input>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <button
              type="submit"
              className="flex justify-center items-center w-[300px] h-[50px] bg-[#0F2D37] rounded-full"
            >
              <div className=" text-white text-2xl font-cantora font-bold uppercase">
                update profile
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
}

export default Profile;
