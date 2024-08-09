import React from 'react'

const NewsAddForm = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-5">
        <h1 className="text-center my-8 text-3xl sm:text-4xl font-bold">ADD NEW NEWS</h1>
        <form className="flex flex-col justify-start w-full">
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">TOPIC</span></label>
                <input 
                    type="text" 
                    name="topic" 
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/> 
            </div>
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">DESCRIPTION</span></label>
                <textarea 
                    type="text" 
                    rows="9"
                    required 
                    name="description" 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/> 
            </div>
            <div className="flex items-center flex-wrap justify-between">
            <select  
                name="category" value={""}   
                required 
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"
            >
                <option value=''>--Select NEWS Category--</option>
                <option value="sri_lankan">Sri Lankan</option>
                <option value="english" className="malaysian">Malaysian</option>
                <option value="english" className="gossip">Gossip</option>
                <option value="english" className="sport">Sport</option>
                <option value="english" className="world">World</option>
            </select>
            <select 
                name="language" 
                value={""}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"
            >
                <option value=''>--Select Language--</option>
                <option value="sinhala">Sinhala</option>
                <option value="english" className="">English</option>
            </select>
            <div className="sm:max-w-xs w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">Upload Image</span></label>
                <input 
                    type="file" 
                    name="image" 
                    required 
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"/>
            </div>
            <div className="sm:max-w-xs w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">Date</span></label>
                <input type="date" name="date" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"/>
            </div>
            <div className="sm:max-w-xs w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">Time</span></label>
                <input type="time" name="time" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"/>
            </div>
            </div>
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">NEWS Video Link</span></label>
                <input type="text" name="video_link" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full sm:max-w-xs">Add New NEWS</button>
            </div>
        </form>
    </div>
  )
}

export default NewsAddForm