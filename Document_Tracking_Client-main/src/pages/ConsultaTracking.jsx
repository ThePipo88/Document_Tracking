import React from "react";

import Navbar from "../components/Dashboard/Navbar";
import ConsultaT from "../components/Consulta/ConsultaT";
import { useState } from "react";


function ConsultaTracking() {

  const [showAlert, setShowAlert] = useState(false);

  const handleNameChange = (newName)=>{
    setShowAlert(newName);
  };

  return (
    <div className="metrics">
      <Navbar name = {<span className='nav-text' style={{cursor: "pointer"}}>Consulta </span>}/>
      <div className="grid-one">
        <ConsultaT nameChange={handleNameChange}/>
      </div>
    </div>
  );
}

export default ConsultaTracking;