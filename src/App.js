import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from './Components/NavigationBar'
const App = () =>{
  return (
    <div className="main-component-wrapper color-main-bg">
      <div className="main-component-body">
        <NavigationBar/>
      </div>
    </div>
  );
}

export default App;
