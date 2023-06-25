import React from 'react'
import {FiUserCheck} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../constants/config'
const Friend = ({friend}) => {
  const navigate = useNavigate()
  const goProfilePage = () => {
    navigate(`/profile/${friend._id}`)
  }
  return (
    <div className='flex items-center justify-between w-[50%] gap-2'>
        <div className='flex items-center gap-2 '>
          <img onClick={goProfilePage} src={friend.picturePath ? `${IMG_URL}${friend.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='w-[35px] h-[35px] object-cover rounded-full'/>
          <span className='font-semibold w-[60%] opacity-70 whitespace-nowrap'>{`${friend.firstName} ${friend.lastName}`}</span>
        </div>
    </div>
  )
}

export default Friend