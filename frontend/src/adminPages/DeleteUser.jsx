import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const DeleteUser = () => {
   const [loading,setLoading]= useState(false);
   const navigate = useNavigate();
   const {id} =useParams();
  const deleteUser=async()=>{
    setLoading(true);
    await axios.delete(`http://localhost:5555/admin/DeleteUser/${id}`,{
       withCredentials: true
    })
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
      <div className="flex justify-center items-center h-screen">

        {loading && <Spinner />}

        <div className="p-6 border border-slate-600  rounded-md shadow-md text-center">
          <h2 className="mb-4">
            Are you sure you want to delete user permanently from the DataBase?
          </h2>

          <button 
            onClick={deleteUser}
            className="bg-blue-500 hover:bg-blue-700 text-red-500 font-bold py-2 px-4 rounded">delete</button>
        </div>

      </div>
    </div>
  )
}

export default DeleteUser