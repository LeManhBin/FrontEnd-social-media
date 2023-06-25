import React, { useEffect, useState } from 'react'
import {MdAddAPhoto} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { actGetPostsByUser } from '../redux/features/postSlice'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { actAddRemoveFriend, actGetUserById } from '../redux/features/userSlice'
import { IMG_URL } from '../constants/config'
import {RiMessage3Fill} from "react-icons/ri"
import {ImUserPlus} from "react-icons/im"
import ChangeProfile from '../components/ChangeProfile'
import ChangeAvatar from '../components/ChangeAvatar'
import Loading from '../components/Loading'
const ProfilePage = () => {
  const dispatch = useDispatch()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const {userById, user, isLoadingCreate} = useSelector((state) => state.users)
  const {posts, isLoadingCreatePost} = useSelector((state) => state.posts)
  const {userId} = useParams()
  const fullName = `${userById?.firstName} ${userById.lastName}`
  const friendQuantity = userById?.friends?.length
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    dispatch(actGetPostsByUser(userId))
    dispatch(actGetUserById(userId))
  },[userId])

  const handleCheckMyProfile = () => {
    if(user?._id === userId) {
      setIsMyProfile(true)
    }else {
      setIsMyProfile(false)
    }
  }
  
  const handleCheckFriend = () => {
    if (userId.includes(user.friends)) {
      setIsFriend(true)
    } else {
      setIsFriend(false)
    }
  }

  useEffect(() => {
    handleCheckMyProfile()
    handleCheckFriend()
  })

  const addRemoveFriend = () => {
    dispatch(actAddRemoveFriend(user?._id, userId))
    handleCheckFriend()
  }

  return (
    <div className='h-max mt-[60px] pb-10'>
      {
        isLoadingCreate && isLoadingCreatePost && <Loading/>
      }
        <div className='h-[60vh] bg-white'>
          <div className='relative max-w-[1300px] h-[70%] mx-auto' style={{backgroundImage: "url('https://images.unsplash.com/photo-1519882189396-71f93cb4714b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGZsb3dlcnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')", backgroundRepeat: 'no-repeat',backgroundSize: '100%'}}>
              <div className='w-full absolute bottom-[-120px] px-5 flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-5'>
                  <div className='flex gap-5 items-center max-sm:flex-col max-sm:items-center'>
                      <div className='relative'>
                        <img src={userById?.picturePath ? `${IMG_URL}${userById?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-white'/>
                        {
                          isMyProfile &&
                          <div className='absolute right-[20px] bottom-0'>
                            <ChangeAvatar user={user}/>
                          </div>
                        }
                      </div>
                      <div className='flex flex-col max-sm:items-center '>
                          <span className='text-[22px] font-bold'>{fullName}</span>
                          <span className='opacity-70'>{userById?.occupation}</span>
                          <span className='text-[11px]'>{friendQuantity} bạn bè</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-1 flex-wrap max-sm:justify-center'>
                   {
                    !isMyProfile 
                    && <>
                      {
                         isFriend ? <button className='px-[10px] py-[5px] bg-gray-200 font-semibold rounded-[5px] flex items-center gap-1' onClick={addRemoveFriend}><ImUserPlus size={20}/> Huỷ kết bạn</button>
                         :
                         <button className='px-[10px] py-[5px] bg-gray-200 font-semibold rounded-[5px] flex items-center gap-1' onClick={addRemoveFriend}><ImUserPlus size={20}/> Thêm bạn bè</button>
                      }
                    </>
                   }
                    <button className='px-[10px] py-[5px] bg-gray-200 font-semibold rounded-[5px] flex items-center gap-1'><RiMessage3Fill size={20}/>Nhắn tin</button>
                    {
                      isMyProfile &&
                      <ChangeProfile user={user}/>
                    }
                  </div>
              </div>
          </div>
        </div>
        <div className='max-w-[1300px] mx-auto mt-5 flex flex-col gap-5 px-[100px] max-sm:px-[20px]'>
            {
              posts?.data?.map(post => {
                return(
                  <Post key={post?._id} post={post}/>
                )
              })
            }
        </div>
    </div>
  )
}

export default ProfilePage