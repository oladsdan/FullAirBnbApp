import { EmptyState } from "../../components";
import { useContext, useMemo, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TripsClient from "./TripsClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 
 const Trips = () => {
    const {authUser, reservationReload} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [usersReservations, setUsersReservations] = useState([])
    const navigate = useNavigate()

    useMemo(()=> {
      axiosPrivate.get('/api-reservations/userId')
      .then((response) => {
        setUsersReservations(response?.data)
      })
      .catch((error) =>{
        toast.error("Not Authorized Please Login")
        navigate("/")
      })
      // .finally(() => navigate("/"))
    }, [authUser, reservationReload, axiosPrivate])
  

    if(!authUser){
        return (
            <EmptyState title="Unauthorized"
            subtitle="Please login" />
        )
    }

    if(usersReservations.length === 0){
      return (
        <EmptyState 
          title="No Trips found"
          subtitle="Looks like you havent reserved any trips" />
      )
    }

    return (
      <TripsClient
      reservations={usersReservations}
      currentUser={authUser} />
    )
   
 }
 
 export default Trips