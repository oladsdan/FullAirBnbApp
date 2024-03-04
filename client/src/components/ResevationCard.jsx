import React, { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

const ReservationCard =({reservation, deletingId, currentUser, onCancel}) => {
        const [reservationResponse, setRerservationResponce] = useState("")
        const location = useLocation();

        const ReserveActionLabel = location?.pathname === '/trips'? "Cancel Reservation" : "Cancel guest Reservation"
        

        useEffect(()=> {
          axios.get(`/api-listing/listing/${reservation.listingId}`)
          .then((response)=>setRerservationResponce(response.data))
          .catch((error) => {
              toast.error("Something went Wrong")
          })
        }, [reservation.listingId])

        
            
          


  return (
    <ListingCard 
        // key={reservation._id}
        data={reservationResponse}
        reservation={reservation}
        actionId={reservation?._id}
        disabled={deletingId === reservation?._id}
        actionLabel={ReserveActionLabel}
        currentUser={currentUser}
        onAction={onCancel}
    />
  )

}

export default ReservationCard