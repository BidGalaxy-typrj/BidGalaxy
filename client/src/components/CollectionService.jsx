import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import CollectionServiceImage from '../assets/CollectionServiceImage.png';


const CollectionService = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="">
                <span className="font-cantora text-3xl font-extrabold px-5">Collection Service</span>
                <div className="flex justify-center p-2">
                    <img className="w-[1200px] mx-auto" src={CollectionServiceImage} alt="CollectionServiceImage"></img>
                </div>
                <div className="p-2 w-[1000px] mx-auto">
                <p>
                    Years of experience and trust from the collector community have propelled BidGalaxy to expand our horizons and introduce customized services aimed at assisting our clients in cultivating a dynamic portfolio of art.
                </p>
                <p>
                    Whether you're looking to enhance or diversify your collection, the experts at BidGalaxy will guide you through every step of the process.
                </p>
                <p>
                    We cater to a wide range of clients, including corporate entities, private collectors, museums, and other public institutions. Our goal is to leverage our expertise to provide tailored and strategic solutions that enable them to optimize the inherent value of their art collection.
                </p>
                <p>
                    Drawing on our deep understanding of corporate environments, we specialize in crafting strategic art solutions that enhance your workspace and support your branding objectives.
                </p>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default CollectionService;