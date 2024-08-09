import React from 'react'
import logo from "../assets/yt-logo-white.png"
import { Link } from 'react-router-dom';
import { MdMic } from "react-icons/md";
import { HiOutlineBars3, HiMagnifyingGlass } from "react-icons/hi2";
import { BiVideoPlus } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useDispatch } from 'react-redux'
import { setUser, logout, getUser } from '../slices/userSlice'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector(getUser)

    const handleLogin = async ()=>{
        const response = await signInWithPopup(auth, provider);
        dispatch(setUser(response.user))
    }

    const handleLogout = async()=>{
        dispatch(logout())
        await signOut(auth)
    }

  return (
    <div className='bg-yt-black text-4xl h-14 w-full flex items-center justify-between fixed pl-4 pr-5 z-10 '>
        <div className=' flex justify-between items-center'>
            <div className=' text-yt-white hover:bg-yt-light-black p-2 w-10 text-2xl text-center hover:cursor-pointer rounded-full'>
                <HiOutlineBars3 />
            </div>
            <div className='w-40 pr-3'>
                <Link to="/">
                    <img src={logo} alt="" className='object-contain'/>
                </Link>
            </div>
        </div>
        <div className='w-1/2 flex items-center '>
            <input className='w-3/4 justify-between text-yt-white text-xl focus:outline-none  border-yt-light-black border-2 items-center focus:border-yt-blue bg-yt-light-1 h-10 p-2  rounded-l-full' placeholder='Search' />
            <button className=' text-yt-white bg-yt-light-black border-none h-7 p-5 flex items-center rounded-r-full'> <HiMagnifyingGlass size={22}/> </button>
            <div className=' text-yt-white hover:bg-yt-gray ml-4 p-2 w-10 text-2xl text-center hover:cursor-pointer rounded-full bg-yt-light-black'>
            <MdMic />
            </div>
        </div>
        <div className=' mx-2 flex items-center gap-3'>
            <div className=' text-yt-white cursor-pointer hover:bg-yt-light-black rounded-full p-2 text-center'><BiVideoPlus size={22}/></div>
            <div className=' text-yt-white cursor-pointer hover:bg-yt-light-black rounded-full p-2 text-center'><FaRegBell size={22}/></div>
            { !user ? (
                <button onClick={handleLogin} className='bg-yt-red rounded-md text-yt-white p-2 w-20 h-9 text-lg flex justify-center items-center'>Sign in</button>
            ) : (
                <img onClick={handleLogout} src={user.photoURL} className='h-10 w-10 rounded-full cursor-pointer' alt={user.displayName} />
            ) 
               
            }
        </div>
    </div>
  )
}

export default Navbar
