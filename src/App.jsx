import './App.css'
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HomeLayout from './layouts/homeLayout/HomeLayout';
import HomePage from './pages/HomePage';
import LoginLayout from './layouts/loginLayout/LoginLayout';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_ACCESS_TOKEN } from './constants/config';
import { useEffect } from 'react';
import { actGetMyUser, actReLogin } from './redux/features/userSlice';
import ProfilePage from './pages/ProfilePage';
import WatchPage from './pages/WatchPage';
import StorePage from './pages/StorePage';
import TeamPage from './pages/TeamPage';
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN) || null;
  const {isLogged, user} = useSelector((state) => state.users)
  console.log(user);
  useEffect(() => {
    if (accessToken) {
      dispatch(actReLogin(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if(isLogged === false) {
      navigate("/auth/login")
    }
  },[isLogged])

  return (
    <Routes>
      <Route path='/' element={<HomeLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='profile/:userId' element={<ProfilePage/>}/>
        <Route path='watch' element={<WatchPage/>}/>
        <Route path='store' element={<StorePage/>}/>
        <Route path='team' element={<TeamPage/>}/>
      </Route>
      <Route path='/auth' element={<LoginLayout/>}>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path="/auth/*" element={<NotFoundPage />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
