import axios from "axios";
import { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";



function AdminDash() {

    document.title = "BidGalaxy | AdminDashboard";

    const [userCount, setUserCount] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8081/admin/users/count')
        .then((res) => {
            setUserCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const [productCount, setProductCount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/admin/products/count')
        .then((res) => {
            setProductCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const [soldProductCount, setSoldProductCount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/admin/soldproducts/count')
        .then((res) => {
            setSoldProductCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const [userQueryCount, setUserQueryCount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/admin/queries/count')
        .then((res) => {
            setUserQueryCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return(
        <div className="w-full">
            <div className="grid grid-rows-3 grid-cols-3 mx-10 gap-16 justify-items-center mt-16">
                <div className="admin_inner_cards w-[320px] h-[190px]">
                    <div className="p-8">
                        <div className="admin_inner_card_icon">
                            <IoStatsChart />
                        </div>
                        <div className="">
                            <h5 className="mb-0 text-2xl font-cantora textColor font-semibold uppercase">Users</h5>
                        </div>
                        <div className="mt-12">
                            <h2 className=" text-5xl font-cantora font-bold textColor mb-0">{userCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="admin_inner_cards w-[320px] h-[190px]">
                    <div className="p-8">
                        <div className="admin_inner_card_icon">
                            <IoStatsChart />
                        </div>
                        <div className="">
                            <h5 className="mb-0 text-2xl font-cantora textColor font-semibold uppercase">items</h5>
                        </div>
                        <div className="mt-12">
                            <h2 className=" text-5xl font-cantora font-bold textColor mb-0">{productCount}</h2>  
                        </div>
                    </div>
                </div>
                <div className="admin_inner_cards w-[320px] h-[190px]">
                    <div className="p-8">
                        <div className="admin_inner_card_icon">
                            <IoStatsChart />
                        </div>
                        <div className="">
                            <h5 className="mb-0 text-2xl font-cantora textColor font-semibold uppercase">auctioned items</h5>
                        </div>
                        <div className="mt-12">
                            <h2 className=" text-5xl font-cantora font-bold textColor mb-0">{soldProductCount}</h2>  
                        </div>
                    </div>
                </div>
                <div className="admin_inner_cards w-[320px] h-[190px]">
                    <div className="p-8">
                        <div className="admin_inner_card_icon">
                            <IoStatsChart />
                        </div>
                        <div className="">
                            <h5 className="mb-0 text-2xl font-cantora textColor font-semibold uppercase">queries</h5>
                        </div>
                        <div className="mt-12">
                            <h2 className=" text-5xl font-cantora font-bold textColor mb-0">{userQueryCount}</h2>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDash;