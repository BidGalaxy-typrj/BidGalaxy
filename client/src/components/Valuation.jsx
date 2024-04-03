import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import ValuationImage from '../assets/ValuationImage.png';


const Valuation = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="w-[1400px] mx-auto mt-14">
                <span className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora">Valuation Service</span>
                <div className="flex justify-center mt-10">
                    <img className="h-[28rem] w-3/4 border-8 border-gray-900" src={ValuationImage} alt="ValuationImage"></img>
                </div>
                <div className="w-[1300px] mx-auto my-10">
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        BidGalaxy offers specialized valuation services to clients and sellers across India, tailoring each valuation to the unique needs of the collector and their collection. Whether it's a small, single-item collection or a substantial, multi-category one, we provide top-tier service with the utmost confidentiality.
                    </div>
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        Our team of seasoned professionals conducts comprehensive inspections and analyses of the property. We take into account essential factors such as condition, age, provenance, and publishing history to determine a fair market valuation.
                    </div>
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        At BidGalaxy, we are dedicated to meeting all your valuation requirements. Should you have any further questions, please don't hesitate to reach out to our team.
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Valuation;