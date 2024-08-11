/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavigationBar from './Components/NavigationBar/NavigationBar'
import LeftSideNavigationBar from "./Components/NavigationBar/LeftSideNavigationBar";
import Index from "./Pages/Index"
import NewsPage from "./Pages/NewsPage";
import NewsReadPage from "./Pages/NewsReadPage";
import AboutUs from "./Pages/AboutUs";
import AdminPanelPage from "./Pages/AdminPanelPage";
import AdminSignInPage from './Pages/AdminSignInPage'
import { AppContext } from "./ContextAPI/AppContext";
import Cookies from "universal-cookie";

const App = () =>{
  const [adminSignIn, getAdminSignIn] =useState('')

  const { pathname } = useLocation()
  const mainPageName = pathname.split('/',2)

  useEffect(()=>{
    dataDispatchEvent('GET_SIGN_IN_ADMIN_FROM_COOKIES')
  },[])

  const setSignInUserToCookies = async (jwtToken)=>{
    const cookies = new Cookies();
    await cookies.set('JWT_TOKEN', jwtToken, {maxAge:36000});
    getAdminSignIn(jwtToken)
  }
  const getSignInUserFromCookies = async ()=>{
      const cookies = new Cookies();
      const jwtToken = await cookies.get('JWT_TOKEN')
      getAdminSignIn(jwtToken)
    }
  const removeSignInUserFromCookies = async ()=>{
      const cookies = new Cookies();
      await cookies.remove('JWT_TOKEN')
      getAdminSignIn(undefined)
  }

  const dataDispatchEvent = (action, payload) => {
    switch(action){
      case 'SET_SIGN_IN_ADMIN_TO_COOKIES':
          setSignInUserToCookies(payload)
          break;
      case 'GET_SIGN_IN_ADMIN_FROM_COOKIES':
        getSignInUserFromCookies()
          break;
      case 'REMOVE_SIGN_IN_ADMIN_IN_COOKIES':
        removeSignInUserFromCookies(payload)
          break;
      default:
          return
    }
  }
  return (
    <AppContext.Provider value={ {dataDispatchEvent, adminSignIn} }>
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
              <Route  path="/admin-login" element={<AdminSignInPage/>}/>
            </Routes>
          </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
