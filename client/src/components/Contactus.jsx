import React, { useState } from 'react';
import HomeNav from './HomePrimaryNav';
import Footer from './Footer';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


function Contactus() {

    document.title = "BidGalaxy | Contact";

    const [values, setValues] = useState({
      name : '',
      email_address : '',
      contact_number : '',
      description : ''
    });

    const handleDescriptionChange = (e) => {
      const enteredDescription = e.target.value;
      setValues(values => ({...values, description: enteredDescription}));
    };
    const remainingCharacters = 1000 - values.description.length;

    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8081/contact', values)
      .then((res) => {
        if (res.data.Status === "Success") {
          message.success("Query Sent Successfully to admin!");
          setTimeout(() => {
            navigate(-1);
        }, 1000);
        } else {
          message.error("There is a problem. Try again later!");
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          console.log("A",err.response.data); // Response data
          console.log("B",err.response.status); // HTTP status code
          console.log("C",err.response.headers); // Response headers
        } else if (err.request) {
          // The request was made but no response was received
          console.log("D",err.request); // Axios request instance
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message); // Error message
        }
        console.log("E",err.config); // Axios request config
        message.error("There is a problem from server-side. Try after sometimes!");
      });
    }


    return (
        <div className='wrapper'>
          <HomeNav />
          <div className='w-[1400px] mx-auto mb-10'>
              <div className=' bg-tabcolor rounded-xl mt-10'>
                <div className='p-8'>
                  <h1 className='font-bold font-cantora text-4xl textColor text-center pb-2 '>Contact Us</h1> 
                  <p>If you are facing any issue dont't hesisate to Contact us. We are always ready to help you.</p>
                </div>
              </div>
              <div className='flex flex-row justify-between items-center mt-3 gap-5'>
                <div className='w-2/3 ring-2 ring-tabcolor rounded-xl'>
                  <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center items-center w-[500px] mx-auto'>
                      <div className='w-full'>
                        <label htmlFor='name' className='text-base uppercase textColor tracking-wide required-highlight font-cantora'>Name</label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          className='font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2'
                          placeholder='Enter Name'
                          onChange={e => setValues({...values, name : e.target.value})}
                          required
                        />
                      </div>
                      <div className='w-full'>
                        <label htmlFor='email_address' className='text-base uppercase textColor tracking-wide required-highlight font-cantora'>Email Address</label>
                        <input
                          type='email'
                          id='email_address'
                          name='email_address'
                          className='font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2'
                          placeholder='Enter Email'
                          onChange={e => setValues({...values, email_address : e.target.value})}
                          required
                        />
                      </div>
                      <div className='w-full'>
                        <label htmlFor='contact_number' className='text-base uppercase textColor tracking-wide required-highlight font-cantora'>Contact Number</label>
                        <input
                          type='tel'
                          id='contact_number'
                          name='contact_number'
                          className='font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2'
                          placeholder='Enter Contact'
                          onChange={e => setValues({...values, contact_number : e.target.value})}
                          required
                        />
                      </div>
                      <div className='w-full mb-4'>
                        <label htmlFor="description" className=" text-base uppercase textColor tracking-wide required-highlight font-cantora">description</label>
                        <textarea
                            id='description'
                            name='description'
                            className='font-cantora block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0F2D37] sm:text-sm sm:leading-6 pl-2 textarea_style'
                            maxLength={1000}
                            rows={5}
                            onChange={handleDescriptionChange}
                            placeholder="About your query(Maximum 1000 letters)">
                        </textarea>
                        <div className="textColor text-sm font-cantora text-right">{remainingCharacters}/1000</div>
                      </div>
                      <div className='w-full mb-4'>
                        <button type="submit" className=' flex w-full justify-center rounded-full bg-[#0F2D37] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2D37]'>
                            <div className=' text-white text-2xl font-cantora font-bold uppercase'>
                                Submit
                            </div>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className='w-1/2 ring-2 bg-tabcolor rounded-xl h-[38.2rem]'>
                  <div className='my-28'>
                    <div className='font-cantora textColor text-3xl font-extrabold text-center p-8'>Our Contact</div>
                    <div className='flex flex-col justify-center items-start gap-3 p-8'>
                      <div className='text-base text-gray-600 font-cantora mb-5'>
                        Floor 1,SIES College of Arts, Science and Commerce ,Jain Society ,Sion West, Mumbai-400022
                      </div>
                      <div className='text-base text-gray-600 font-cantora mb-5 float-start'>
                        Ph : 1234567890
                      </div>
                      <div className='text-base text-gray-600 font-cantora mb-5 text-start'>
                        Email : bidgalaxy.official@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <Footer />
        </div>
    );
}

export default Contactus;
