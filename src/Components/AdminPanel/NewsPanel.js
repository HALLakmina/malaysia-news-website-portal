import React, { useState } from 'react'
import NewsAddForm from './NewsPanel/NewsAddForm'
import NewsUpdateForm from './NewsPanel/NewsUpdateForm'
import NewsDisableDeleteAlert from './NewsPanel/NewsDisableDeleteAlert'
const NewsPanel = () => {
  const [addNewsStatus, setAddNewsStatus] = useState(false)
  const [updateNewsStatus, setUpdateNewsStatus] = useState(false)
  const [disableDeleteStatus,setDisableDeleteStatus] = useState(false)
  const [updateNewsData, setUpdateNewsData] = useState('')
  const [disableDeleteData, setDisableDeleteData] = useState({type:'',id:''})

  const triggerAddNews = (state)=>{
    setAddNewsStatus(state)
  }
  const triggerUpdateNews = (state, data)=>{
    setUpdateNewsStatus(state)
    setUpdateNewsData(data)
  }
  const request = (state, type, id)=>{
    requestStatus(state)
    setDisableDeleteData({type:type, id:id})
  }
  const requestStatus = (state) => {
    setDisableDeleteStatus(state)
  }
  return !addNewsStatus && !updateNewsStatus ?  (
    <div>
      <h1 className="text-center my-8 text-4xl sm:text-5xl font-bold">NEWS PANEL</h1>
        <p>Total NEWS #</p>
        <div className="flex flex-row items-center justify-between my-5">
          <button type="button" onClick={()=>triggerAddNews(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add NEWS +</button>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Preview NEWS</button>
        </div>
        <table className="block sm:table min-w-80 w-full text-sm text-left text-gray-500 relative">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  hidden sm:table-header-group">
            <tr className="w-full block sm:table-row">
              <th scope="col" className="px-6 py-4 block sm:table-cell">#</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Topic</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Publish Date</th>
              <th scope="col" className="px-6 py-4 block sm:table-cell">Action</th>
            </tr>
          </thead>
          <tbody className='w-full block sm:table-row-group'>
            <tr className="w-full block sm:table-row odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
              <td data-label="#" className="table-data-header block sm:table-cell px-4 py-4">01</td>
              <td data-label="TOPIC" className="w-full table-data-header block sm:table-cell px-4 py-4">UNESCO Director-General in SL</td>
              <td data-label="PUBLISH DATE" className="w-full table-data-header block sm:table-cell px-4 py-4">2024/10/02</td>
              <td data-label="ACTION" className="w-full table-data-header block sm:table-cell px-4 py-4">
                <div className='flex flex-col md:flex-row'>
                  <button type="button" onClick={()=>triggerUpdateNews(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                  <button type="button" onClick={()=>request(true, 'disable', "data")} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Disable</button>
                  <button type="button" onClick={()=>request(true, 'delete', "data")} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <NewsDisableDeleteAlert visible={disableDeleteStatus} close={requestStatus} data={disableDeleteData}/>
    </div>
  ) : 
  <>
   {addNewsStatus && <NewsAddForm close={triggerAddNews}/>}
   {updateNewsStatus && <NewsUpdateForm close={triggerUpdateNews} data={updateNewsData}/>} 
  </>
}

export default NewsPanel