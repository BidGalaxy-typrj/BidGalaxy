import { useEffect, useState } from "react";
import SuccessAlert from "./SuccessAlert";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";



function ProfileSection() {

    const [email, setEmail] = useState(null);
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Parse the query string to get the user ID
        const { r: id } = queryString.parse(window.location.search);
        setUserId(id);
        // Fetch user details using the user ID
        fetchItemDetails(id);
    }, []);

    const fetchItemDetails = (id) => {
        // Make API call to fetch user details based on the user ID
        axios
        .get(`http://localhost:8081/admin/UserDetails/${id}`)
        .then((res) => {
            setEmail(res.data.email_address);
        })
        .catch((err) => console.log(err));
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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
            contact_number: values.contact_number,
            gender: values.gender,
            street_address1: values.street_address1,
            street_address2: values.street_address2,
            city: values.city,
            state: values.state,
            postal_code: values.postal_code,
            country: values.country
        };
    
        axios.put(`http://localhost:8081/user/Profile/${userId}`, formData)
        .then((res) => {
            navigate('/signup/Success');
        })
        .catch((error) => console.log(error));
    }

  return (
    <div className="wrapper">
        <SuccessAlert />
      <form onSubmit={handleSubmit}>
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
                onChange={e => setValues(values => ({...values, first_name: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, middle_name: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, last_name: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, contact_number: e.target.value}))}
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
                value={email}
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
                onChange={e => setValues(values => ({...values, gender: e.target.value}))}
              >
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer not to say">Prefer not to say</option>
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
                onChange={e => setValues(values => ({...values, street_address1: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, street_address2: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, city: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, state: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, postal_code: e.target.value}))}
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
                onChange={e => setValues(values => ({...values, country: e.target.value}))}
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
    
  );
}

export default ProfileSection;
