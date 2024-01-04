import React, { useCallback, useEffect, useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import Buttons from '../Buttons'

const Modal = ({isOpen, 
    disabled, 
    onClose, 
    onSubmit,
    title, 
    body, 
    footer, 
    actionLabel, 
    secondaryAction, 
    secondaryActionLabel}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(()=>{
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen){
        return null;
        
    }

  return (
    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>

            {/* content */}
            <div className={`translate duration-300 h-full ${showModal? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'>
                    {/* header */}
                    <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                        <button onClick={handleClose} className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                            <IoMdClose size={18} />
                        </button>
                        <div className='text-lg font-semibold'>{title}</div>
                    </div>
                    <div className='relative p-6 flex-auto'>
                        {body}
                    </div>

                    {/* Footer */}
                    <div className='flex flex-col gap-2 p-6'>
                        <div
                        className='flex items-center gap-4 w-full'>
                        
                        {secondaryAction && secondaryActionLabel && (
                             <Buttons 
                             outline
                             disabled={disabled}
                             label={secondaryActionLabel}
                             onClick={'handleSecondaryAction'}/>

                        )}

                       
                        <Buttons disabled={disabled}
                            label={actionLabel}
                            onClick={'handleSubmit'}/>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default Modal