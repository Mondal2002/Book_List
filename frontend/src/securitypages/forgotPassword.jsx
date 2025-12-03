import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

 const ForgotPassword = () => {
  
 const {id}=useParams();
 const navigate=useNavigate();
 const [Loading,setLoading]=useState(false);
 const  [password,setpassword]=useState('');
  const ChangePassword=async()=>{
    
    const data ={
      password
    };
    setLoading(true);
    await axios.put(`https://book-list-ur6v.vercel.app/forgotPassword/${id}`,data)
    .then(()=>{
      setLoading(false);
      alert('Password change successful')
      navigate('/login');
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
      <div className="p-4 rounded shadow bg-white" style={{ width: "350px" }}>
          <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingInput"
            placeholder="loginId"
            value={password} 
            onChange={(e)=>setpassword(e.target.value)}
          />
          <label htmlFor="floatingInput">Enter New password to Change</label>
          </div>

      </div>
      <div>
      <button className="btn btn-primary w-100" onClick={ChangePassword}>
        Register
      </button>
      </div>
        </div>
  )

}

export default ForgotPassword;