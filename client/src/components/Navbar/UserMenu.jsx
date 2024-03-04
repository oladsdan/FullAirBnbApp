import React, { useCallback, useContext, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import AuthContext from '../../context/AuthProvider';
import useRentModal from '../../hooks/useRentModal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const UserMenu = () => {
    const {authUser, setAuthUser, setOpenLogin} = useContext(AuthContext)
    const navigate = useNavigate();
   


    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    // const toggleOpen = useCallback(() => {
    //     setIsOpen((value) => !value)
    // }, [])

    //functions for the MenuItem modal
    // const onClickMenu = (value) => {
    //     if (value === "signup"){
    //         /* eslint-disable */
    //         registerModal.onOpen()
    //     }

    // }
    const handleLogout = () => {
        axios.get('/api/logout')
        .then(()=>{
            setAuthUser('')
            toast.success("Logged out SuccessFully")
            navigate("/")
        })
        .catch((error) => {
            toast.error("Something went Wrong")
        })
    }
    // const handleLogin =() => {
    //     setOpenLogin(true)
    // }

    // we use this as a form of authentication is the user is not signed in at the airbnb your home
    const onRent = useCallback(() =>{
        if(!authUser) {
            setOpenLogin(true)
           return loginModal.onOpen()
        }
        //else open rent modal
        rentModal.onOpen()
    }, [authUser, loginModal, rentModal, setOpenLogin])

  return ( 
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div onClick={onRent}
                className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Airbnb your home

            </div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>

            </div>
        </div>

        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-50'>
                <div className='flex flex-col cursor-pointer'>
                    {authUser?.user ? (
                       <>
                            <Link to="/trips">
                                <MenuItem onClickMenu={() => {}}  setIsOpen={setIsOpen}  label="My trips"/>
                            </Link>


                            <MenuItem  onClickMenu={()=>navigate("/favorites")} setIsOpen={setIsOpen}   label="My favourites"/>
                            <MenuItem  onClickMenu={()=>navigate("/reservations")} setIsOpen={setIsOpen}   label="My  reservations"/>
                            <MenuItem  onClickMenu={()=>navigate("/properties")} setIsOpen={setIsOpen}   label="My properties"/>
                            <MenuItem  onClickMenu={()=> rentModal.onOpen()} setIsOpen={setIsOpen}   label="My Airbnb my home"/>
                            <hr />
                            <MenuItem  onClickMenu={handleLogout} setIsOpen={setIsOpen}   label="Logout"/>
                         </>
                    ): (

                        <>
                            <MenuItem onClickMenu={loginModal.onOpen} setIsOpen={setIsOpen} setOpenLogin={setOpenLogin} label="Login"/>
                            <MenuItem  onClickMenu={registerModal.onOpen} setIsOpen={setIsOpen}   label="Sign up"/>
                        </>
                    )}
                </div>

            </div>
        )}
    </div>
  )
}

export default UserMenu