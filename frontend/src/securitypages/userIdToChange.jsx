import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const UserIdToChange = () => {
    const[loading,setLoading]=useState(false);
    const[loginId,setloginId]=useState();
    const navigate=useNavigate();
    const FindUser=async()=>{
      const data={
        loginId
      };
      setLoading(true)
      await axios.post('http://localhost:5555/forgot/books', data ,{withCredentials: true})
      .then((res)=>{
        setLoading(false);
        alert('User Found');
        navigate(`/change/password/${res.data}`);
      }).catch((error)=>{
      setLoading(false);
      alert('An error happend');
      console.log(error);
    })
    }
  return (
    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center bg-light'>
      <div>
      <BackButton/>
      {loading?<Spinner/>:''}
      <div className="p-4 rounded shadow bg-white" style={{ width: "350px" }}>
          <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="loginId"
            value={loginId} 
            onChange={(e)=>setloginId(e.target.value)}
          />
        <label htmlFor="floatingInput">Enter LoginId to Change</label>
      </div>
        <button className='border border-slate-600 rounded-md'onClick={FindUser}>Find User</button>
        </div>
        </div>
    </div>
  )
}

export default UserIdToChange