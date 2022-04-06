import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Home from './components/Home';
import './App.css';

const App = () => {
   return (
      <div className="container-sm mt-4 app-container">
         <h2 className='app-heading text-center'>Customize users with CRUD operation</h2>
         <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/add" exact element={<AddUser/>} />
            <Route path="/edit" exact element={<EditUser />} />
         </Routes>
      </div>
   )
}

export default App;