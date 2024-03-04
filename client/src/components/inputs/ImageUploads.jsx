import React, { useState, useEffect, useRef } from 'react'
import { TbPhotoPlus } from 'react-icons/tb';


// import {Cloudinary} from "@cloudinary/url-gen";



// const App = () => {
//   const cld = new Cloudinary({cloud: {cloudName: 'dzdhviex1'}});
// };

const ImageUploads = ({value, onChange}) => {

 
  const [cloudName] = useState("dzdhviex1");
  const [uploadPreset] = useState("kclwzmaj");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    multiple: false

  })

  // let cloudinary = useRef()
  const cloudinaryRef = useRef();

  const widget = useRef();
    

  // const widget = useRef();
  
  useEffect(() => {
    
    cloudinaryRef.current = window.cloudinary;
    // so we store the instance of cloudinary
    if(!cloudinaryRef){
      cloudinaryRef.current = window.cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to
    // setTimeout: https://caniuse.com/requestidlecallbac

    function onIdle() {
      if(!widget.current){
        widget.current = createWidget();
      }
    }
    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1)

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    }

  }, [])

  const createWidget = () => {
     return cloudinaryRef?.current.createUploadWidget(uwConfig, (error, result) => {
      if(!error && result.event ==='success'){
        onChange(result.info.secure_url)
      }

     })
  }
  
  const open = () => {
    if(!widget.current){
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return (
          <div
            onClick={open}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {value && (
              <div className='absolute inset-0 w-full h-full overflow-hidden'>
                <img src={value} alt="House" style={{objectFit: 'cover'}} fill/>
              </div>
            )}
          </div>
  )
}

export default ImageUploads
