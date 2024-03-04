import React from 'react'

import { PuffLoader } from "react-spinners";

const Loaders = () => {
    return ( 
        <div
        className="
          h-[70vh]
          flex 
          flex-col 
          justify-center 
          items-center 
        "
        >
          <PuffLoader
            size={100}
            color="red"
          />
        </div>
       );
}

export default Loaders