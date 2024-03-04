import React from "react";
import { LoginModal, Navbar, RegisterModal, RentModal } from "./components";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ListingPage from "./Pages/ListingPage/ListingPage";
import Trips from "./Pages/Trips/trips";
import ReservationsPage from "./Pages/ReservationsPage/ReservationsPage";
import FavouritesPage from "./Pages/FavouritesPage/FavouritesPage";
import PropertiesPage from "./Pages/PropertiesPage/PropertiesPage";
import SearchModal from "./components/Modals/SearchModal";




axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://airbnb-api-iota.vercel.app/";
axios.defaults.withCredentials = true;

function App({children}) {


  return (
    <div className="">
      <BrowserRouter>
        
          <ToastContainer /> 
          <RegisterModal />
          <LoginModal /> 
          <RentModal /> 
          <SearchModal />
          <Navbar/>

          {/* <div className="pb-20 pt-28"> */}
          <div className="">
            {/* {children} */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings/:listingId" element={<ListingPage />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/favorites" element={<FavouritesPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
            </Routes> 

          </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
