import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react' 
import { BsFillCameraFill } from 'react-icons/bs'
import { MdAddAPhoto } from 'react-icons/md'
import { IMG_URL } from '../constants/config'
import { useDispatch } from 'react-redux'
import { actChangeAvatar } from '../redux/features/userSlice'

const ChangeAvatar = ({user}) => {

  let [isOpen, setIsOpen] = useState(false)
  const [avatar, setAvatar] = useState("")
  const [imageURL, setImageURL] = useState("")
  const dispatch = useDispatch()
  const handleOnChangeFile = (e) => {
    const files = event.target.files[0]; 
    setAvatar(files)
    e.target.value = null
    const url = URL.createObjectURL(files);
    setImageURL(url);
  }

  useEffect(() => {
      return () => {
        avatar && URL.revokeObjectURL(avatar.name)
      }
  },[avatar])

  useEffect(() => {
    if(isOpen === false) {
      setImageURL(null)
    }
  },[isOpen])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleChangeAvatar = () => {
    const formData = new FormData();
    if (avatar) {
      formData.append("picture", avatar);
      formData.append("picturePath", avatar.name);
    }
    dispatch(actChangeAvatar(user?._id, formData))
    console.log(avatar);
    closeModal()
  }

  return (
    <>
      <button onClick={openModal} className=' w-7 h-7 bg-gray-200 flex justify-center items-center rounded-full cursor-pointer'>
        <MdAddAPhoto size={18}/>
      </button>
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
                    <span>Chỉnh sửa ảnh đại diện</span> 

                  </Dialog.Title>
                  <div className="mt-2">
                      <div className='relative image'>
                        <div>
                            {
                              imageURL ?
                              <img src={imageURL} alt="avatar" className='object-cover border-[3px] border-white' />
                              :
                              <img src={user?.picturePath ? `${IMG_URL}${user?.picturePath}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} alt="avatar" className='object-cover border-[3px] border-white' />
                            }
                            <div className='overlay hidden absolute inset-0 bg-black opacity-70 ease-in-out duration-500'>
                              <div className='flex justify-center items-center w-full h-full'>
                                <input type="file" id='img-edit' className='hidden' onChange={(e) => handleOnChangeFile(e)}/>
                                <label htmlFor="img-edit" className='bg-white px-[10px] py-[5px] rounded-md font-bold cursor-pointer flex items-center flex-nowrap gap-1' >Hình ảnh <BsFillCameraFill size={20}/> </label>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        onClick={handleChangeAvatar}
                        className="inline-flex w-full font-bold justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Chỉnh sửa
                    </button> 
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

export default ChangeAvatar