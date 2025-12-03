import React from 'react'
import {Link} from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'
const BackButton = ({destination='/books'}) => {
  return (
    <div className='flex'>
        <Link to ={destination}>
        <BsArrowBarLeft className='text-4x4'/>
        </Link>
    </div>
  )
}

export default BackButton