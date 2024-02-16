import './App.css';
import {Routes,Route, useLocation} from "react-router-dom";
import Home from './components/Home';
import Categories from './categories/Category';

function App() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/*" element={<Home/>}/>
            <Route path="/categories/Category" element={<Categories/>} />
        </Routes>
    );
  }

  export default App;