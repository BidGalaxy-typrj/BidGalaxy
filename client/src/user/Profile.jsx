import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { HiUser } from "react-icons/hi";
import {message} from 'antd';



function Profile({ userId }) {
  document.title = "BidGalaxy | Profile";

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        alert('Please select a JPEG or PNG image file.');
        event.target.value = '';
        return;
    }
    if (file.size > 500 * 1024 ) { 
        alert('File size exceeds the limit of 500KB.');
        event.target.value = '';
        return;
    }

    const imageName = file.name;
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

                    setImage(file);
                    // Update state with the validated image file
                    setValues(prevValues => ({
                        ...prevValues,
                        profile_url: file
                    }));
                },
                "image/jpeg",
                0.8
            );
        };
    };
  };

  const [userDetails, setUserDetails] = useState(null);
  const [values, setValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    contact_number: '',
    profile_url: '',
    gender: '',
    street_address1: '',
    street_address2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = (userId) => {
    axios.get(`http://localhost:8081/user/user_details/${userId}`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => console.log(error));
  };

  // Update values state when userDetails changes
  useEffect(() => {
    if (userDetails) {
      setValues({
        first_name: userDetails.first_name || '',
        middle_name: userDetails.middle_name || '',
        last_name: userDetails.last_name || '',
        contact_number: userDetails.contact_number || '',
        profile_url: userDetails.profile_url || '',
        gender: userDetails.gender || '',
        street_address1: userDetails.street_address1 || '',
        street_address2: userDetails.street_address2 || '',
        city: userDetails.city || '',
        state: userDetails.state || '',
        postal_code: userDetails.postal_code || '',
        country: userDetails.country || ''
      });
    }
  }, [userDetails]);

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('profile_url', values.profile_url);
  formData.append('first_name', values.first_name);
  formData.append('middle_name', values.middle_name);
  formData.append('last_name', values.last_name);
  formData.append('contact_number', values.contact_number);
  formData.append('gender', values.gender);
  formData.append('street_address1', values.street_address1);
  formData.append('street_address2', values.street_address2);
  formData.append('city', values.city);
  formData.append('state', values.state);
  formData.append('postal_code', values.postal_code);
  formData.append('country', values.country);

  axios.put(`http://localhost:8081/user/user_profile/${userId}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  })
  .then((res) => {
    message.success("Profile Updated Successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  })
  .catch((error) => console.log(error));
};

let profileImage = null;
  if (userDetails && userDetails.profile_url) {
    let profile = userDetails.profile_url;
    profileImage = profile
      .replace(/\\/g, '/')  // Convert single backslashes to forward slashes
      .replace(/^\.\.\/client\/src\//, '');
  }

  return userDetails ? (
    <div className="w-full bg-primaryColor h-full">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex justify-center w-full">
            <div
              className=" size-48 rounded-full bg-gray-500 border-red-700 cursor-pointer"
              onClick={handleImageClick}
            >
              {profileImage ? (
                  <img
                    src={require(`../${profileImage}`)}
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
                id="profile_url"
                name="profile_url"
                className="hidden"
                accept="image/*"
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
                value={values.first_name}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    first_name: e.target.value
                  }))
                }
                required
              />
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
                value={values.middle_name}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
                value={values.last_name}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    last_name: e.target.value,
                  }))
                }
                required
              />
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
                value={values.contact_number}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
                  setValues((prevValues) => ({ ...prevValues, gender: e.target.value }))
                }
              >
                <option>Select Gender</option>
                <option value="male" selected={values && values.gender === 'male'}>
                  Male
                </option>
                <option value="female" selected={values && values.gender === 'female'}>
                  Female
                </option>
                <option value="other" selected={values && values.gender === 'other'}>
                  Other
                </option>
                <option
                  value="prefer not to say"
                  selected={values && values.gender === 'prefer not to say'}
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
                value={values.street_address1}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
                value={values.street_address2}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
                value={values.city}
                onChange={(e) =>
                  setValues((prevValues) => ({ ...prevValues, city: e.target.value }))
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
                value={values.state}
                onChange={(e) =>
                  setValues((prevValues) => ({ ...prevValues, state: e.target.value }))
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
                value={values.postal_code}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
                value={values.country}
                onChange={(e) =>
                  setValues((prevValues) => ({
                    ...prevValues,
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
