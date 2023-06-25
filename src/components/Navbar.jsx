import React, { useState } from 'react';
import {TiSocialVimeo} from "react-icons/ti";
import {CiSearch} from "react-icons/ci";
import {AiFillBell, AiFillHome, AiFillMessage, AiOutlineTeam} from "react-icons/ai"
import {FaGamepad, FaStore} from "react-icons/fa"
import {HiArrowLeft, HiMenuAlt3} from "react-icons/hi"
import { NavLink } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { MdOndemandVideo } from 'react-icons/md';
import SearchHistory from './SearchHistory';

const Navbar = () => {
    const {user} = useSelector((state) => state.users)
    const [isToggle, setIsToggle] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const styleActive = ({isActive}) => {
        return {
          color: isActive ? '#1d4ed8' : '#000',
          display: "flex",
          flexWrap: "nowrap",
          gap: "5px",
          justifyItems: "flex-start",
          cursor: "pointer"
        }
    }

    const handleToggle = () => {
        setIsToggle(!isToggle)
    }
  return (
    <div className=' flex items-center justify-between px-5 max-sm:px-2 py-1 h-[60px] shadow-xl fixed top-0 right-0 left-0 bg-white z-50'>
        <div className='relative flex items-center flex-1 gap-5 max-sm:gap-2'>
            <TiSocialVimeo size={40} className='cursor-pointer'/>
            <div className={`${isSearch && `bg-white shadow-md fixed z-40 top-0 left-0 max-sm:right-0 py-[10px] px-[20px]`}`}>
                <div className='flex items-center gap-2 '>
                    {
                        isSearch &&
                        <HiArrowLeft size={20} className='cursor-pointer' onClick={() => setIsSearch(false)}/>
                    }
                    <div className={`flex items-center gap-1 border-[1px] border-neutral-200 rounded-full overflow-hidden px-2 py-1`}>
                        <CiSearch size={20} onClick={() => setIsSearch(true)}/>
                        <input type='text' placeholder="Tìm kiếm trên này..." className={`outline-none max-md:w-0  ${isSearch && ' max-md:w-full '} `} onFocus={() => setIsSearch(true)}/>
                    </div>
                </div>
                {
                    isSearch &&
                    <div className='max-h-[500px] overflow-auto'>
                        <p className='text-center py-2 mt-5'>Chưa có tìm kiếm nào</p>
                        <SearchHistory/>
                    </div>
                }
            </div>
        </div>
        <div className={`overlay fixed inset-0 bg-black opacity-70 z-50 ${!isToggle && 'hidden'}`} onClick={() => setIsToggle(false)}>
        </div>
        <ul className={`flex-1 flex items-center justify-evenly max-md:flex-col max-md:justify-start max-md:gap-7 max-md:bg-gray-300 max-md:absolute ${isToggle ? 'max-md:right-0' : 'max-md:right-[-100%]'} max-md:top-0 max-md:bottom-0 max-md:w-[80vw] max-md:z-[999] ease-in-out duration-500 max-md:h-screen max-md:pl-[70px] max-md:pt-[50px]`}>
            <button className='absolute top-[10px] left-[20px] cursor-pointer md:hidden' onClick={handleToggle}>
                <GrClose size={20}/>
            </button>
            <li className='hover:bg-gray-200 w-full flex justify-center py-[7px] rounded-md max-md:justify-start max-md:w-full'>
                <NavLink style={styleActive} to={"/"}>
                    <AiFillHome size={20}/>
                    <span className='font-bold md:hidden'>Trang chủ</span>
                </NavLink>
            </li>
            <li className='hover:bg-gray-200 w-full flex justify-center py-[7px] rounded-md max-md:justify-start max-md:w-full'>        
                <NavLink style={styleActive} to={"/watch"}>
                    <MdOndemandVideo size={20}/>
                    <span className='font-bold md:hidden'>Watch</span>
                </NavLink>
            </li>
            <li className='hover:bg-gray-200 w-full flex justify-center py-[7px] rounded-md max-md:justify-start max-md:w-full'>
                <NavLink style={styleActive} to={"/store"}>
                    <FaStore size={20}/>
                    <span className='font-bold md:hidden'>Cửa hàng</span>
                </NavLink>
            </li>
            <li className='hover:bg-gray-200 w-full flex justify-center py-[7px] rounded-md max-md:justify-start max-md:w-full'>
                <NavLink style={styleActive} to={"/team"}>
                    <AiOutlineTeam size={20}/>
                    <span className='font-bold md:hidden'>Bạn bè</span>
                </NavLink>
            </li>
            {/* <li className='hover:bg-gray-200 w-full flex justify-center py-[7px] rounded-md max-md:justify-start max-md:w-full'>
                <NavLink style={styleActive} to={"/game"}>
                    <FaGamepad size={20}/>
                    <span className='font-bold md:hidden'>Trò chơi</span>
                </NavLink>
            </li> */}
        </ul>
        <div className='flex-1 flex items-center justify-end gap-5'>
            <button className='bg-gray-100 hover:bg-gray-300 w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer md:hidden' onClick={handleToggle}>
                <HiMenuAlt3 size={20}/>
            </button>
            <button className='bg-gray-100 hover:bg-gray-300 w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer'>
                <AiFillMessage size={20}/>
            </button>
            <button className='bg-gray-100 hover:bg-gray-300 w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer'>
                <AiFillBell size={20}/>
            </button>
            <button>
                <AccountDropdown user={user}/>
            </button>
        </div>
    </div>
  )
}

export default Navbar
