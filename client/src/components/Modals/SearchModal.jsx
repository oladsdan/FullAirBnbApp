import Modal from "./Modal";

import useSearchModal from "../../hooks/useSearchModal.js";
import qs from 'query-string';
import React, { useCallback, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import Map from "../Map.jsx";
import { formatISO } from "date-fns";
import { useMemo } from "react";
import CountrySelect from "../inputs/CountrySelect.jsx";
import Calender from "../Calender.jsx";
import Counter from "../inputs/Counter.jsx";
import AuthContext from "../../context/AuthProvider.js";
import useLoginModal from "../../hooks/useLoginModal.js";

const STEPS = {
    "LOCATION":0,
    "DATE" : 1,
    "INFO" :2
}

const SearchModal = () => {
  const navigate = useNavigate()
  const searchModal = useSearchModal()
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  })
  const [location, setLocation] = useState()

  const {authUser} = useContext(AuthContext)
  const loginModal = useLoginModal();



  const onBack = useCallback(() => {
      setStep((value) => value - 1);
  }, []);
  
  const onNext = useCallback(() => {
      setStep((value) => value + 1);
  }, []);
  
  const onSubmit = useCallback(async () => {
      if (step !== STEPS.INFO) {
        return onNext();
  }
  
  let currentQuery = {};
  
  if (searchParams) {
      currentQuery = qs.parse(searchParams.toString())
  }
  
  const updatedQuery = {
    ...currentQuery,
    locationValue: location?.value,
    guestCount,
    roomCount,
    bathroomCount
  };

  if (dateRange.startDate) {
    updatedQuery.startDate = formatISO(dateRange.startDate);
  }

  if (dateRange.endDate) {
    updatedQuery.endDate = formatISO(dateRange.endDate);
  }

  const url = qs.stringifyUrl({
    url: '/',
    query: updatedQuery,
  }, { skipNull: true });

  setStep(STEPS.LOCATION);
  searchModal.onClose();
  navigate(url);
}, 
    [
      step, 
      searchModal, 
      location, 
      navigate, 
      guestCount, 
      roomCount,
      dateRange,
      onNext,
      bathroomCount,
      searchParams
    ]);
  
      
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
       <span className='text-2xl font-bold'>Where do you wanna go</span>
        <span className='font-light text-neutral-500'>Find the perfect location</span>
      <CountrySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <span className='text-2xl font-bold'>When do you plan to go?</span>
        <span className='font-light text-neutral-500'>Make sure everyone is free!</span>
 
        <Calender
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
        
      
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
         <span className='text-2xl font-bold'>More information</span>
        <span className='font-light text-neutral-500'>Find your perfect place!</span>
        <Counter 
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests" 
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter 
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms" 
          subtitle="How many rooms do you need?"
        />        
        <hr />
        <Counter 
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }

 


  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default SearchModal