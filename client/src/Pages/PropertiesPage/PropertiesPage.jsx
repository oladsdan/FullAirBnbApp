import { EmptyState } from "../../components";
import { useContext, useMemo, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PropertiesClient from "./PropertiesClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 
 const PropertiesPage = () => {
    const {authUser, reservationReload} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [usersProperties, setUsersProperties] = useState([])
    const navigate = useNavigate()

    useMemo(()=> {
      axiosPrivate.get('/api-listing/listing-user')
      .then((response) => {
        setUsersProperties(response?.data)
      })
      .catch((error) => {
        toast.error("UnAuthorized, Please Login")
        navigate("/")
      })
    }, [authUser, reservationReload])
  

    if(!authUser){
        return (
            <EmptyState title="Unauthorized"
            subtitle="Please login" />
        )
    }

    if(usersProperties.length === 0){
      return (
        <EmptyState 
          title="No Properties Found"
          subtitle="Looks like you havent Airbnb your home" />
      )
    }

    return (
      <PropertiesClient
      listings={usersProperties}
      currentUser={authUser} />
    )
   
 }
 
 export default PropertiesPage