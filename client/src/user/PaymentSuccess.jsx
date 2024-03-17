import Footer from "../components/Footer";
import HomeNav from "../components/HomePrimaryNav";




function PaymentSuccess () {

    document.title = "BidGalaxy | RegisterSuccess";

    

    return (
        <div>
            <HomeNav />
            <div className="mt-5 flex flex-row justify-center mb-80">
                <div className="w-[1100px] homeServiceSection shadow-2xl rounded-3xl">
                    <div className="p-10">
                        <div className="textColor text-4xl font-bold text-center font-cantora tracking-wide pt-6">You have successfully registered for the product. You will get the link for auction within 1 to 2 working days.</div>
                        <div className="textColor text-xl font-bold text-center font-cantora tracking-wide pt-6">You can check your registered product in your Dashboard/My Bids/Upcoming Bids Section.</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentSuccess;