import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validate } from '../utils';
import api from '../api/contact';

const EditUser = () => {
   const location = useLocation();
   const { id, name, email } = location.state.data;

   const navigate = useNavigate();
   const [formValues, setFormValues] = useState({
      id,
      name, 
      email
   });

   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({...formValues, [name]: value})
   }

   const handleSubmit = (e) => {
      e.preventDefault(); 
      setFormErrors(validate(formValues));
      setIsSubmit(true);
   }

   useEffect(() => {
      if(Object.keys(formErrors).length === 0 && isSubmit){
         const postFunction = async() => {
            await api.put(`/contacts/${id}`, formValues);
            navigate('/');
         }
         postFunction();
      }
   }, [formErrors]);


   return (
      <div>
         <form id="form" onSubmit={handleSubmit} className='mt-5'>
            <h3 className='mb-4 pb-2 text-center'>Edit User</h3>

            <div className="form-floating mb-3">
               <input type="text" className="form-control" id="floatingInput" placeholder="name" name="name" value={formValues.name} onChange={handleChange} />
               <label htmlFor="floatingInput">Enter Your Name</label>

               <p className='error-msg'>{ formErrors.name }</p>
            </div>

            <div className="form-floating mb-3">
               <input type="email" className="form-control" id="floatingPassword" placeholder="email" name="email" value={formValues.email} onChange={handleChange} />
               <label htmlFor="floatingPassword">Enter Your Email</label>

               <p className='error-msg'>{ formErrors.email }</p>
            </div>

            <button type="submit" className="btn col-12 btn-lg btn-primary mt-3">Edit User</button>
         </form>
      </div>
   )
}

export default EditUser;