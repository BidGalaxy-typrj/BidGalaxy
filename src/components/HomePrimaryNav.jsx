import logo from '../assets/BidGalaxyLogo.png';
import signinBtn from '../assets/signinBtn.svg';
import registerBtn from '../assets/registerBtn.svg';


function HomeNav() {
    return (
        <nav className='relative primaryNavBg'>
            <div className="primaryNav flex flex-row justify-between items-center mx-[100px]">
                <div>
                    <img src={logo} alt='logo' className='w-[145px] h-[45px] ' />
                </div>
                <div className='flex flex-row items-center'>
                    <a href='/' className='cursor-pointer'>
                    <div>
                        <img src={signinBtn} alt='signin btn' />
                    </div>
                    </a>
                    <div className='font-cantora text-white'>OR</div>
                    <a href='/' className='cursor-pointer'>
                    <div>
                        <img src={registerBtn} alt='register btn' className='' />
                    </div>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default HomeNav;