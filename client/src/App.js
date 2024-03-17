import './App.css';
import {Routes,Route, useLocation} from "react-router-dom";
import Home from './components/Home';
import Categories from './categories/Category';
import Signup from './signup/index';
import Signin from './signin/index';
import Success from './signup/Success';
import AdminDash from './admin/Index';
import SideBar from './admin/SideBar';
import PlaceItem from './admin/PlaceItem';
import Users from './admin/Users';
import UserDetails from './admin/UserDetails';
import AuctionItems from './admin/AuctionItems';
import AuctionItemDetails from './admin/AuctionItemDetails';
import AuctionedItems from './admin/AuctionedItems';
import AuctionedItemDetails from './admin/AuctionedItemDetails';
import BuyerDetails from './admin/BuyerDetail';
import PrivatePolicy from './components/PrivatePolicy';
import Terms from './components/Terms&Conditions';
import UserSideBar from './user/SideBar';
import Dashboard from './user/Dashboard';
import UpcomingBids from './user/UpcomingBids';
import OngoingBids from './user/OngoingBids';
import Profile from './user/Profile';
import Auction from './user/Auction';
import Verification from './signup/Verification';
import ProfileSection from './signup/ProfileSection';
import AuctionDetails from './user/AuctionDetails';
import PaymentSuccess from './user/PaymentSuccess';
import UpcomingBidDetails from './user/UpcomingBidDetails';
import Bidders from './admin/Bidders';
import BiddingDetails from './admin/BiddingDetails';



function App() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/*" element={<Home/>}/>
            <Route path="/categories/Category" element={<Categories/>} />
            <Route path='/signup/index' element={<Signup />} />
            <Route path='/signin/index' element={<Signin />} />
            <Route path='/signup/Success' element={<Success />} />
            <Route path='/signup/Verification' element = {<Verification />} />
            <Route path='/admin/Index' element= {<AdminDash />} />
            <Route path='/admin/Sidebar' element = {<SideBar />} />
            <Route path='/admin/PlaceItem' element= {<PlaceItem />} />
            <Route path='/admin/Users' element = {<Users />} />
            <Route path='/admin/UserDetails' element = {<UserDetails />} />
            <Route path='/admin/AuctionItems' element = {<AuctionItems />} />
            <Route path='/admin/AuctionItemDetails' element = {<AuctionItemDetails />} />
            <Route path='/admin/AuctionedItems' element = {<AuctionedItems />} />
            <Route path='/admin/AuctionedItemDetails' element = {<AuctionedItemDetails />} />
            <Route path='/admin/BuyerDetail' element = {<BuyerDetails />} />
            <Route path='/components/PrivatePolicy' element = {<PrivatePolicy />} />
            <Route path='/components/Terms&Conditions' element = {<Terms />} />
            <Route path='/user/SideBar' element = {<UserSideBar />} />
            <Route path='/user/Dashboard' element = {<Dashboard />} />
            <Route path='/user/UpcomingBids' element = {<UpcomingBids />} />
            <Route path='/user/OngoingBids' element = {<OngoingBids />} />
            <Route path='/user/Profile' element = {<Profile />} />
            <Route path='/user/Auction' element = {<Auction />} />
            <Route path='/signup/ProfileSection' element = {<ProfileSection />} />
            <Route path='/user/AuctionDetails' element = {<AuctionDetails />} />
            <Route path='/user/PaymentSuccess' element = {<PaymentSuccess />} />
            <Route path='/user/UpcomingBidDetails' element = {<UpcomingBidDetails />} />
            <Route path='/admin/Bidders' element = {<Bidders />} />
            <Route path='/admin/BiddingDetails' element = {<BiddingDetails />} />
         </Routes>
    );
  }

  export default App;