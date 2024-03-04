import useAxiosPrivate from "./useAxiosPrivate";
import { useCallback, useState, useContext, useMemo } from "react";
import { toast} from 'react-toastify';
import useLoginModal from "./useLoginModal";
import AuthContext from "../context/AuthProvider";



const useFavorite = ({listingId, currentUser}) => {
    const {authUser, setOpenLogin} = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate();
    const loginModal = useLoginModal()
    const [hasFavorited, setHasFavorited] = useState(false)
    const message = hasFavorited? "unliked" : "liked";
    const favoriteIds = authUser?.user?.favoriteIds;

    useMemo(() => {
        const list =favoriteIds || [];
        if(list.includes(listingId)){
            setHasFavorited(true)
        }
            
    }, [ listingId, favoriteIds])


    const toggleFavourite = useCallback((e)=> {
        e.stopPropagation();

        if(!currentUser) {
            setOpenLogin(true)
            return loginModal.onOpen();
        }else{
            try {
                axiosPrivate.put(`/users/favorite/${listingId}`)
                .then(() => {
                    setHasFavorited(!hasFavorited)
                    toast.success(message)
                }).catch((error) => {
                    toast.error("try again")
                })
                
                
    
                
            } catch (error) {
                toast.error('something went wrong. reload and try again')
                
            }
        }

       
    }, [currentUser, hasFavorited, listingId, setHasFavorited, loginModal, axiosPrivate])

    return {
        hasFavorited,
        toggleFavourite
    }

}

export default useFavorite;

