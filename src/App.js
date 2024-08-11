import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavigationBar from './Components/NavigationBar/NavigationBar'
import Index from "./Pages/Index"
import NewsPage from "./Pages/NewsPage";
import NewsReadPage from "./Pages/NewsReadPage";
import AboutUs from "./Pages/AboutUs";
import AdminPanelPage from "./Pages/AdminPanelPage";
import LeftSideNavigationBar from "./Components/NavigationBar/LeftSideNavigationBar";
import AdminSignIn from './Components/SignIn/AdminSignIn'

const App = () =>{
  const { pathname } = useLocation()
  const mainPageName = pathname.split('/',2)
  return (
    <div className="main-component-wrapper color-main-bg relative">
      <div className="main-component-body">
        <div className="min-h-screen w-full">
        {(mainPageName[1] !== 'admin-login')?  
          mainPageName[1] !== 'admin-panel' ?
            <NavigationBar/>
          : 
            <LeftSideNavigationBar/>
        :
          ''}
        <div className=" component-responsive-size">
          <Routes>
            <Route  path="/" element={<Index/>}/>
            <Route  path="/news/:type" element={<NewsPage/>}/>
            <Route  path="/news/:type?/:id?" element={<NewsReadPage/>}/>
            <Route  path="/about-us" element={<AboutUs/>}/>
            <Route  path="/contact-us" element={''}/>
            <Route  path="/admin-panel/:pageName?" element={<AdminPanelPage/>}/>
            <Route  path="/admin-login" element={<AdminSignIn/>}/>
          </Routes>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
