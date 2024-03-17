import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import StorageImage from '../assets/Storageimage.png';


const Storage = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="">
                <span className="font-cantora text-3xl font-extrabold px-5">Storage</span>
                <div className="flex justify-center p-2">
                    <img className="w-[1200px] mx-auto" src={StorageImage} alt="StorageImage"></img>
                </div>
                <div className="p-2 w-[1000px] mx-auto">
                    <p>BidGalaxy provides a comprehensive range of art management solutions aimed at safeguarding 
                        and maintaining the integrity of your prized collection.</p>

                    <p>Our state-of-the-art storage facility, located in Mumbai, is purpose-built to accommodate a 
                        diverse array of items, including paintings, furniture, sculptures, and large-scale artworks.</p>

                    <h2>Key advantages of entrusting your artworks to our storage facility include:</h2>
                    <ul>
                        <li>Advanced aeration system to ensure optimal air circulation.</li>
                        <li>Comprehensive ventilation system to regulate temperature and humidity levels.</li>
                        <li>Robust alarm system and round-the-clock surveillance cameras for enhanced security.</li>
                        <li>Customized shelving system designed to mitigate risks associated with potential 
                            disasters.</li>
                    </ul>

                    <p>Our team of experienced technicians meticulously handles the storage of various types of 
                        artwork. Following the completion of storage operations, each client receives a detailed 
                        inventory report for their records. With BidGalaxy, your valuable collection is in safe 
                        hands, ensuring its preservation for years to come.</p>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Storage;