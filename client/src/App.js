import './App.css';
import {Routes,Route, useLocation} from "react-router-dom";
import Home from './components/Home';
import Categories from './categories/Category';
import Signup from './signup/index';
import Signin from './signin/index';
import Success from './signup/Success';
import AdminDash from './admin/Index';
import UserDash from './user/Index';
import SideBar from './admin/SideBar';


function App() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/*" element={<Home/>}/>
            <Route path="/categories/Category" element={<Categories/>} />
            <Route path='/signup/index' element={<Signup />} />
            <Route path='/signin/index' element={<Signin />} />
            <Route path='/signup/Success' element={<Success />} />
            <Route path='/admin/Index' element= {<AdminDash />} />
            <Route path='/user/Index' element= {<UserDash />} />
            <Route path='/admin/Sidebar' element = {<SideBar />} />
        </Routes>
    );
  }

  export default App;