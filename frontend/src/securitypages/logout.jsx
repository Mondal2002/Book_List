import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { useNavigate} from 'react-router-dom';
const Logout = () => {
    const[Loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const LogoutPage=async()=>{
     setLoading(true);
    await axios.get(`https://book-list-ur6v.vercel.app/logout`,{
       withCredentials: true
    })
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error happend');
      console.log(error);
    })
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <BackButton/>
      <div className="flex justify-center items-center h-screen">

        {Loading && <Spinner />}

        <div className="p-6 border border-slate-600  rounded-md shadow-md text-center">
          <h2 className="mb-4">
            Are you sure<br />you want to Logout?
          </h2>

          <button 
            onClick={LogoutPage}
            className="bg-blue-500 hover:bg-blue-700 text-red-500 font-bold py-2 px-4 rounded">Logout</button>
        </div>

      </div>
    </div>
  )

}

export default Logout;