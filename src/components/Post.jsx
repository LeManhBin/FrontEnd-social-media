import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {GoComment} from 'react-icons/go'
import { IMG_URL } from '../constants/config'
import PostDropdown from './PostDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { actCreateComment, actDeletePost, actLikeUnLikePost } from '../redux/features/postSlice'
import PostPopup from './PostPopup'
import ConfirmDelete from './ConfirmDelete'
import { useNavigate } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import Comment from './Comment'

const Post = ({post}) => {
  const [isLike, setIsLike] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const {user} = useSelector((state) => state.users)
  const [commentState, setCommentState] = useState({
    userId: user?._id,
    description:"",
    picturePath: ""
  })  
  const [validateCmt, setValidateCmt] = useState(false)
  const [cmtShowQuantity, setCmtShowQuantity] = useState(3)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fullName = `${post.userId.firstName} ${post.userId.lastName}`
  const commentQuantity = post?.comment?.length
  const likeQuantity =  Object.keys(post?.likes).length;
  
  const handleLikeToggle = async () => {
    dispatch(actLikeUnLikePost(post?._id, user?._id))
  }

  const closeModal = () => {
    setIsEdit(false)
  }

  function closeDeleteConfirm() {
    setIsDelete(false)
  }

  function openDeleteConfirm() {
    setIsDelete(true)
  }

  const handleShowComment = () => {
    setShowComment(!showComment)
  }
  const keyExists = user?._id in post?.likes;
  
  useEffect(() => {
    setIsLike(keyExists)
  },[keyExists])

  const handleCheckMyPost = () => {
    if(post.userId._id === user?._id) {
      setIsMyPost(true)
    }else {
      setIsMyPost(false)
    }
  }

  const handleDeletePost = () => {
    dispatch(actDeletePost(user?._id, post._id))
  } 
  //Tính thời gian
  let currentTime = new Date();
  const postTime = new Date(post?.createdAt)
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


  useEffect(() => {
    handleCheckMyPost()
  },[user])

  const goProfilePage = () => {
    navigate(`/profile/${post?.userId?._id}`)
  }

  const handleOnchangeComment = (e) => {
    const {name, value} = e.target;
    setCommentState({
      ...commentState,
      [name]: value
    })
  }


  const handleCreateComment = () => {
    if(!commentState.description || !commentState.userId) {
      setValidateCmt(true)
    }else {
      dispatch(actCreateComment(post?._id, commentState));
    }
    setCommentState({
      ...commentState,
      description: ""
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if(!commentState.description || !commentState.userId) {
        setValidateCmt(true)
      }else {
        dispatch(actCreateComment(post?._id, commentState));
        setCommentState({
          ...commentState,
          description: ""
        });
      }
    }
  };

  const handleMoreComment = () => {
    setCmtShowQuantity(cmtShowQuantity + 3)
  }

  const handleHiddenComment = () => {
    setShowComment(false)
  }
  return (
    <div className='w-full h-max bg-white shadow-md rounded-[10px] p-5'>
      {
        <PostPopup isOpen={isEdit} isEdit={isEdit} closeModal={closeModal} postId={post._id}/>
      }
      {
        <ConfirmDelete isOpen={isDelete} closeModal={closeDeleteConfirm} handleDelete={handleDeletePost}/>
      }
       <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
            <img onClick={goProfilePage} src={post?.userId?.picturePath ? `${IMG_URL}${post?.userId?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='cursor-pointer w-[50px] object-cover h-[50px] rounded-full'/>
            <div className='flex flex-col'>
              <span className='font-semibold'>{fullName}</span>
              <span className='text-[12px] opacity-70'>{handleTimeCreatePost()}</span>
            </div>
        </div>
        <div>
          {
            isMyPost && <PostDropdown setIsEdit={setIsEdit} setIsDelete={setIsDelete}/>
          }
        </div>
       </div>
       <div className='mt-5'>
          <span>{post.description}</span>
          <img src={`${IMG_URL}${post.picturePath}`} alt="" className='w-full object-cover'/>
       </div>
       <div className='mt-4'>
          <div className='flex items-center justify-between border-b-[1px] pb-3'>
            <div className='flex items-center gap-2'>
              <AiFillHeart size={20} className="text-red-400"/>
              <span className='text-[12px]'>{likeQuantity}</span>
            </div>
            <div>
              <span className='opacity-70'>{commentQuantity} bình luận</span>
            </div>
          </div>
          <div className='mt-5 flex items-center justify-between'>
            <button className='flex items-center gap-2'  onClick={handleLikeToggle}>
              {
                isLike ? 
                <AiFillHeart size={20} className="text-red-400"/>
                :
                <AiOutlineHeart size={20}/>
              }
              Thích
            </button>
            <div className='flex items-center gap-2 cursor-pointer' onClick={handleShowComment}>
              <GoComment/>
              Bình luận
            </div>
          </div>
          {
            showComment &&
            <div className='border-t-[1px] py-5 mt-3'>
              <div className='flex items-center justify-between gap-3'>
                <img onClick={goProfilePage} src={post?.userId?.picturePath ? `${IMG_URL}${post?.userId?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='cursor-pointer w-[30px] h-[30px] rounded-full'/>
                <div className='border-[1px] w-[90%] rounded-md overflow-hidden flex items-center relative'>
                  <input type="text" placeholder='Viết bình luận của bạn' className='outline-none px-[10px] py-[5px]' name='description' value={commentState.description} onChange={handleOnchangeComment} onKeyDown={handleKeyDown}/>
                  <button className='absolute right-2 cursor-pointer' onClick={handleCreateComment} >
                    <IoMdSend size={20} className='text-blue-500'/>
                  </button>
                </div>
              </div>
            <div className=''> 
              {
                post.comment.slice(0, cmtShowQuantity).map(cmt => {
                  return(
                    <Comment cmt={cmt} key={cmt._id}/>
                  )
                })
              }
              {
                post.comment.length > 3 &&
                <div className='flex justify-between items-center'>
                  <button className='font-bold mt-5 opacity-70' onClick={handleMoreComment}>Xem thêm bình luận</button>
                  <button className='font-bold mt-5 opacity-70' onClick={handleHiddenComment}>Ẩn bình luận</button>
                </div>
              }
            </div>
            </div>
          }
       </div>
    </div>
  )
}

export default Post