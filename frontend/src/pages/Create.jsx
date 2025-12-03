import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const Create = () => {
  const [Book_name,setBook_name]=useState('');
  const [Author,setAuthor]=useState('');
  const [Published_Year,setPublished_Year]=useState('');;
  const [Loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const bookCreated=()=>{
    const data ={
      Book_name,
      Author,
      Published_Year
    };
    setLoading(true);
    axios.post('https://book-list-ur6v.vercel.app/books',data,
      {
         withCredentials: true
      }
    )
    .then(()=>{
      setLoading(false);
      navigate('/books');
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error happend');
      console.log(error);
    })
  }
  return (
    
    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center bg-light'>
      <div>
      <BackButton/>
      {Loading?<Spinner/>:''}
      <div className="p-4 rounded shadow bg-white" style={{ width: "350px" }}>
          <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="LoginId"
            value={Book_name} 
            onChange={(e)=>setBook_name(e.target.value)}
          />
        <label htmlFor="floatingInput">Book-Name</label>
      </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={Author} 
            onChange={(e)=>setAuthor(e.target.value)}
          />
        <label htmlFor="floatingInput">Author</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="Number"
            className="form-control"
            id="floatingInput"
            value={Published_Year} 
            onChange={(e)=>setPublished_Year(e.target.value)}
          />
        <label htmlFor="floatingInput">Published_Year</label>
        </div>
        <button className='border border-slate-600 rounded-md'onClick={bookCreated}>Save Book</button>
        </div>
        </div>
    </div>
  )
}

export default Create