import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Update = () => {
  const [Book_name,setBook_name]=useState('');
  const [Author,setAuthor]=useState('');
  const [Published_Year,setPublished_Year]=useState('');;
  const [Loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    axios.get(`https://book-list-tysl.onrender.com/${id}`,{ withCredentials: true})
    .then((res)=>{
      setBook_name(res.data.Book_name);
      setAuthor(res.data.Author);
      setPublished_Year(res.data.Published_Year);
    }).catch((error)=>{
      setLoading(false);
      alert('An error happend');
      console.log(error);})
  },[id])
  const UpdatedBook=async()=>{
    const data ={
      Book_name,
      Author,
      Published_Year
    };
    setLoading(true);
    await axios.put(`https://book-list-tysl.onrender.com/Update/${id}`,data)
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
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <BackButton/>
      {Loading?<Spinner/>:''}
      <div>
        <div>
          <label >Book_name</label>
          <input type="text" value={Book_name} onChange={(e)=>setBook_name(e.target.value)} className='border border-slate-600 rounded-md'/>
        </div>
        <br />
        <div>
          <label >Author</label>
          <input type="text" value={Author} onChange={(e)=>setAuthor(e.target.value)} 
          className='border border-slate-600 rounded-md'/>
        </div>
        <br />
              <div>
          <label >Published_Year</label>
          <input type="Number" value={Published_Year} onChange={(e)=>setPublished_Year(e.target.value)} 
          className='border border-slate-600 rounded-md'/>
        </div>
        <button className='border border-slate-600 rounded-md'onClick={UpdatedBook}>Save Book</button>
        </div>
    </div>
  )

}

export default Update