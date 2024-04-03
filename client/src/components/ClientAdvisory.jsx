import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import ClientAdvisoryImage from '../assets/ClientAdvisoryImage.png';


const ClientAdvisory = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="w-[1400px] mx-auto mt-14">
                <span className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora">Client Advisory</span>
                <div className="flex justify-center mt-10">
                    <img className="h-[26rem] w-3/4 border-8 border-gray-900" src={ClientAdvisoryImage} alt="ClientAdvisoryImage"></img>
                </div>
                <div className="w-[1300px] mx-auto my-10">
                    <p className="text-lg font-cantora mb-5 textColor">
                        BidGalaxy's Client Advisory team operates in close collaboration with specialized experts across various 
                        categories to deliver tailored services to our clients. We designate a dedicated point of contact to work 
                        closely with individual and institutional collectors, gaining insights into their preferences, offering 
                        unbiased recommendations, sourcing the ideal artwork or collectible to meet their needs, and facilitating 
                        transparent and equitable acquisitions across a wide range of categories. Leveraging our extensive network 
                        of buyers and sellers, we excel in enriching our clients' collections while ensuring utmost confidentiality 
                        for all involved parties.
                    </p>
                    <p className="text-lg font-cantora textColor"> 
                        Drawing on our team's deep understanding of the auction market and refined expertise, we identify promising 
                        opportunities and noteworthy artworks and collectibles that serve as both valuable financial investments 
                        and aesthetically enriching additions to our clients' portfolios. Our commitment to excellence enables us 
                        to deliver unparalleled service, helping our clients build exceptional collections tailored to their unique 
                        tastes and objectives.
                    </p>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default ClientAdvisory;