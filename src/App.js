import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from './Components/NavigationBar/NavigationBar'
import Index from "./Pages/Index"
import NewsPage from "./Pages/NewsPage";
import NewsReadPage from "./Pages/NewsReadPage";
import AboutUs from "./Pages/AboutUs";

const App = () =>{
  return (
    <div className="main-component-wrapper color-main-bg">
      <div className="main-component-body">
        <NavigationBar/>
        <div className="min-h-screen w-full flex justify-center">
          <Routes>
            <Route  path="/" element={<Index/>}/>
            <Route  path="/news/:type" element={<NewsPage/>}/>
            <Route  path="/news/:type/:id" element={<NewsReadPage/>}/>
            <Route  path="/about-us" element={<AboutUs/>}/>
            <Route  path="/contact-us" element={''}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
