import React, { useState } from 'react'
import HomeNav from "../components/HomePrimaryNav";
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function PlaceItem () {

    document.title = "BidGalaxy | PlaceItem";

    const [values, setValues] = useState({
        title: '',
        type: '',
        description: '',
        auctioneer_name: '',
        auctioneer_contact: '',
        price: '',
        auction_date: '',
        auction_time: '',
        artist_name: '',
        artist_short_description: '',
        artist_long_description: '',
        artist_profile_url: null,
        product_image1: null,
        product_image2: null,
        product_image3: null,
        product_image4: null
    });

    const navigate = useNavigate();

    const handleItemFileChange1 = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please select a JPEG or PNG image file.');
            e.target.value = '';
            return;
        }
        if (file.size > 500 * 1024 ) { 
            alert('File size exceeds the limit of 500KB.');
            e.target.value = '';
            return;
        }
        setValues(prevValues => ({
            ...prevValues,
            product_image1: file
        }));
    };
    const handleItemFileChange2 = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please select a JPEG or PNG image file.');
            e.target.value = '';
            return;
        }
        if (file.size > 500 * 1024 ) { 
            alert('File size exceeds the limit of 500KB.');
            e.target.value = '';
            return;
        }
        setValues(prevValues => ({
            ...prevValues,
            product_image2: file
        }));
    };
    const handleItemFileChange3 = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please select a JPEG or PNG image file.');
            e.target.value = '';
            return;
        }
        if (file.size > 500 * 1024 ) { 
            alert('File size exceeds the limit of 500KB.');
            e.target.value = '';
            return;
        }
        setValues(prevValues => ({
            ...prevValues,
            product_image3: file
        }));
    };
    const handleItemFileChange4 = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please select a JPEG or PNG image file.');
            e.target.value = '';
            return;
        }
        if (file.size > 500 * 1024 ) { 
            alert('File size exceeds the limit of 500KB.');
            e.target.value = '';
            return;
        }
        setValues(prevValues => ({
            ...prevValues,
            product_image4: file
        }));
    };
    const handleArtistProfileChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            alert('Please select a JPEG or PNG image file.');
            e.target.value = '';
            return;
        }
        if (file.size > 500 * 1024 ) { 
            alert('File size exceeds the limit of 500KB.');
            e.target.value = '';
            return;
        }
        setValues(prevValues => ({
            ...prevValues,
            artist_profile_url: file
        }));
    };

    const [showMinimumPriceText, setShowMinimumPriceText] = useState(false);

    const handlePriceChange = (e) => {
        const enteredPrice = parseInt(e.target.value);
        setShowMinimumPriceText(enteredPrice < 100);
        setValues(values => ({...values, price: e.target.value}));
    };

    const [validEmail, setValidEmail] = useState(true);

    const handleAuctioneerContactChange = (e) => {
        const enteredEmail = e.target.value;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
        setValidEmail(enteredEmail === '' || isValidEmail);
        setValues(values => ({...values, auctioneer_contact: enteredEmail}));
    };

    const handleDescriptionChange = (e) => {
        const enteredDescription = e.target.value;
        setValues(values => ({...values, description: enteredDescription}));
    };

    const remainingCharacters = 1000 - values.description.length;

    const handleArtistLongDescriptionChange = (e) => {
        const enteredDescription = e.target.value;
        setValues(values => ({...values, artist_long_description: enteredDescription}));
    };

    const longRemainingCharacters = 1000 - values.artist_long_description.length;

    const handleArtistShortDescriptionChange = (e) => {
        const enteredDescription = e.target.value;
        setValues(values => ({...values, artist_short_description: enteredDescription}));
    };

    const shortRemainingCharacters = 50 - values.artist_short_description.length;

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('type', values.type);
        formData.append('description', values.description);
        formData.append('auctioneer_name', values.auctioneer_name);
        formData.append('auctioneer_contact', values.auctioneer_contact);
        formData.append('price', values.price);
        formData.append('auction_date', values.auction_date);
        formData.append('auction_time', values.auction_time);
        formData.append('artist_name', values.artist_name);
        formData.append('artist_short_description', values.artist_short_description);
        formData.append('artist_long_description', values.artist_long_description);
        formData.append('artist_profile_url', values.artist_profile_url);
        formData.append('product_image1', values.product_image1);
        formData.append('product_image2', values.product_image2);
        formData.append('product_image3', values.product_image3);
        formData.append('product_image4', values.product_image4);

        axios.post('http://localhost:8081/admin/PlaceItem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // Handling the response from the backend
                if (res.data.success) {
                    alert('Product for Auction Added Successfully!');
                    navigate('/admin/SideBar');
                } else {
                    alert('Error while submitting the data.');
                    console.error('Failed to submit form data:', res.data.error);
                }
            })
            .catch(err => {
                console.error('Error submitting form data:', err.message);
            });
    };
    return(
        <div className="wrapper">
            <HomeNav />
            <div className="w-[1400px] mx-auto">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] ">
                    Place an item for bid
                </div>
                <div className="w-3/4 mx-auto">
                    <div className="mt-[40px]">
                        <form onSubmit={handleSubmit}>
                            <div className=" uppercase textColor text-lg font-bold font-cantora underline">about item</div>
                            <div className="flex flex-row justify-between gap-12">
                                <div className="flex-auto">
                                    <label htmlFor="title" className=" text-base uppercase textColor tracking-wide required-highlight">title</label>
                                    <input 
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter Item Name"
                                        onChange={e => setValues(values => ({...values, title: e.target.value}))}
                                        required 
                                    />
                                </div>
                                <div className='shrink w-64'>
                                    <label htmlFor="type" className=" text-base uppercase textColor tracking-wide required-highlight">category</label>
                                    <select 
                                        id="type"
                                        name="type"
                                        onChange={e => setValues(values => ({...values, type: e.target.value}))}
                                        required>
                                        <option value="" className=' font-cantora textColor'>Select Your Category</option>
                                        <option value="art" className=' font-cantora textColor'>Art</option>
                                        <option value="artifact" className='font-cantora textColor'>Artifact</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-auto'>
                                    <label htmlFor="description" className=" text-base uppercase textColor tracking-wide required-highlight">item details</label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        className='w-full textarea_style'
                                        maxLength={1000}
                                        rows={5}
                                        onChange={handleDescriptionChange}
                                        placeholder="Item Details(Maximum 1000 letters)">
                                    </textarea>
                                    <div className="textColor text-sm font-cantora text-right">{remainingCharacters}/1000</div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-12">
                                <div className="flex-auto">
                                    <label htmlFor="auctioneer_name" className=" text-base uppercase textColor tracking-wide required-highlight">Auctioneer name</label>
                                    <input 
                                        type="text"
                                        id="auctioneer_name"
                                        name="auctioneer_name"
                                        placeholder="Enter Auctioneer Name"
                                        onChange={e => setValues(values => ({...values, auctioneer_name: e.target.value}))}
                                        required 
                                    />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="auctioneer_contact" className=" text-base uppercase textColor tracking-wide required-highlight">auctioneer contact</label>
                                    <input 
                                        type="email"
                                        id="auctioneer_contact"
                                        name="auctioneer_contact"
                                        onChange={handleAuctioneerContactChange}
                                        placeholder="Auctioneer Email"
                                        required 
                                    />
                                    {!validEmail && <div className="text-red-500 text-left font-cantora">Enter a valid email.</div>}
                                </div>
                                <div className="shrink w-64">
                                    <label htmlFor="price" className=" text-base uppercase textColor tracking-wide required-highlight">Starting Bid</label>
                                    <input 
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Enter Starting Bid"
                                        value={values.price}
                                        onChange={handlePriceChange}
                                        required 
                                    />
                                    {showMinimumPriceText && <div className="text-red-500 font-cantora">Minimum price should be 100.</div>}
                                </div>
                            </div>
                            <div className='flex flex-row gap-12'>
                                <div className="shrink w-64">
                                    <label htmlFor="auction_date" className=" text-base uppercase textColor tracking-wide required-highlight">Auction Date</label>
                                    <input 
                                        type="date"
                                        id="auction_date"
                                        name="auction_date"
                                        onChange={e => setValues(values => ({...values, auction_date: e.target.value}))}
                                        placeholder="Choose Auction Date"
                                        required 
                                    />
                                </div>
                                <div className="shrink w-64">
                                    <label htmlFor="auction_time" className=" text-base uppercase textColor tracking-wide required-highlight">Auction Time</label>
                                    <input 
                                        type="time"
                                        id="auction_time"
                                        name="auction_time"
                                        onChange={e => setValues(values => ({...values, auction_time: e.target.value}))}
                                        placeholder="Choose Auction Time"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row justify-center gap-12'>
                                <div className='flex-auto'>
                                    <label htmlFor="product_image1" className=" text-base uppercase textColor tracking-wide required-highlight">Image 1</label>
                                    <input 
                                        type="file"
                                        id="product_image1"
                                        name="product_image1"
                                        onChange={handleItemFileChange1}
                                        accept="image/*"
                                        placeholder="Upload Image1"
                                        required 
                                    />
                                </div>
                                <div className='flex-auto'>
                                    <label htmlFor="product_image2" className=" text-base uppercase textColor tracking-wide required-highlight">Image 2</label>
                                    <input 
                                        type="file"
                                        id="product_image2"
                                        name="product_image2"
                                        onChange={handleItemFileChange2}
                                        accept="image/*"
                                        placeholder="Upload Image2"
                                        required 
                                    />
                                </div>
                                <div className='flex-auto'>
                                    <label htmlFor="product_image3" className=" text-base uppercase textColor tracking-wide required-highlight">Image 3</label>
                                    <input 
                                        type="file"
                                        id="product_image3"
                                        name="product_image3"
                                        onChange={handleItemFileChange3}
                                        accept="image/*"
                                        placeholder="Upload Image3"
                                        required 
                                    />
                                </div>
                                <div className='flex-auto'>
                                    <label htmlFor="product_image4" className=" text-base uppercase textColor tracking-wide cursor-pointer required-highlight">Image 4</label>
                                    <input 
                                        type="file"
                                        id="product_image4"
                                        name="product_image4"
                                        onChange={handleItemFileChange4}
                                        accept="image/*"
                                        className='cursor-pointer'
                                        placeholder="Upload Image4"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className='w-full h-60'></div>
                            <div className=" uppercase textColor text-lg font-bold font-cantora underline">about artist</div>
                            <div className='flex flex-row justify-between gap-12'>
                                <div className='flex-auto'>
                                    <label htmlFor="artist_name" className=" text-base uppercase textColor tracking-wide required-highlight">Artist Name</label>
                                    <input 
                                        type="text"
                                        id="artist_name"
                                        name="artist_name"
                                        onChange={e => setValues(values => ({...values, artist_name: e.target.value}))}
                                        placeholder="Enter Artist Name"
                                        required 
                                    />
                                </div>
                                <div className='shrink w-64'>
                                    <label htmlFor="artist_profile_url" className=" text-base uppercase textColor tracking-wide required-highlight">Artist Profile</label>
                                    <input 
                                        type="file"
                                        id="artist_profile_url"
                                        name="artist_profile_url"
                                        onChange={handleArtistProfileChange}
                                        accept="image/*"
                                        placeholder="Upload Artist Profile"
                                        required 
                                    />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="artist_short_description" className=" text-base uppercase textColor tracking-wide required-highlight">Short description about artist</label>
                                    <textarea
                                        id='artist_short_description'
                                        name='artist_short_description'
                                        onChange={handleArtistShortDescriptionChange}
                                        className='w-full textarea_style'
                                        maxLength={50}
                                        rows={1}
                                        placeholder="Item Details">
                                    </textarea>
                                    <div className="textColor text-sm font-cantora text-right">{shortRemainingCharacters}/50</div>
                                </div>
                            </div>
                            <div className='flex flex-row gap-12'>
                                <div className='flex-auto'>
                                    <label htmlFor="artist_long_description" className=" text-base uppercase textColor tracking-wide required-highlight">Artist details</label>
                                    <textarea
                                        id='artist_long_description'
                                        name='artist_long_description'
                                        onChange={handleArtistLongDescriptionChange}
                                        className='w-full textarea_style'
                                        maxLength={1000}
                                        rows={5}
                                        placeholder="Brief Details About Artist(Maximum 1000 letters)">
                                    </textarea>
                                    <div className="textColor text-sm font-cantora text-right">{longRemainingCharacters}/1000</div>
                                </div>
                            </div>
                            <div className='w-full my-20 flex justify-center items-center'>
                                <button type="submit" className=' flex justify-center items-center w-[400px] h-[50px] bg-[#0F2D37] rounded-full'>
                                    <div className=' text-white text-2xl font-cantora font-bold uppercase'>
                                        add bid item
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PlaceItem;