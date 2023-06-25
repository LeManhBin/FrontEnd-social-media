import React from 'react'
import { Outlet } from 'react-router-dom'

const LoginLayout = () => {
  return (
    <div className='h-screen max-w-[1300px] mx-auto'>
        <Outlet/>
    </div>
  )
}

export default LoginLayout