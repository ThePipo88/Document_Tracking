import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import Tramite from "../components/Tramites/Tramite"
import { useState } from "react";


function Tramites(props) {

  const [showAlert, setShowAlert] = useState(false);

  const handleNameChange = (newName)=>{
    setShowAlert(newName);
  };

  return (
    <div className="metrics">
      <Navbar name = {<span className='nav-text'>Tramites </span>}/>
      <div className="grid-one">
      <Tramite nameChange={handleNameChange}/>
      </div>
    </div>
  );
}

export default Tramites;