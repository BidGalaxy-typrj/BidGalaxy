import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import ValuationImage from '../assets/ValuationImage.png';


const Valuation = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="">
                <span className="font-cantora text-3xl font-extrabold px-5">Valuation Service</span>
                <div className="flex justify-center p-2">
                    <img className="w-[1200px] mx-auto" src={ValuationImage} alt="ValuationImage"></img>
                </div>
                <div className="p-2 w-[1000px] mx-auto">
                <p>
                    BidGalaxy offers specialized valuation services to clients and sellers across India, tailoring each valuation to the unique needs of the collector and their collection. Whether it's a small, single-item collection or a substantial, multi-category one, we provide top-tier service with the utmost confidentiality.
                </p>
                <p>
                    Our team of seasoned professionals conducts comprehensive inspections and analyses of the property. We take into account essential factors such as condition, age, provenance, and publishing history to determine a fair market valuation.
                </p>
                <p>
                    At BidGalaxy, we are dedicated to meeting all your valuation requirements. Should you have any further questions, please don't hesitate to reach out to our team.
                </p>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Valuation;