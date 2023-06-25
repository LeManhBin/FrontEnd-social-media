import React, { useEffect, useState } from 'react'
import { TiSocialVimeo } from 'react-icons/ti'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { loginSchema } from '../constants/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchLogin } from '../redux/features/userSlice'
import loginImg from "../assets/images/login.jpg"
import Loading from '../components/Loading'
export const LoginPage = () => {
    const {isLogged, isLoadingCreate} = useSelector((state) => state.users) 
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRegisterPage = () => {
        navigate("/auth/register")
    }
    const handleToggleShow = () => {
        setIsShow(!isShow)
    }

    //validate
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(loginSchema)
    })

    const onSubmit = (data) => {
        console.log(data);
        dispatch(actFetchLogin(data))
    }

    useEffect(() => {
        if(isLogged) {
            navigate("/")
        }
    },[isLogged, navigate])
  return (
    <div className='flex w-[80%] h-full mx-auto items-center'>
        {
            isLoadingCreate &&
            <Loading/>
        }
        <div className='flex-1 h-[90%] px-7 py-10 flex flex-col '>
            <div className='flex flex-col max-lg:items-center'>
                <h1 className='text-[30px] font-bold mb-3'>Chào mừng trở lại</h1>
                <span className='text-[15px] text-gray-500 font-semibold'>Đăng nhập để trải nghiệm những điều thú vị</span>
            </div>
            <div className='flex flex-col justify-between h-full '>
                <form action="" className='flex flex-col gap-2 mt-[20px] ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor="" className='text-[14px] font-semibold'>Email <span className='text-red-500'>*</span></label>
                        <input type="email" placeholder='example@gmail.com' className='border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-sm' {...register('email')}/>
                        {errors.email && <p className='text-[12px] text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="" className='text-[14px] font-semibold'>Mật khẩu <span className='text-red-500'>*</span></label>
                        <div className='border-[1px] border-gray-200 px-[10px] py-[5px] rounded-sm flex items-center justify-between'>
                            <input type={isShow ? "text" : "password"} placeholder='*******' className='outline-none w-full' {...register('password')}/>
                            <span onClick={handleToggleShow}>
                                {
                                    isShow ? <FaRegEyeSlash/> : <FaRegEye/>
                                }
                            </span>
                        </div>
                        {errors.password && <p className='text-[12px] text-red-500'>{errors.password.message}</p>}
                    </div>
                    <button type='submit' className='bg-blue-500 px-[10px] py-[7px] text-white font-semibold text-[14px] rounded-sm mt-2'>Đăng nhập</button>
                </form>
                <div className='text-center'>
                    <p className='text-gray-400'>Chưa có tài khoản ? <span className='text-blue-500 cursor-pointer font-semibold' onClick={handleRegisterPage}>Đăng ký</span></p>
                </div>
            </div>
        </div>
        <div className='bg-[#76ADFD] flex-1 h-[90%] rounded-md px-7 py-10 max-lg:hidden'>
            <TiSocialVimeo size={40}/>
            <h1 className='text-[30px] font-bold mt-[100px] mb-5'>Tham gia với chúng tôi để kết nối với thế giới và tạo ra những điều mới</h1>
            {/* <span className='text-[15px] text-gray-500 font-semibold'>
                Our registration process is quick and easy, taking no more than 10 minutes to complete.
            </span> */}
            <img src={loginImg} alt="" />
        </div>
    </div>
  )
}
