import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { locationData } from '../constants/location'
import { useDispatch, useSelector } from 'react-redux'
import { actGetMyUser, actUpdateProfile } from '../redux/features/userSlice'

export default function ChangeProfile({user}) {
  let [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(locationData[236])
  const [infoUser, setInfoUser] = useState(user)
  const dispatch = useDispatch()
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setInfoUser({
        ...infoUser,
        [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataUpdate = {
        ...infoUser,
        location: selected.name
    }
    if(user?._id) {
        dispatch(actUpdateProfile(user?._id,dataUpdate))
        dispatch(actGetMyUser(user?._id))
        closeModal()
    }
    closeModal()
  }


  return (
    <>
      <div className="flex items-center justify-center">
        <button onClick={openModal} className='px-[10px] py-[5px] bg-gray-200 font-semibold rounded-[5px]'>Chỉnh sửa trang cá nhân</button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-max transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center border-b-[1px] pb-1 mb-2 font-bold leading-6 text-gray-900"
                  >
                    Chỉnh sửa thông tin cá nhân
                  </Dialog.Title>
                    <form action="" className='flex flex-col gap-2 ' onSubmit={handleSubmit} >
                        <div className='flex flex-col '>
                            <label htmlFor="" className='text-[14px] font-semibold'>Họ <span className='text-red-500'>*</span> </label>
                            <input type="text" placeholder='Bridget' name='firstName'
                            className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'
                            value={infoUser?.firstName}
                            onChange={handleOnChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='text-[14px] font-semibold'>Tên <span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='Join' name='lastName' className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'
                            value={infoUser?.lastName}
                            onChange={handleOnChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='text-[14px] font-semibold'>Email <span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='example@mail.com' name='email' disabled={true} className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'
                            value={infoUser?.email}
                            onChange={handleOnChange}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='text-[14px] font-semibold'>Quốc tịch <span className='text-red-500'>*</span></label>
                            <Listbox value={selected} onChange={setSelected}>
                                <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default border-[1px] text-left border-gray-200 outline-none px-[10px] py-[5px] rounded-sm">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {locationData.map((location, index) => (
                                        <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={location}
                                        >
                                        {({ selected }) => (
                                            <>
                                            <span
                                                className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                                }`}
                                            >
                                                {location.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                                                <BiCheck size={18} className='text-green-500'/>
                                                </span>
                                            ) : null}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                    </Listbox.Options>
                                </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='text-[14px] font-semibold'>Nghề nghiệp</label>
                            <input type="text" placeholder='Developer' name='occupation' className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'
                            value={infoUser?.occupation}
                            onChange={handleOnChange}
                            />
                        </div>
                        <button type='submit' className='bg-blue-500 px-[10px] py-[7px] text-white font-semibold text-[14px] rounded-sm mt-2'>Chỉnh sửa</button>
                    </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
