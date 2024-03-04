import React from 'react'

const MenuItem = ({onClickMenu, label, setIsOpen, setOpenLogin}) => {
     const handleMenuItem =() => {
        onClickMenu();
        setIsOpen(false)
        if(label === "Login"){

          setOpenLogin(true)
        }

    }


  return (
    <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold' onClick={handleMenuItem}>
        {label}
    </div>
  )
}

export default MenuItem