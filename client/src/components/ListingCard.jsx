import React, { useCallback, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useCountries from '../hooks/useCountryHooks';
import {format} from 'date-fns'
import HeartButton from './HeartButton';
import Buttons from './Buttons';
import AuthContext from '../context/AuthProvider';



const ListingCard = ({data, reservation, onAction, disabled, actionLabel, actionId, currentUser}) => {
  const {setReservationReload} = useContext(AuthContext)

  const navigate = useNavigate();
  const {getByValue} = useCountries();

  const location = getByValue(data?.locationValue)
  
  const handleCancel = useCallback((e) => {
    e.stopPropagation();
    if(disabled){
      return;
    }
    onAction?.(actionId);
    setReservationReload(prev => !prev)
  }, [onAction, actionId, disabled])


  const price = useMemo(() => {
    if(reservation) {
      return reservation.totalPrice
    }
    return data?.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if(!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => navigate(`/listings/${data?._id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <img src={data.imageSrc} alt="Listing" className='object-cover h-full w-full group-hover:scale-110 transition' />

            <div className='absolute top-3 right-3'>
              <HeartButton listingId={data?._id} currentUser={currentUser} />
            </div>

        </div>
        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data?.category}
        </div>
        <div className='flex items-center gap-1'>
          <div className="font-semibold">
            ${price}
          </div>
          {!reservation && (
            <div className='font-light'>night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Buttons disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )}


      </div>


    </div>
  )
}

export default ListingCard