import React from 'react'

const NewsDisableDeleteAlert = () => {
  return (
        <div className="absolute  left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center" style={{backgroundColor:"rgba(0, 0 ,0, 0.4)"}}>
            <div className="bg-white rounded-lg p-5">
                <p className="text-2xl sm:text-3xl font-bold">Are you wont to delete this NEWS?</p>
                <p className="text-1xl sm:text-2xl text-center">UNESCO Director-General in SL</p>
                <div className="w-full flex flex-row justify-evenly mt-8">
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-36">Yes</button>
                    <button type="button" className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900 w-36">No</button>
                </div>
            </div>

        </div>
  )
}

export default NewsDisableDeleteAlert