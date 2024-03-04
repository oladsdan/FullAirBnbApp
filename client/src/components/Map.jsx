import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import markerIcon2x  from  'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaurl: markerIcon2x,
  showdowUrl: markerShadow
})

const Map = ({center}) => {

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
    >
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && (
      <Marker 
        position={center}
      />
    )}

    </MapContainer>
  )
}


// const Map = ({center}) => {
//   const displayMap = useMemo(
//     () => (
//       <MapContainer
//         center={center}
//         zoom={13}
//         scrollWheelZoom={false}
//         >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     ),
//     [center],
//   )

//   return (
//     <div>
//       {displayMap}
//     </div>
//   )
// }


// const Map =({center}) => {
//   const displayMaps = useEffect(() => {
//  
//     const displayMap =() => {(
//         <MapContainer
//           center={center}
//           zoom={13}
//           scrollWheelZoom={false}
//           className='h-[35vh] rounded-lg'
//         >
//           <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//       </MapContainer>
//       )}

//     }
//     displayMap()
//   }, [center])

//   return (
//     <div>{displayMaps}</div>
//   )
  
  
// }

export default Map