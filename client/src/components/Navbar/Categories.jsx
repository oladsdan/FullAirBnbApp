import React from 'react'
import Container from '../Container'
import {TbBeach} from 'react-icons/tb';
import {GiWindmill} from 'react-icons/gi';
import { MdOutlineVilla} from 'react-icons/md'
import CategoryBox from '../CategoryBox';

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
]


const Categories = () => {
  return (
    <Container>
        <div
         className='pt-6 flex items-center justify-between overflow-x-auto'>
            {propertyCategories.map((item)=> (
                <CategoryBox 
                    key={item.label}
                    label={item.label}
                    description={item.description}
                    Icon={item.icon}
                    /> 
                
            ))}
        </div>
    </Container>
  )
}

export default Categories