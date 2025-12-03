import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';

const DeactivateAcc = () => {
     const [loading,setLoading]= useState(false);
   const navigate = useNavigate();
  const deleteacc=async()=>{
    setLoading(true);
await axios.put(
  "https://book-list-ur6v.vercel.app/deactivate/acc",
  {},
  { withCredentials: true }// config here
)
    .then(()=>{
      setLoading(false);
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
      <div className="flex justify-center items-center h-screen">

        {loading && <Spinner />}

        <div className="p-6 border border-slate-600  rounded-md shadow-md text-center">
          <h2 className="mb-4">
            Are you sure<br />you want to deactivate this acc?
          </h2>

          <button 
            onClick={deleteacc}
            className="bg-blue-500 hover:bg-blue-700 text-red-500 font-bold py-2 px-4 rounded">delete</button>
        </div>

      </div>
    </div>
  )
}



export default DeactivateAcc;