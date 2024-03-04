import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { propertyCategories } from '../../components/Navbar/Categories'
import Container from '../../components/Container'
import { ListingHead } from '../../components'
import ListingInfo from './ListingInfo'
import useLoginModal from '../../hooks/useLoginModal'
import { useNavigate } from 'react-router-dom'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthProvider'
import ListingReservation from './ListingReservation'
import axios from 'axios'



//created the date
const initialDateRange = {
    startDate : new Date(),
    endDate: new Date(),
    key: 'selection'
}



const ListingClient = ({listing, currentUser, listingId}) => {

    const {authUser} = useContext(AuthContext)

    //hooks
    const axiosPrivate = useAxiosPrivate();

    //states
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing?.price);
    const [dateRange, setDateRange] = useState(initialDateRange)
    const [reservations, setReservations] = useState([])
    const [listingOwner, setListingOwner] = useState();

    useEffect(() => {
        fetchReservation()
    },[isLoading])


    //to get the name of the user that posted the listing
    useEffect(() => {
        axios.get(`/users/${listing?.userId}`)
        .then((response)=> {
            setListingOwner(response?.data)
        })
        .catch((error) => {
            setListingOwner(null);
        })
        
    }, [listing?.userId])
    




    const category = useMemo(() => {
        return propertyCategories.find((item) => item.label === listing.category)
    }, [listing, propertyCategories])

    const loginModal = useLoginModal();
    const navigate = useNavigate(); // testing

    //now we check the reservations on each date
    const disabledDates = useMemo(() => {
        let dates = []

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates =[...dates, ...range]
        })
        return dates
    }, [reservations])


   

    const fetchReservation = async () => {
        const response = await axios.get(`/api-reservations/${listingId}`);
        setReservations(response?.data);
       
    }

   


    const onCreateReservation = useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true)
        // we make an api call to save the reservations
        axiosPrivate.post('/api-reservations/create', {
            userId: authUser?._id,
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?._id,
            owner: listing?.userId

        })
        .then(()=> {
            toast.success('Listing Reserved!');
            setDateRange(initialDateRange);
            //Redirect to trips
            navigate('/trips')
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [totalPrice, dateRange, listing?.id, currentUser, loginModal])


    //using useEffect hook to change the Dates by range
    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            }else {
                setTotalPrice(listing.price);
            }
        }

    }, [dateRange, listing.price])


  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing._id}
                    currentUser={currentUser}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                <ListingInfo
                    user={listingOwner}
                    category={category}
                    description={listing.description}
                    roomCount={listing?.roomCount}
                    guestCount={listing?.guestCount}
                    bathroomCount={listing?.bathroomCount}
                    locationValue={listing.location?.value}
                />
                <div className='order-first mb-10 md:order-last md:col-span-3' >
                    <ListingReservation price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)} 
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}   />

                </div>

            </div>
        </div>
    </Container>
  )
}

export default ListingClient