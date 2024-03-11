import { useNavigate } from "react-router-dom";



function Footer() {

    const navigate = useNavigate();

    const handlePrivatePolicyClick = () => {
        navigate('/components/PrivatePolicy');
    }
    const handleTermsConditionsClick = () => {
        navigate('/components/Terms&Conditions');
    }
    return(
        <div className="bg-[#0F2D37] py-4">
            <div className="w-[1400px] mx-auto flex justify-between">
                <div className="text-white text-[13px] uppercase font-normal font-cantora ">Bidgalaxy © Copy Right 2014 - All Rights Reserved.</div>
                <div className="flex flex-row gap-[47px]">
                    <div onClick={handleTermsConditionsClick} className="text-white text-[13px] uppercase font-normal font-cantora cursor-pointer hover:scale-105 transition-all ease-out">Terms & conditions</div>
                    <div onClick={handlePrivatePolicyClick} className="text-white text-[13px] uppercase font-normal font-cantora cursor-pointer hover:scale-105 transition-all ease-out">private policy</div>
                    <div className="text-white text-[13px] uppercase font-normal font-cantora cursor-pointer hover:scale-105 transition-all ease-out">contact us</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;