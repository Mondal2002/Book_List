import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {Link} from 'react-router-dom';

const Show = () => {
  const [loginId,setloginId]=useState('');
  const [password,setpassword]=useState('');
  const [Loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const userLogin=()=>{
    const data ={
      loginId:loginId,
      password : password
    };
    setLoading(true);
    axios.post('https://book-list-ur6v.vercel.app/books/login',data,
      {
        withCredentials: true
       })
    .then((res)=>{
      setLoading(false);
      alert('Login Successful')
       console.log("TOKEN:",res.data.token);
      navigate('/books');
    })
    .catch((error)=>{
    setLoading(false);
     if (error.response?.status === 403) {
    alert("Your account is deactivated.");
    navigate("/register")
    return;
  }
    // const msg = 
    // error.response?.data?.error || 
    // error.response?.data?.message || 
    // "Login failed";
    // alert(msg);
    // console.log(error);

    })
  }
return (
  <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">

    <BackButton />

    <div className="p-4 rounded shadow bg-white" style={{ width: "350px" }}>
      <h3 className="text-center mb-4">Login</h3>

      {Loading ? <Spinner /> : null}

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="LoginId"
          onChange={(e) => setloginId(e.target.value)}
        />
        <label htmlFor="floatingInput">LoginId</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-primary w-100" onClick={userLogin}>
        Login
      </button>
      <div>
        <Link to='/forgot/password'> Forgot Password</Link>
      </div>
    </div>
  </div>
);
}

export default Show