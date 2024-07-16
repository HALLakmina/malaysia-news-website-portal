import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";

const App = () =>{
  return (
    <div className="main-component-wrapper color-main-bg">
      <div className="main-component-body">
        <Routes>
          <Route  path="/" element={<Index/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
