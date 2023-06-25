import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { LuUser } from 'react-icons/lu'
import {IoIosLogIn, IoIosLogOut} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { actLogout } from '../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../constants/config'
import {ImProfile} from 'react-icons/im'
export default function AccountDropdown() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.users)
    const {isLogged} = useSelector((state) => state.users)
    const handleLogout = () => {
        dispatch(actLogout())
        navigate("/auth/login")
    }

    const goProfilePage = () => {
      navigate(`profile/${user?._id}`)
    }
    
  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <div className='bg-gray-100 hover:bg-gray-300 w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer'>
                {
                  user?.picturePath ?
                  <img src={`${IMG_URL}${user?.picturePath}`} alt="" className='w-[35px] h-[35px] rounded-full object-cover'/>
                  : <LuUser size={20}/>
                }
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={goProfilePage}
                  >
                    <LuUser size={20} className='mr-3'/>
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
                {
                  isLogged ? 
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={handleLogout}
                      >
                        <IoIosLogOut size={20} className='mr-3'/>
                        Logout
                      </button>
                    )}
                  </Menu.Item> :
                  <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      <IoIosLogIn size={20} className='mr-3'/>
                      Sign in
                    </button>
                  )}
                </Menu.Item>
                }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
