import { useEffect, useState } from "react";
import HomeNav from "../components/HomePrimaryNav";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";



function BuyerDetails () {
    document.title = "BidGalaxy | AddBuyerDetails";

    const [product_id, setProductId] = useState('');

    useEffect(() => {
        // Parse the query string to get the product ID
        const { q: productId } = queryString.parse(window.location.search);
        setProductId(productId);
    }, []);

    const [values, setValues] = useState({
        buyer_name: '',
        buyer_email: '',
        buyer_contact: '',
        final_price: ''
    });

    const [showMinimumPriceText, setShowMinimumPriceText] = useState(false);

    const handlePriceChange = (e) => {
        const enteredPrice = parseInt(e.target.value);
        setShowMinimumPriceText(enteredPrice < 100);
        setValues(values => ({...values, final_price: e.target.value}));
    };

    const [validEmail, setValidEmail] = useState(true);

    const handleBuyerEmailChange = (e) => {
        const enteredEmail = e.target.value;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
        setValidEmail(enteredEmail === '' || isValidEmail);
        setValues(values => ({...values, buyer_email: enteredEmail}));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!product_id) {
            console.error('Product ID is missing');
            return;
        }

        const formData = new FormData();
        formData.append('buyer_name', values.buyer_name);
        formData.append('buyer_email', values.buyer_email);
        formData.append('buyer_contact', values.buyer_contact);
        formData.append('final_price', values.final_price);
        formData.append('product_id', product_id);

        const jsonObject = {};
            formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        axios.post('http://localhost:8081/admin/BuyerDetails', jsonObject)
        .then(res => {
            if (res.data.success) {
                alert('Buyer Details Added Successfully!');
                navigate(`/admin/AuctionItemDetails?q=${product_id}`);
            } else {
                alert('Error while submitting the data.');
                console.error('Failed to submit form data:', res.data.error);
            }
        })
        .catch(err => {
            console.error('Error submitting form data:', err.message);
        });
    };
    return (
        <div className="wrapper">
            <HomeNav />
            <section className="w-[1200px] mx-auto mb-32">
                <div className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora mt-[50px] ">
                    Update Buyer's Details
                </div>
                <div className="w-3/4 mx-auto">
                    <div className="mt-[40px]">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row justify-between gap-12">
                                <div className="flex-auto">
                                    <label htmlFor="buyer_name" className=" text-base uppercase textColor tracking-wide">buyer's name</label>
                                    <input 
                                        type="text"
                                        id="buyer_name"
                                        name="buyer_name"
                                        placeholder="Enter Buyer Name"
                                        onChange={e => setValues(values => ({...values, buyer_name: e.target.value}))}
                                        required 
                                    />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="buyer_email" className=" text-base uppercase textColor tracking-wide">buyer's email</label>
                                    <input 
                                        type="email"
                                        id="buyer_email"
                                        name="buyer_email"
                                        placeholder="Enter Buyer Email"
                                        onChange={handleBuyerEmailChange}
                                        required 
                                    />
                                    {!validEmail && <div className="text-red-500 text-left font-cantora">Enter a valid email.</div>}
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-12">
                                <div className="flex-auto">
                                    <label htmlFor="buyer_contact" className=" text-base uppercase textColor tracking-wide">buyer's contact</label>
                                    <input 
                                        type="number"
                                        id="buyer_contact"
                                        name="buyer_contact"
                                        placeholder="Enter Buyer Contact"
                                        onChange={e => setValues(values => ({...values, buyer_contact: e.target.value}))}
                                        required 
                                    />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="final_price" className=" text-base uppercase textColor tracking-wide">sold in</label>
                                    <input 
                                        type="number"
                                        id="final_price"
                                        name="final_price"
                                        placeholder="Enter Final Price"
                                        value={values.final_price}
                                        onChange={handlePriceChange}
                                        required 
                                    />
                                    {showMinimumPriceText && <div className="text-red-500 font-cantora">Minimum price should be 100.</div>}
                                </div>
                            </div>
                            <div className='w-full my-20 flex justify-center items-center'>
                                <button type="submit" className=' flex justify-center items-center w-[400px] h-[50px] bg-[#0F2D37] rounded-full hover:scale-105 transition-all ease-out'>
                                    <div className=' text-white text-2xl font-cantora font-bold uppercase'>
                                        update buyer details
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default BuyerDetails;