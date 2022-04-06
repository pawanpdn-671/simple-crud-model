import React, { useState, useEffect } from 'react'
import api from '../api/contact';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Home = () => {
   const override = css`
      margin: 8rem auto 0 auto;
      display: block;   
      width: max-content;
      border-color: red;
   `;

   const [usersList, setUsersList] = useState([]);

   useEffect(() => {
      getResponse();
   }, []);


   const getResponse = async () => {
      const response = await api.get('/contacts');

      if(response) {
         setUsersList(response.data);
      }  
   }

   const deleteUser = async (id) => {
      await api.delete(`/contacts/${id}`);
      const newUsersList = usersList.filter((user) => {
         return user.id !== id;
      });
      setUsersList(newUsersList);
   }

   const renderUsersList = usersList?.map(user => {
      return (
         <div className='user-box' key={user.id}>
            <div className='user-box-info'>
               <p className='user-box-info-name'>{user.name}</p>
               <p className='user-box-info-email'>{user.email}</p>
            </div>

            <div className='user-box-btns'>
               <Link to={"/edit"} state={{ data: user }} className='btn btn-outline-primary'>Edit</Link>

               <button type='button' onClick={() => deleteUser(user.id)} className='btn btn-outline-danger'>Delete</button>
            </div>
         </div>
      )
   })


   return (
      <div className='mt-5'>            
         <div className='d-md-flex justify-content-md-center'>
            <Link to="/add" className="btn btn-primary mt-3">Add User</Link>
         </div>

         <div className="mt-5">
            {
               usersList.length === 0 ?
               <PulseLoader color="#1486ba" css={override} size={12} />               
               :
               <div className='user-list-container'>
                  {renderUsersList}
               </div>
            }
         </div>         
      </div>
   )
}

export default Home;