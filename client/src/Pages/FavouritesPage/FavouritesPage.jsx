import React, { useMemo, useState, useContext } from 'react'
import EmptyState from '../../components/EmptyState'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import AuthContext from '../../context/AuthProvider'
import FavoritesClient from './FavoritesClient'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const FavouritesPage = () => {
  //we get the currentUser
  const {authUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const axiosPrivate = useAxiosPrivate();
  const [myFav, setMyFav] = useState("");


  //we call the api that gets the favorites
  useMemo(() => {
    axiosPrivate.get('/users/favorites')
    .then((response) => {
      setMyFav(response.data)
    })
    .catch((error) => {
      toast.error("UnAuthorized kindly login")
      navigate("/")
    })

  }, [])


  if(myFav.length === 0){
    return (
      <div>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
          />
      </div>
    )

  }

  return (
    <FavoritesClient
      listings={myFav}
      currentUser={authUser}
      />
  )

}

export default FavouritesPage