import React  from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import Spinner from '../components/spinner';



const Home = () => {
  const [Books,setBooks ]=useState([]);
  const [Loading,setLoading]=useState(false);
  
  const fetchBooks =async()=>{
    try{
      setLoading(true);
      const res=await axios.get('https://book-list-tysl.onrender.com/booklist',{
         withCredentials: true
      });
        setBooks(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

useEffect(() => {
  fetchBooks();
}, []);

// useEffect(() => {
//   Books.map((book, index) => {
//     console.log(index+1)
//     console.log(book.Author)
//   })
// }, [Books])

  return (
    <div className='p-4 '>
      <style>
        {`
          .cover-picture{
          position:centre;
          width: 100vw;
          height: 100vh;
          object-fit:cover;
          }
          .table-text{
          position:absolute;
          top:50% ;
          left:50% ;
          transform:translate(-50%,-50%);
          color: White;
          font-size:20px;
          font-weight:bold;
          }
          .big-table {   
          border-collapse: separate;   
          border-spacing: 2px; 
          .top-right-links {
            position: absolute;
            top: 20px;          
            right: 20px;        
            display: flex;
            gap: 40px;          
          }       
          }
        
        }
        `}
      </style>
      <div>
        <img src="https://img.freepik.com/premium-photo/abstract-image-open-book-closeup_1120563-856.jpg" alt="" className='cover-picture' />
      <div className='table-text'>
      <div className=' flex justify-between items-centre text-orange-200'>
        <h1 className='text-3x1 my-8'>Books List</h1>
        <Link to={`/books/create`}>
        <MdOutlineAddBox className='text-sky-800 text 4x1'></MdOutlineAddBox>
        </Link>
      </div>
      
      {Loading?(
        <Spinner/>
      ):(
        <table className='big-table text-orange-200'>
          <thead >
            <tr>
              <th className='border border-slate-600 rounded-md'>No.</th>
              <th className='border border-slate-600 rounded-md'>Book Name</th>
              <th className='border border-slate-600 rounded-md'>Author</th>
              <th className='border border-slate-600 rounded-md'>Publishing-Year</th>
              <th className='border border-slate-600 rounded-md'>operations</th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book,index)=>{
              return(
                <tr key={book._id}>
                <td className='border border-slate-600 rounded-md' >
                  {index+1}
                </td>
                <td className='border border-slate-600 rounded-md'>
                  {book.Book_name}
                </td>
                <td className='border border-slate-600 rounded-md'>
                  {book.Author}
                </td>
                <td className='border border-slate-600 rounded-md'>
                  {book.Published_Year}
                </td>
                <td className='border border-slate-600 rounded-md'>
                  <div className='flex justify-centre gap-x-4'>
                    <Link to={`/book/create`}> 
                    <BsInfoCircle className='text-2x1 text-green-800'/>
                    </Link>
                
                    <Link to={`/book/update/${book._id}`}> 
                    <AiOutlineEdit className='text-2x1 text-yellow-600'/>
                    </Link>
                  
                    <Link to={`/book/delete/${book._id}`}> 
                    <MdOutlineDelete className='text-2x1 text-red-800'/>
                    </Link>
                  </div>
                </td>
              </tr>
              )
              
            })}
          </tbody>
        </table>
      )
      }
       <div>
        <Link className=' text-white'to={`/logout`}>Logout</Link>
      </div>
      <div>
        <Link rel="stylesheet" href="" to={'/deactivate'} >Deactivate Account</Link>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Home