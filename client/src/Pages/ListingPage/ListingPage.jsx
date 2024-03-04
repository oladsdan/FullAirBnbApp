import React, { useEffect, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthProvider'
import ListingClient from './ListingClient'
import { Loaders } from '../../components'

const ListingPage = () => {
    const {listingId} = useParams()
    const [listingData, setListingData] = useState("")
    const [loading, setLoading] = useState(true)
    const {authUser} = useContext(AuthContext)
    // const [reservations, setReservations] = useState([])

    
    useMemo(async () => {
        await axios.get(`/api-listing/listing/${listingId}`)
        .then((response) => {
            setListingData(response?.data)
            setLoading(false)
        })
        .catch((error) => {
            toast.error("try again")

        })

    }, [listingId])

    // const fetchReservation = async () => {
    //     const response = await axios.get(`/api-reservations/${listingId}`);
    //     setReservations(response?.data);
       
    // }

    // useEffect(() => {
    //     fetchReservation()
    // },[listingId])

    

    if(loading){
        return (
            <Loaders />
        )
    }

  return (
    <div className='p-5'>
        <ListingClient 
            listing={listingData}
            currentUser={authUser?.user?.userId}
            // reservations={reservations}
            listingId={listingId}
            
        />
    </div>
  )
}

export default ListingPage