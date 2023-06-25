import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IMG_URL } from '../constants/config'
import {BsFillCameraFill, BsImages} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { actCreatePost, actGetPostById, actUpdatePost } from '../redux/features/postSlice'
export default function PostPopup({isOpen, closeModal, isEdit, postId}) {
  const {user} = useSelector((state) => state.users)
  const {post} = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const [postState, setPostState] = useState("")  
  const [postEdit, setPostEdit] = useState(post)  
  const [descEdit, setDescEdit] = useState(post?.data?.[0]?.description)
  const [file, setFile] = useState("")
  const [fileEdit, setFileEdit] = useState("")
  const [imageURL, setImageURL] = useState('');


  useEffect(() => {
    setPostEdit(post)
    setDescEdit(post?.data?.[0]?.description)
  },[isEdit, post])

  const handleOnChangeFile = (e) => {
      const files = event.target.files[0]; 
      setFile(files)
      e.target.value = null
  }

  useEffect(() => {
      return () => {
        file && URL.revokeObjectURL(file.name)
      }
  },[file])
  // Edit
  const handleOnChangeFileEdit = (e) => {
      const files = event.target.files[0]; 
      setFileEdit(files)
      const url = URL.createObjectURL(files);
      setImageURL(url);
      e.target.value = null
  }

  const handleRemoveImage = () => {
    setImageURL(null)
  }

  useEffect(() => {
      return () => {
        file && URL.revokeObjectURL(file.name)
      }
  },[file])

  useEffect(() => {
    if (postId) {
      dispatch(actGetPostById(postId))
    }
    setImageURL(null)
  }, [postId, dispatch, isOpen])

  const handlePost = async() => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", postState);
    if (file) {
      formData.append("picture", file);
      formData.append("picturePath", file.name);
    }
    dispatch(actCreatePost(formData))
    closeModal()
    setFile(null)
    setPost("")
  }

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("description", descEdit)
    if (fileEdit) {
      formData.append("picture", fileEdit);
      formData.append("picturePath", fileEdit.name);
    }
    const infoPost = {
      userId: user?._id,
      postId: postId
    }
    dispatch(actUpdatePost(infoPost, formData))
    closeModal()
    setFileEdit(null)
    setPostEdit("")
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[55]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center overflow-auto">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-center leading-6 text-gray-900 border-b-[1px] pb-3"
                  >
                    {
                      isEdit ? 
                      <span>Chỉnh sửa bài viết</span> :
                      <span>Tạo bài viết</span>  
                    }

                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='flex items-center gap-3 mb-2'>
                        <img src={user?.picturePath ? `${IMG_URL}${user.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='w-[50px] h-[50px] rounded-[50%] object-cover '/>
                        <div className='flex flex-col'>
                            <span className='font-semibold'>{`${user?.firstName} ${user?.lastName}`}</span>
                            <select name="" id="">
                                <option value="">Công khai</option>
                                <option value="">Bạn bè</option>
                                <option value="">Chỉ mình tôi</option>
                            </select>
                        </div>
                    </div>
                    {
                      isEdit ? 
                      <textarea cols="20" rows="5" className='w-full outline-none' placeholder={`Nhập nội dung cần chỉnh sửa`} value={descEdit} onChange={(e) => setDescEdit(e.target.value)}></textarea>
                      :
                      <textarea cols="20" rows="5" className='w-full outline-none' placeholder={`${user?.lastName} ơi bạn đang nghĩ gì thế ?`} onChange={(e) => setPostState(e.target.value)}></textarea>
                    }
                    
                    {
                      isEdit ?
                        <div className='relative image'>
                          {
                            post?.data?.[0]?.picturePath ? 
                            <div>
                              <button onClick={handleRemoveImage} className='z-30 absolute right-[-10px] top-[-10px] p-[7px] bg-gray-400 rounded-full cursor-pointer font-bold'><GrClose size={20}/></button>
                              <img src={`${
                                imageURL ? imageURL : `${IMG_URL}${post?.data?.[0]?.picturePath}`
                              }`} alt="" className='w-full object-cover '/>
                              <div className='overlay hidden absolute inset-0 bg-black opacity-70 ease-in-out duration-500'>
                                <div className='flex justify-center items-center w-full h-full'>
                                  <input type="file" id='img-edit' className='hidden' onChange={(e) => handleOnChangeFileEdit(e)}/>
                                  <label htmlFor="img-edit" className='bg-white px-[10px] py-[5px] rounded-md font-bold cursor-pointer flex items-center flex-nowrap gap-1'>Hình ảnh <BsFillCameraFill size={20}/> </label>
                                </div>
                              </div>
                            </div> :
                            <div className='flex flex-col'>
                                <input type="file" id='image' className='hidden' onChange={(e) => handleOnChangeFileEdit(e)}/>
                                <label htmlFor="image" className='cursor-pointer border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm flex items-center justify-between'>
                                 <span>
                                     {
                                         fileEdit ? fileEdit.name : "image.png"
                                     }
                                 </span>
                                 <span className='text-[12px] text-white font-semibold bg-slate-500 px-[8px] py-[4px] rounded-[5px] flex items-center'><BsImages size={20} className='mr-3'/>Thêm ảnh</span>                        </label>
                            </div>
                          }
                        </div>
                      :
                        <div className='flex flex-col'>
                            <input type="file" id='avatar' className='hidden' onChange={(e) => handleOnChangeFile(e)}/>
                            <label htmlFor="avatar" className='cursor-pointer border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm flex items-center justify-between'>
                                <span>
                                    {
                                        file ? file.name : "image.png"
                                    }
                                </span>
                                <span className='text-[12px] text-white font-semibold bg-slate-500 px-[8px] py-[4px] rounded-[5px] flex items-center'><BsImages size={20} className='mr-3'/>Thêm ảnh</span>                        </label>
                        </div>
                    }
                  </div>

                  <div className="mt-4 flex justify-center">
                    {
                      isEdit ?
                      <button
                        type="button"
                        className="inline-flex w-full font-bold justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleUpdate}
                      >
                        Chỉnh sửa
                      </button> :
                      <button
                        type="button"
                        className="inline-flex w-full font-bold justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handlePost}
                      >
                        Đăng
                      </button>
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
