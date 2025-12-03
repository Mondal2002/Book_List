import React, { useState } from 'react'
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';


const Register = () => {
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
    axios.post('https://book-list-ur6v.vercel.app/register',data,
      {
        withCredentials: true
       })
    .then((res)=>{
      setLoading(false);
      alert('Registration Successful')
       console.log("TOKEN:",res.data.token);
      navigate('/login');
    })
    .catch((error)=>{
    setLoading(false);
    alert(error.response?.data?.message || 'Login failed');
    console.log(error);

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
        Register
      </button>
    </div>
  </div>
);
}

export default Register