import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
const HomeLayout = () => {
  return (
    <div className='relative mt-[60px] bg-neutral-200'>
        <Navbar/>
        <Outlet/>
    </div>

  )
}

export default HomeLayout