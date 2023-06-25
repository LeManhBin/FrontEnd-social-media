import React from 'react'
import { GrClose } from 'react-icons/gr'

const SearchHistory = () => {
  return (
    <div className='flex items-center justify-between hover:bg-gray-200 px-2 py-1 rounded-md mt-3'>
        <div className='flex items-center gap-2 w-[90%] cursor-pointer'>
            <img src="" alt="" className='w-[35px] h-[35px] border-[1px] rounded-full' />
            History
        </div>
        <div className='p-2 bg-transparent hover:bg-gray-400 rounded-full'>
            <GrClose size={15} className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default SearchHistory