import React, { useEffect } from 'react'
import { TiSocialVimeo } from 'react-icons/ti'
import { locationData } from '../constants/location'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {BiCheck} from "react-icons/bi"
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../constants/registerSchema'
import { useDispatch, useSelector } from 'react-redux'
import { actRegister } from '../redux/features/userSlice'
import registerImg from "../../public/assets/images/register.jpg"
const RegisterPage = () => {
    const [selected, setSelected] = useState(locationData[236])
    const [isShow, setIsShow] = useState(false)
    const [file, setFile] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isRegisterSuccess} = useSelector((state) => state.users)
    const handleLoginPage = () => {
        navigate("/auth/login")
    }
    const handleToggleShow = () => {
        setIsShow(!isShow)
    }

    const handleOnChangeAvatar = (e) => {
        const files = event.target.files[0]; 
        console.log(files);
        setFile(files)
    }

    //validate
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        const formData = new FormData();
        const dataRegister = {
            ...data,
            location: selected.name
        }
        for (const key in dataRegister) {
            formData.append(key, dataRegister[key]);
        }
        formData.append("picture", file)
        dispatch(actRegister(formData))
        if(isRegisterSuccess === true) {
            reset();
            setFile(null)
            handleLoginPage()
        }
        console.log(isRegisterSuccess);
    };
    

  return (
    <div className='flex w-[100%] h-full mx-auto items-center'>
        <div className='bg-[#FFE7CB] overflow-hidden flex-1 h-[90%] rounded-md px-7 py-10 max-lg:hidden'>
            <TiSocialVimeo size={40}/>
            <h1 className='text-[30px] font-bold mt-[100px] mb-5'>Tham gia với chúng tôi để kết nối với thế giới và tạo ra những điều mới</h1>
            <img src={registerImg} alt="" />
        </div>
        <div className='flex-1 h-[90%] max-sm:h-screen max-lg:items-center px-7 py-10 max-lg:py-5 flex flex-col justify-between'>
            <div className='flex flex-col max-lg:items-center max-lg:mb-5'>
                <h1 className='text-[30px] font-bold mb-3'>Get started</h1>
                <span className='text-[15px] text-gray-500 font-semibold'>Tạo tài khoản của bạn bây giờ</span>
            </div>
            <form action="" className='flex flex-col gap-2 max-lg:w-[60vw] max-sm:w-[70vw]' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-center gap-2 justify-between max-sm:flex-col '>
                    <div className='flex flex-col w-[50%] gap-1 max-lg:w-full'>
                        <label htmlFor="" className='text-[14px] font-semibold'>Họ <span className='text-red-500'>*</span> </label>
                        <input type="text" placeholder='Bridget' 
                        {...register('firstName')}
                        className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'/>
                         {errors.firstName && <p className='text-[12px] text-red-500'>{errors.firstName.message}</p>}
                    </div>
                    <div className='flex flex-col  w-[50%]  gap-1 max-lg:w-full'>
                        <label htmlFor="" className='text-[14px] font-semibold'>Tên <span className='text-red-500'>*</span></label>
                        <input type="text" placeholder='Join' {...register('lastName')} className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'/>
                        {errors.lastName && <p className='text-[12px] text-red-500'>{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-[14px] font-semibold'>Địa chỉ <span className='text-red-500'>*</span></label>
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
                    <input type="text" placeholder='Developer' {...register('occupation')} className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-[14px] font-semibold'>Ảnh đại diện</label>
                    <input type="file" id='avatar' className='hidden' onChange={(e) => handleOnChangeAvatar(e)}/>
                    <label htmlFor="avatar" className='cursor-pointer border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm flex items-center justify-between'>
                        <span>
                            {
                                file ? file.name : "image.png"
                            }
                        </span>
                        <span className='text-[12px] text-white font-semibold bg-slate-500 px-[8px] py-[4px] rounded-[5px]'>Chọn ảnh</span>
                    </label>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-[14px] font-semibold'>Email <span className='text-red-500'>*</span></label>
                    <input type="email" placeholder='example@gmail.com' {...register('email')} className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm'/>
                    {errors.email && <p className='text-[12px] text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-[14px] font-semibold'>Mật khẩu <span className='text-red-500'>*</span></label>
                    <div className='border-[1px] border-gray-200 px-[10px] py-[5px] rounded-sm flex items-center justify-between'>
                        <input type={isShow ? "text" : "password"} {...register('password')} placeholder='*******' className='outline-none w-full'/>
                        <span onClick={handleToggleShow}>
                            {
                                isShow ? <FaRegEyeSlash/> : <FaRegEye/>
                            }
                        </span>
                    </div>
                    {errors.password && <p className='text-[12px] text-red-500'>{errors.password.message}</p>}
                </div>
                <button type='submit' className='bg-blue-500 px-[10px] py-[7px] text-white font-semibold text-[14px] rounded-sm mt-2'>Đăng ký</button>
            </form>
            <div className='text-center'>
                <p className='text-gray-400'>Bạn đã có tài khoản ? <span className='text-blue-500 cursor-pointer font-semibold' onClick={handleLoginPage}>Đăng nhập</span></p>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage