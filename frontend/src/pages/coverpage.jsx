import React from 'react'
import {Link} from 'react-router-dom';
const Coverpage = () => {
  return (
    
    <div>
        <style>
          {`
          .cover-picture{
          position:centre;
          width:100vw;
          hight:100vh;
          }
          .cover-text{
          position:absolute;
          top:50% ;
          left:50% ;
          transform:translate(-50%,-50%);
          color: white;
          font-size:48px;
          font-weight:bold;
          }
          .top-right-links {
            position: absolute;
            top: 20px;          
            right: 20px;        
            display: flex;
            gap: 40px;          
          }
          `}
        </style>
      <div>
      <img src="https://cdn.pixabay.com/photo/2023/05/07/18/00/library-7976837_1280.jpg" alt="library" className='cover-picture'/>
        <div className='cover-text'>
          Welcome to my Library
        </div>
        <div className='top-right-links'>
          <Link to={`/register`}>Register  </Link>
          <Link to={`/login`}>Login  </Link>
          <Link to={`/books`}>Book-list</Link>
          <Link to={`/admin/login`}> AdminLogin</Link>
        </div>

        </div>
    </div>
  )
}

export default Coverpage;