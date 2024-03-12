import { Link } from "react-router-dom";
import HomeNav from "../components/HomePrimaryNav";



function Success() {
    document.title = "BidGalaxy | Registration Successful";
    return(
        <div>
            <HomeNav />
            <div className="mt-5 flex flex-row justify-center">
                <div className="w-[1100px] homeServiceSection shadow-2xl rounded-3xl">
                    <div className="p-10">
                        <div className="textColor text-6xl font-bold text-center font-cantora tracking-wide uppercase">🎊Congratulations🎊</div>
                        <div className="textColor text-4xl font-bold text-center font-cantora tracking-wide pt-6">Profile Created Successfully!</div>
                        <div className="textColor text-xl font-bold text-center pt-5 font-cantora tracking-wider">
                            You can click here to 
                            <Link className="text-[#14cffc] ml-2 underline" to="/signin/index">
                                Login!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
 }

export default Success;