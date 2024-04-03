import Footer from "./Footer";
import HomeNav from "./HomePrimaryNav";
import StorageImage from '../assets/Storageimage.png';


const Storage = ()=>{
    return (
        <div className="wrapper">
            <HomeNav/>
            <section className="w-[1400px] mx-auto mt-14">
                <span className="text-[24px] font-extrabold textColor uppercase underline tracking-tighter font-cantora">Storage</span>
                <div className="flex justify-center mt-10">
                    <img className="h-[27rem] w-3/4 border-8 border-gray-900" src={StorageImage} alt="StorageImage" />
                </div>
                <div className=" w-[1300px] mx-auto my-10">
                    <div className="text-lg font-cantora mb-5 textColor">BidGalaxy provides a comprehensive range of art management solutions aimed at safeguarding 
                        and maintaining the integrity of your prized collection.</div>

                    <div className="text-lg font-cantora mb-5 textColor">Our state-of-the-art storage facility, located in Mumbai, is purpose-built to accommodate a 
                        diverse array of items, including paintings, furniture, sculptures, and large-scale artworks.</div>

                    <p className="text-lg font-cantora mb-5 textColor text-start">Key advantages of entrusting your artworks to our storage facility include:</p>
                    <ul className="disc-list font-cantora mb-5 ml-10">
                        <li>Advanced aeration system to ensure optimal air circulation.</li>
                        <li>Comprehensive ventilation system to regulate temperature and humidity levels.</li>
                        <li>Robust alarm system and round-the-clock surveillance cameras for enhanced security.</li>
                        <li>Customized shelving system designed to mitigate risks associated with potential 
                            disasters.</li>
                    </ul>

                    <div className="text-lg font-cantora textColor">Our team of experienced technicians meticulously handles the storage of various types of 
                        artwork. Following the completion of storage operations, each client receives a detailed 
                        inventory report for their records. With BidGalaxy, your valuable collection is in safe 
                        hands, ensuring its preservation for years to come.</div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Storage;