import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import CollectionServiceImage from '../assets/CollectionServiceImage.png';


const CollectionService = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="w-[1400px] mx-auto mt-14">
                <span className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora">Collection Service</span>
                <div className="flex justify-center mt-10">
                    <img className="h-[26rem] w-3/4 border-8 border-gray-900" src={CollectionServiceImage} alt="CollectionServiceImage"></img>
                </div>
                <div className="w-[1300px] mx-auto my-10">
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        Years of experience and trust from the collector community have propelled BidGalaxy to expand our horizons and introduce customized services aimed at assisting our clients in cultivating a dynamic portfolio of art.
                    </div>
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        Whether you're looking to enhance or diversify your collection, the experts at BidGalaxy will guide you through every step of the process.
                    </div>
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        We cater to a wide range of clients, including corporate entities, private collectors, museums, and other public institutions. Our goal is to leverage our expertise to provide tailored and strategic solutions that enable them to optimize the inherent value of their art collection.
                    </div>
                    <div className="text-lg font-cantora mb-5 textColor text-center">
                        Drawing on our deep understanding of corporate environments, we specialize in crafting strategic art solutions that enhance your workspace and support your branding objectives.
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default CollectionService;