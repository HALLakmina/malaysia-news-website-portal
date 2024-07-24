import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";

const App = () =>{
  return (
    <div className="main-component-wrapper color-main-bg">
      <div className="main-component-body">
        <Routes>
          <Route  path="/" element={<Index/>}/>
          <Route  path="/sri-lankan-news" element={''}/>
          <Route  path="/malaysian-news" element={''}/>
          <Route  path="/gossip" element={''}/>
          <Route  path="/sport" element={''}/>
          <Route  path="/world-news" element={''}/>
          <Route  path="/about-us" element={''}/>
          <Route  path="/contact-us" element={''}/>
          <Route  path="/read-more-news/:id?" element={''}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
