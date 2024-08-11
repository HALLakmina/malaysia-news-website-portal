import React from 'react'

const AdminSignIn = () => {
  return (
    <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">
        <form className="p-5 max-w-xs w-full bg-white rounded-xl">
            <p className='text-center my-8 text-xl font-bold'>WELCOME BACK AMIN!</p>
            <div className="flex flex-col my-5">
                <label className='font-bold'>E Mail</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="joinkiles@gami.com"
                    className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500'    
                />

            </div>
            <div className="flex flex-col my-5">
                <label className='font-bold'>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    placeholder="***************"
                    className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500'    
                />
            </div>
            <div className="flex flex-cole items-center justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-5 self-center">Sign In</button>
            </div>
        </form>
    </div>
  )
}

export default AdminSignIn