import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';


const HeartButton = ({listingId, currentUser}) => {
    const {hasFavorited, toggleFavourite} = useFavorite({listingId, currentUser})
    
  return (
    <div onClick={toggleFavourite} className='relative hover:opacity-80 transition cursor-pointer'>
        <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
        <AiFillHeart size={24} className={(hasFavorited && currentUser) ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        
    </div>
  )
}

export default HeartButton