import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../constants/config'
import TabsStory from '../components/TabsStory'
import PostPopup from '../components/PostPopup'
import Post from '../components/Post'
import Friend from '../components/Friend'
import { actGetPosts } from '../redux/features/postSlice'
import { actGetAllFriends } from '../redux/features/userSlice'

const HomePage = () => {
  const {user, friends} = useSelector((state) => state.users)
  const fullName = `${user?.firstName} ${user.lastName}`
  let [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.posts)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleGetFriends = () => {
    dispatch(actGetAllFriends(user?._id))
  }

  useEffect(() => {
    dispatch(actGetPosts())
    handleGetFriends()
  },[]);



  return (
    <div className='flex gap-10 w-full h-full pb-2 pt-5 max-lg:pl-[100px] max-md:pr-[100px] max-sm:px-5'>
      {
        <PostPopup isOpen={isOpen} closeModal={closeModal}/>
      }
      <div className='flex-[2] h-screen overflow-auto scrollbar max-lg:hidden'>
        <div className='bg-white ml-5'>
          <div className='h-[100px] bg-slate-400 relative'>
            <img src={user?.picturePath ? `${IMG_URL}${user?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='w-[80px] h-[80px] object-cover rounded-full bg-neutral-100 absolute left-[50%] top-[50%] translate-x-[-50%] border-[3px] border-white'/>
          </div>
          <div className='flex flex-col items-center mt-[40px] pb-5 border-b-2 border-red-400'>
            <span className='font-semibold text-[18px]'>{fullName}</span>
            <span className='opacity-70'>{user?.occupation}</span>
          </div>
        </div>
      </div>
      <div className='flex-[3] h-screen overflow-auto scrollbar-hidden'>
        {/* Story */}
        <div className='w-full h-[300px] bg-white shadow-md rounded-[10px] mb-5 p-5'>
          <TabsStory/>
        </div>
        {/* Post blog */}
        <div className=' w-full h-[130px] bg-white shadow-md rounded-[10px] p-5'>
          <div className='flex items-center justify-between gap-5 border-b-[1px] pb-4' >
            <img src={user?.picturePath ? `${IMG_URL}${user?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='w-[50px] h-[50px] rounded-full object-cover '/>
            <input type="text" onClick={openModal} placeholder={`${user?.lastName} ơi bạn đang nghĩ gì thế ?`} className='w-[90%] px-[10px] py-[7px] border-[1px] bg-gray-100 outline-none rounded-full' />
          </div>
          <div className='text-center pt-2'>
              <span>Coming soon</span>
          </div>
        </div>
        {/* Posts */}
        <div className='mt-5 flex flex-col gap-5'>
          {
            posts?.data?.map(post => {
              return(
                <Post key={post?._id} post={post}/>
              )
            })
          }
        </div>
      </div>
      <div className='flex-[2] h-screen overflow-auto scrollbar max-md:hidden'>
        <span className='text-[18px] font-semibold'>Người liên hệ</span>
        <div className='mt-5 flex flex-col gap-3'>
          {
            friends?.map(friend => {
              return(
                <Friend key={friend?._id} friend={friend}/>
              )
            })
          }
        </div>
      </div>
    </div>    
  )
}

export default HomePage