import React from 'react'
import Container from '../Container'
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import { MdOutlineVilla} from 'react-icons/md'
import {IoDiamondSharp} from 'react-icons/io5'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import CategoryBox from '../CategoryBox';
import { useLocation, useSearchParams } from 'react-router-dom';

export const propertyCategories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'  
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills!'  
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'  
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool'  
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside'  
    },
    {
        label: 'islands',
        icon: GiIsland,
        description: 'This property is on an island'  
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake'  
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has sking activities'  
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle'  
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property as camping activities'  
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is on the snow'  
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave'  
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert'  
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in tne barn'  
    },
    {
        label: 'Lux',
        icon: IoDiamondSharp,
        description: 'This property is luxurious'  
    },
    
]


const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams?.get('category');
    const location = useLocation();

    const isMainPage =  location.pathname === '/';
    
    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div
         className='pt-6 flex items-center justify-between overflow-x-auto'>
            {propertyCategories.map((item)=> (
                <CategoryBox 
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    Icon={item.icon}
                    /> 
                
            ))}
        </div>
    </Container>
  )
}

export default Categories