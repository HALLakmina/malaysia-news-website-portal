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
import { getNewsCount, getNewsForAdmin, getNewsForUser } from "./APIS/NewsApi";
import SocialMediaBar from "./Components/NavigationBar/SocialMediaBar";


const responseMessages = require('./Util/responseMessages')

const App = () =>{
  const [adminSignIn, getAdminSignIn] =useState('')
  const [adminNews, setAdminNews] = useState([])
  const [userNews, setUserNews] = useState([])
  const [adminNewsCount, setAdminNewsCount] = useState(0)
  const [language, setLanguage] = useState('sinhala')
  const { pathname } = useLocation()
  const mainPageName = pathname.split('/',2)

  useEffect(()=>{
    dataDispatchEvent('GET_SIGN_IN_ADMIN_FROM_COOKIES')
    dataDispatchEvent('GET_NEWS_FOR_USER')
  },[])

  useEffect(()=>{
    dataDispatchEvent('GET_NEWS_FOR_USER')
  },[language])

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
  const newsForAdmin = async (payload)=>{
    try{
      const respond = await getNewsForAdmin(payload?.page, payload?.limit, payload?.sortOrder, payload?.category, payload?.language, payload?.search)
      if(Array.isArray(respond.data)){
        setAdminNews(respond.data)
      }
    }
    catch(error){
      let takeMessage = error?.message
      const response = error?.response
      if(response){
        const {status, data} = response
        const message = data?.message
        if(status === 400){
          const message = data[0]?.message
          takeMessage = message || responseMessages.error[400]
        }
        else if(status === 409){
          takeMessage = message || responseMessages.error[409](responseMessages.type.news)
        }
        else if(status === 500){
          takeMessage = message || responseMessages.error[500]
        }
      }
    }
  }
  const newsForUser = async (payload) => {
    try{
      const response = await getNewsForUser(payload?.page, payload?.limit, payload?.sortOrder, payload?.category, language, payload?.search)
      if(Array.isArray(response.data)){
        setUserNews(response.data)
      }
    }
    catch(error){
      let takeMessage = error?.message
      const response = error?.response
      if(response){
          const {status, data} = response
          const message = data?.message
        if(status === 400){
          const message = data[0]?.message
          takeMessage = message || responseMessages.error[400]
        }
        else if(status === 409){
          takeMessage = message || responseMessages.error[409](responseMessages.type.news)
        }
        else if(status === 500){
          takeMessage = message || responseMessages.error[500]
        }
      }
    }
  }
  const newsCountForAdmin= async ()=>{
    try{
      const respond = await getNewsCount()
      setAdminNewsCount(respond.data)
    }
    catch(error) {
      let takeMessage = error?.message
      const response = error?.response
      if(response){
        const {status, data} = response
        const message = data?.message
        if(response && status === 400){
          const message = data[0]?.message
          takeMessage = message || responseMessages.error[400]
        }
        else if(response && status === 404){
          takeMessage = message || responseMessages.error[404](responseMessages.type.news)
        }
        else if(response && status === 500){
          takeMessage = message || responseMessages.error[500]
        }
      }
    }
  }

  const getLanguage = (payload)=>{
    setLanguage(payload)
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
      case 'GET_NEWS_FOR_ADMIN':
        newsForAdmin(payload)
        newsCountForAdmin()
          break;
      case 'GET_NEWS_FOR_USER':
        newsForUser(payload)
          break;
      case 'GET_LANGUAGE':
        getLanguage(payload)
          break;
      default:
          return
    }
  }
  return (
    <AppContext.Provider value={ {dataDispatchEvent, adminSignIn, adminNews, adminNewsCount, userNews, language} }>
      <div className="main-component-wrapper color-main-bg relative">
        <div className="main-component-body">
          <div className="min-h-screen w-full">
          {(mainPageName[1] !== 'admin-login')?  
            mainPageName[1] !== 'admin-panel' ?
              <div className="sm:fixed z-10 top-0 w-full" style={{maxWidth:'1200px'}}>
                <SocialMediaBar/>
                <NavigationBar/>
              </div>
            : 
              <LeftSideNavigationBar/>
          :
            ''}
          <div className=" component-responsive-size sm:pt-32">
            <Routes>
              <Route  path="/" element={<Index/>}/>
              <Route  path="/news/:category" element={<NewsPage/>}/>
              <Route  path="/news/:category?/:id?" element={<NewsReadPage/>}/>
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
