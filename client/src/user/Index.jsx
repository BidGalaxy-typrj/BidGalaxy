import HomeNav from "../components/HomePrimaryNav";



function UserDash() {

    document.title = "BidGalaxy | UserDashboard"; 
    return(
        <div className="text-3xl">
            <HomeNav />
        </div>
    )
}

export default UserDash;