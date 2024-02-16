import HomeNav from "../components/HomePrimaryNav";
import artCategory from "../assets/artCategory.svg";
import artifactCategory from "../assets/artifactCategory.svg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


function Categories() {

    const navigate = useNavigate();

    return (
        <div>
            <HomeNav />
            <div className="w-[1400px] mt-16 mx-auto mb-[10rem]">
                <div className="text-[24px] text-[#28303F] underline tracking-tighter font-cantora font-extrabold uppercase">Select your category</div>
                <div className="w-3/4 mx-auto">
                    <div className="mt-[30px]">
                        <div className="flex flex-row justify-center flex-wrap gap-[65px]">
                            <div className="w-[480px] h-[270px] rounded-[30px] categoryCard flex justify-center items-center cursor-pointer">
                                <div className="">
                                    <img src={artCategory} alt="artCategory" className="w-[410px] h-[210px]" />
                                </div>
                            </div>
                            <div className="w-[480px] h-[270px] rounded-[30px] categoryCard flex justify-center items-center cursor-pointer">
                                <div className="">
                                    <img src={artifactCategory} alt="artCategory" className="w-[410px] h-[210px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Categories;