import React, {useContext, useState} from 'react'
import Modal from '../Modals/Modal'
import useRegisterModal from '../../hooks/useRegisterModal'
import RegisterInputs from '../RegisterInputs';
import { useForm} from 'react-hook-form'
import { toast} from 'react-toastify'


// import {FieldValues, SubmitHandler, UseForm} from 'react-hook-form'
// import {useForm} from 'react-hook-form';
import axios from 'axios'
import Buttons from '../Buttons';
//import {AiFillGithub} from 'react-icons/ai
import { FcGoogle } from 'react-icons/fc'
import { BiLogoFacebook } from 'react-icons/bi';
import useLoginModal from '../../hooks/useLoginModal';
import AuthContext from '../../context/AuthProvider';



const LoginModal = () => {
  /* eslint-disable */
  const registerModal = useRegisterModal(); 
  const loginModal = useLoginModal();
  /* eslint-disable */
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset, formState: {errors}} = useForm();

  //se set state for the user infor.

  const {authUser, setAuthUser, openLogin, setOpenLogin} = useContext(AuthContext);


  // const { register, handleSubmit, formState: {errors,}} = useForm<FieldValues>({
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //   }
  // });

//   const onSubmit  = (data) => {
//     setIsLoading(true);
    
//     axios.post('/api/sign-in', data)
//       .then(() => {
//         registerModal.onClose();
//         toast.success("Welcome back")
//       })
//       .catch((error) => {
//         toast.error("Something went Wrong or check the input fields")
//       })
//       .finally(() => {
//         setIsLoading(false);
//       })
//   }

    const onSubmit = async (data) => {
        setIsLoading(true);
        await axios.post('/api/sign-in', data)
        .then(({data}) => {
            setIsLoading(false);
      
            if({data}){
                toast.success('Welcome Back');
                setOpenLogin(!openLogin)
                reset()
                setAuthUser(data)
                
                
            }
        }).catch((error)=>{
          toast.error("invalid credentials")
        })
        
    }

    const handleRegisterSignup = () => {
      loginModal.onClose()
      registerModal.onOpen()
    }

 

  const bodyContent = (
    <div className='flex flex-col gap-6'>
      <span className='text-2xl font-bold'>Welcome back</span>
      <span className='font-light text-neutral-500'>Login to your Account</span>

      {/* input formdata */}
      <RegisterInputs 
        id="email"
        label="Email"
        // disabled={isLoading}
        errors={errors}
        required
        register={register}
         /> 
      <RegisterInputs 
        id="password"
        label="password"
        type="password"
        // disabled={isLoading}
        errors={errors}
        required
        register={register}
         /> 
    </div>

  )
  //footer content for the modal
  const footerContent= (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Buttons 
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => {}}/>
      <Buttons 
        outline
        label="Continue with Facebook"
        Icon={BiLogoFacebook}
        onClick={() => {}}/>

      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex items-center justify-center gap-2'>
          <span>Don't have an Account</span>
          <span onClick={handleRegisterSignup} className='cursor-pointer underline'>Create an Account</span>
        </div>

      </div>

    </div>
  )


  return (
    <div>
      {openLogin && loginModal.isOpen &&(
      <Modal 
        // disabled={isLoading}
        title="Login"
        actionLabel="Continue"
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer = {footerContent} /> )}
        

    </div>
  )
}

export default LoginModal