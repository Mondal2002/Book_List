import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'

const UpdateUser = () => {
  const [loginId,setloginId]=useState('');
  const [IsActive,setIsActive]=useState('');
  const [Loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    axios.get(`https://book-list-ur6v.vercel.app/admin/user/${id}`,{ withCredentials: true})
    .then((res)=>{
      setloginId(res.data.loginId);
      setIsActive(res.data.IsActive);
    }).catch((error)=>{
      setLoading(false);
      alert('An error happend');
      console.log(error);})
  },[id])
  const Updateduser=async()=>{
    const data ={
      loginId,
      IsActive
    };
    setLoading(true);
    await axios.put(`http://localhost:5555/admin/UpdateUser/${id}`,data)
    .then(()=>{
      setLoading(false);
      navigate('/admin/ShowUsers');
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
          <label >loginId</label>
          <input type="text" value={loginId} onChange={(e)=>setloginId(e.target.value)} className='border border-slate-600 rounded-md'/>
        </div>
        <br />
        <div>
          <label >IsActive</label>
          <input type="text" value={IsActive} onChange={(e)=>setIsActive(e.target.value)} 
          className='border border-slate-600 rounded-md'/>
        </div>
        <br />
        <button className='border border-slate-600 rounded-md'onClick={Updateduser}>Save user</button>
        </div>
    </div>
  )
}

export default UpdateUser