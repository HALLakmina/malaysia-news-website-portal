/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import NewsAddForm from './NewsPanel/NewsAddForm'
import NewsUpdateForm from './NewsPanel/NewsUpdateForm'
import NewsDisableDeleteAlert from './NewsPanel/NewsDisableDeleteAlert'
import { AppContext } from '../../ContextAPI/AppContext'
import Pagination from 'rc-pagination/lib/Pagination'
const NewsPanel = () => {
  const [addNewsStatus, setAddNewsStatus] = useState(false)
  const [updateNewsStatus, setUpdateNewsStatus] = useState(false)
  const [disableDeleteStatus,setDisableDeleteStatus] = useState(false)
  const [updateNewsData, setUpdateNewsData] = useState('')
  const [disableDeleteData, setDisableDeleteData] = useState({type:'',data:{}})

  const [pageValue, setPageValue] = useState({sortOrder:"ASC", category:'', language:'', search:''})
  const [currentPage, setCurrentPage] = useState(1)

  const { adminNews=[], adminNewsCount, dataDispatchEvent } = useContext(AppContext)

  useEffect(()=>{
    dataDispatchEvent('GET_NEWS_FOR_ADMIN', {page:1, limit:10, sortOrder:pageValue.sortOrder, category:pageValue.category, language:pageValue.language, search:''})
  },[pageValue])

  const triggerAddNews = (state)=>{
    setAddNewsStatus(state)
  }
  const triggerUpdateNews = (state, data)=>{
    setUpdateNewsStatus(state)
    setUpdateNewsData(data)
  }
  const request = (state, type, data)=>{
    requestStatus(state)
    setDisableDeleteData({type:type, data})
  }
  const requestStatus = (state) => {
    setDisableDeleteStatus(state)
  }
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber)
    dataDispatchEvent('GET_NEWS_FOR_ADMIN', {page:pageNumber, limit:10, sortOrder:pageValue.sortOrder, category:pageValue.category, language:pageValue.language, search:''})
  }
  const handlePaginationValue=(e)=>{
    const {name, value} = e.target
    name === 'language' && setPageValue({...pageValue, language:value})
    name === 'category' && setPageValue({...pageValue, category:value})
    name === 'sortOrder' && setPageValue({...pageValue, sortOrder:value})
  }

  const handleItemRender = (current, type, element) => {
    if (type === 'prev') {
      return <div className="border-blue-500 hover:border-blue-800 hover:border-4 text-sm sm:text-xl box-border h-7 sm:h-10 w-7 sm:w-10 p-2  m-1 border sm:border-2 flex items-center justify-center cursor-pointer font-bold">{element}</div>;
    }
    if (type === 'next') {
      return <div className="border-blue-500 hover:border-blue-800 hover:border-4 text-sm sm:text-xl  box-border h-7 sm:h-10 w-7 sm:w-10 p-2  m-1 border sm:border-2 flex items-center justify-center cursor-pointer font-bold">{element}</div>;
    }
    if (type === 'page') {
      return <div className={`${currentPage === current ?"border-blue-800 border-2  sm:border-4": "border-blue-500 border  sm:border-2"} hover:border-blue-800 hover:border-4 text-sm sm:text-xl  box-border h-7 sm:h-10 w-7 sm:w-10 p-2  m-1 flex items-center justify-center cursor-pointer`}>{current}</div>;
    }
    if (type === 'jump-prev') {
      return <div className="border-black hover:border-blue-800 hover:border-4 text-sm sm:text-xl  box-border h-5 sm:h-8 w-7 sm:w-10 p-2  m-1 border sm:border-2 flex items-center justify-center cursor-pointer font-bold">{element}</div>;
    }
    if (type === 'jump-next') {
      return <div className="border-black hover:border-blue-800 hover:border-4 text-sm sm:text-xl box-border h-5 sm:h-8 w-7 sm:w-10 p-2  m-1 border sm:border-2 flex items-center justify-center cursor-pointer font-bold">{element}</div>;
    }
    return element;
  }

  return !addNewsStatus && !updateNewsStatus ?  (
    <div>
      <h1 className="text-center my-8 text-4xl sm:text-5xl font-bold">NEWS PANEL</h1>
        <p>Total NEWS {adminNewsCount}</p>
        <div className="flex flex-row items-center justify-between my-5">
          <button type="button" onClick={()=>triggerAddNews(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add NEWS +</button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Preview NEWS</button>
        </div>
        <div className="flex flex-col sm:flex-row  w-full items-center justify-around">
          <select  
              name="category"
              value={pageValue.category||''}
              onChange={(e)=>handlePaginationValue(e)}
              className="my-2 mx-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          >
              <option value=''>--Select NEWS Category--</option>
              <option value="sri_lankan">Sri Lankan</option>
              <option value="malaysian">Malaysian</option>
              <option value="gossip">Gossip</option>
              <option value="sport">Sport</option>
              <option value="world">World</option>
          </select>
          <select  
              name="language"
              value={pageValue.language||''}
              onChange={(e)=>handlePaginationValue(e)}
              className="my-2 mx-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          >
            <option value=''>--Select Language--</option>
            <option value="sinhala">Sinhala</option>
            <option value="english">English</option>
          </select>
          <select  
              name="sortOrder"
              value={pageValue.sortOrder||''}
              onChange={(e)=>handlePaginationValue(e)}
              className="my-2 mx-2 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          >
            <option value=''>--Select Sort Order--</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
        <table className="block sm:table min-w-80 w-full text-sm text-left text-gray-500 relative mb-10">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  hidden sm:table-header-group">
            <tr className="w-full block sm:table-row">
              <th scope="col" className="px-6 py-4 block sm:table-cell">#</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Topic</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Publish Date</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Action</th>
            </tr>
          </thead>
          <tbody className='w-full block sm:table-row-group'>
            {adminNewsCount !== 0 ? 
            adminNews.map((news,index)=>(
              <tr key={index} className="customize-tr w-full block sm:table-row odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                <td data-label="#" className="table-data-header block sm:table-cell px-4 py-4">{index+1}</td>
                <td data-label="TOPIC" className="w-full table-data-header block sm:table-cell px-4 py-4">{news.topic}</td>
                <td data-label="PUBLISH DATE" className="w-full table-data-header block sm:table-cell px-4 py-4 text-nowrap">{news.createdAt.split("T",1)}</td>
                <td data-label="ACTION" className="w-full table-data-header block sm:table-cell px-4 py-4">
                  <div className='flex flex-col md:flex-row'>
                    <button type="button" onClick={()=>triggerUpdateNews(true, news)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                    {news.isDisable ? 
                      <button type="button" onClick={()=>request(true, 'active', news)} className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:green-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-green-900">Active</button>
                    :
                      <button type="button" onClick={()=>request(true, 'disable', news)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Disable</button>
                    }
                    <button type="button" onClick={()=>request(true, 'delete', news)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))
            : 
              <tr>
                <td colSpan="4" className=" w-screen h-60 bg-white">
                  <div className="flex flex-col items-center justify-center w-full">
                  <p className="text-3xl sm:text-5xl font-bold text-gray-300">ADD A NEW NEWS</p>
                  </div>
                </td>
              </tr>}
          </tbody>
        </table>
        <Pagination
          align={"center"}
          defaultCurrent={currentPage}
          current={currentPage}
          total={adminNewsCount}
          pageSize={10}
          showLessItems={true}
          showSizeChanger={true}
          hideOnSinglePage={true}
          className="flex flex-row p-5 items-center justify-center"
          onChange={handlePagination}
          itemRender={handleItemRender}
          prevIcon={"<"}
          nextIcon={">"}
          jumpPrevIcon={"<<"}
          jumpNextIcon={">>"}
        />
        <NewsDisableDeleteAlert visible={disableDeleteStatus} close={requestStatus} data={disableDeleteData}/>
    </div>
  ) : 
  <>
   {addNewsStatus && <NewsAddForm close={triggerAddNews}/>}
   {updateNewsStatus && <NewsUpdateForm close={triggerUpdateNews} data={updateNewsData}/>} 
  </>
}

export default NewsPanel