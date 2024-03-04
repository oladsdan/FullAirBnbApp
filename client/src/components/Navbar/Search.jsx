import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import useSearchModal from '../../hooks/useSearchModal.js'
import { useSearchParams } from 'react-router-dom'
import { differenceInDays } from 'date-fns';
import useCountries from '../../hooks/useCountryHooks.jsx'
// import { useContext } from 'react'
// import AuthContext from '../../context/AuthProvider.js'
// import useLoginModal from '../../hooks/useLoginModal.js'

const Search = () => {
    const [searchParams] = useSearchParams()
    const { getByValue } = useCountries()

    const locationValue = searchParams?.get('locationValue');
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');
    const guestCount = searchParams?.get('guestCount');


    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue)?.label;
        }

        return 'Anywhere'
    },[locationValue, getByValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          let diff = differenceInDays(end, start);
    
          if (diff === 0) {
            diff = 1;
          }
    
          return `${diff} Days`;
        }
    
        return 'Any Week'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
    if (guestCount) {
        return `${guestCount} Guests`;
    }

    return 'Add Guests';
    }, [guestCount]);
    

    // const {authUser} = useContext(AuthContext);
    const searchModal = useSearchModal();
    // const loginModal = useLoginModal();

    // const onSearch = useCallback(() =>{
    //     if(!authUser) {
    //         // setOpenLogin(true)
    //        return loginModal.onOpen()
    //     }
    //     //else open rent modal
    //     searchModal.onOpen()
    // }, [authUser, loginModal, searchModal])

  return (
    <div  onClick={searchModal.onOpen} className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold px-6'>
                {locationLabel}
            </span>
            <span className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                {durationLabel}
            </span>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3'>
                <span className='hidden sm:block'>{guestLabel}</span>
                <div className='p-2 bg-rose-500 rounded-full text-white'>
                    <BiSearch size={18} />
                </div>

            </div>

        </div>
       

    </div>
  )
}

export default Search