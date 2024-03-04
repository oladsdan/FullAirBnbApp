import React, { useEffect, useState, useContext } from 'react'
import Container from '../components/Container'
import { EmptyState, ListingCard } from '../components';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const Home = () => {
  const {authUser} = useContext(AuthContext);
  const [listings, setListings] = useState("")
  // const [params, setParams] = useState()
  // const currentUser = {"id":authUser?.user?.userId, 
                        // "favoriteIds": authUser?.user?.favoriteId}
  // console.log(listings)
  //here we reduced the filter
  // const getAllListings = async () => {
  //   const response = await axios.get('/api-listing/allListings')
  //   const data = await JSON.stringify(response);
  //   setListings(data)
  //   console.log(listings)
  // }

  const location = useLocation()

  // const myParams = new URLSearchParams().getAll("?")
  // console.log("this is my params")
  // console.log(myParams)
  // http://localhost:3000/?bathroomCount=1&endDate=2024-02-26T08%3A56%3A52%2B01%3A00&guestCount=1&locationValue=AO&roomCount=1&startDate=2024-02-26T08%3A56%3A52%2B01%3A00

  const searchParams = new URLSearchParams(location.search)

  let query ={}

  if(searchParams.get("bathroomCount")){
    query.bathroomCount = {
      gte: +searchParams.get("bathroomCount")}
  }

  if(searchParams.get("guestCount")){
    // query.guestCount = searchParams.get("guestCount")
    query.guestCount = {
      gte: +searchParams.get("guestCount")}
  }
  if(searchParams.get("locationValue")){
    query.locationValue = searchParams.get("locationValue")
  }
  if(searchParams.get("roomCount")){
    query.roomCount = {
      gte: +searchParams.get("roomCount")}
  }
  // if(searchParams.get("startDate")){
  //   query.startDate=searchParams.get("startDate");
  // }
  // if(searchParams.get("endDate")){
  //   query.endDate = searchParams.get("endDate")
  // }
  if(searchParams.get("category")){
    query.category = searchParams.get("category")
  }
 


  const fetchData = async() => {
    await axios.get('/api-listing/allListings', {params: query})
    .then((response) => {
      setListings(response?.data)
    })
    .catch((error) => {
      toast.error(error, "relaod the page")
    })
  }

  useEffect(() => {
    let interval = setInterval(() => {
      fetchData();
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [searchParams, authUser?.user]);

  // console.log(listings)
  // console.log("this is authUser")
  // console.log(authUser)

 
 
  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    )
  }



  return (
    <Container>
      <div className='p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-6'>
        {listings.map((listing) => {
          return (
            <ListingCard key={listing?.title} currentUser={authUser?.user?.userId} data={listing}/>
          )
        })}

      </div>
    </Container>
  )
}

export default Home