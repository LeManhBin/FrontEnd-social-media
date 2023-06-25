import React, { useEffect, useState } from 'react'
import { IMG_URL } from '../constants/config'
import { useDispatch, useSelector } from 'react-redux';
import { actGetUserById } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import CommentDropdown from './CommentDropdown';
import ConfirmDelete from './ConfirmDelete';
import { actDeleteComment, actUpdateComment } from '../redux/features/postSlice';
import { IoMdSend } from 'react-icons/io';
const Comment = ({cmt}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.users)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const fullName = `${cmt?.userId?.firstName} ${cmt?.userId?.lastName}`
    const [isMyComment, setIsMyComment] = useState(false);
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState({
      userId: user?._id,
      description: cmt?.description
    })
    const handleCheckMyComment = () => {
      if(cmt?.userId?._id === user?._id) {
        setIsMyComment(true)
      }else {
        setIsMyComment(false)
      }
    }

    function closeDeleteConfirm() {
      setIsDelete(false)
    }

    useEffect(() => {
      handleCheckMyComment()
    },[])

    const handleDeleteComment = () => {
      dispatch(actDeleteComment(cmt?._id))
    }

    const handleOnChange = (e) => {
     const {name, value} = e.target;
     setUpdateData({
      ...updateData,
      description: value
     })
    } 

    const handleUpdateComment = () => {
      if(!updateData.userId || !updateData.description || !cmt?._id) {
        console.log("Ủa alo");
      }else {
        dispatch(actUpdateComment(cmt?._id, updateData))
        setIsEdit(false)
      }
    }

    const handleUpdateCommentEnter = (e) => {
      if (e.key === "Enter") {
        if(!updateData.userId || !updateData.description || !cmt?._id) {
          console.log("Ủa alo");
        }else {
          dispatch(actUpdateComment(cmt?._id, updateData))
          setIsEdit(false)
        }
      }
    }

    
    const goProfilePage = () => {
      navigate(`/profile/${cmt?.userId?._id}`)
    }

    //Tính thời gian
    let currentTime = new Date();
    const postTime = new Date(cmt?.createdAt)
    let timeDifference = currentTime.getTime() - postTime.getTime();
  
    // Kiểm tra nếu thời gian chênh lệch nhỏ hơn 60 giây
    const handleTimeCreatePost = () => {
      let time = 0
      if (timeDifference < 60000) {
        time = "Vừa xong"
      } else if (timeDifference < 3600000) { // Kiểm tra nếu thời gian chênh lệch nhỏ hơn 60 phút
        let minutes = Math.floor(timeDifference / 60000);
        time = minutes + " phút trước"
      } else if (timeDifference < 86400000) { // Kiểm tra nếu thời gian chênh lệch nhỏ hơn 24 giờ
        let hours = Math.floor(timeDifference / 3600000);
        time = hours + " giờ trước"
      } else { // Thời gian chênh lệch lớn hơn hoặc bằng 24 giờ
        let days = Math.floor(timeDifference / 86400000);
        time = days + " ngày trước"
      }
      return time
    }
  
  return (
    <div className='flex items-center justify-between gap-3 mt-5'>
      {
        <ConfirmDelete isOpen={isDelete} closeModal={closeDeleteConfirm} handleDelete={handleDeleteComment}/>
      }
      <div className='flex justify-between gap-3 w-full'>
        <img onClick={goProfilePage} src={cmt?.userId?.picturePath ? `${IMG_URL}${cmt?.userId?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='cursor-pointer w-[30px] h-[30px] rounded-full'/>
        <div className='w-[90%] bg-gray-100 px-5 py-2 rounded-md'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold whitespace-nowrap'>{fullName} <span className='ml-1 text-[12px] font-medium opacity-70'>{handleTimeCreatePost()}</span></p>
            {
              isMyComment && <CommentDropdown setIsEdit={setIsEdit} setIsDelete={setIsDelete}/>
            }
          </div>
          {
            isEdit ?
            <div className='border-[1px] w-[90%] bg-white rounded-md overflow-hidden flex items-center relative'>
              <input type="text" placeholder='Viết bình luận của bạn' className='outline-none px-[10px] py-[5px]' name='description' value={updateData?.description} onChange={handleOnChange} onKeyDown={handleUpdateCommentEnter}/>
              <button className='absolute right-2 cursor-pointer' onClick={handleUpdateComment} >
                <IoMdSend size={20} className='text-blue-500'/>
              </button>
            </div>
            : <p className='opacity-80 text-[14px] w-full'>{cmt?.description}</p>
          }
        </div>
      </div>
    </div>
  ) 
}

export default Comment