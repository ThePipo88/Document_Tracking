import React from "react";

import Navbar from "../components/Dashboard/Navbar";
import Departamento from "../components/Departamentos/Departamento";
import { Alert } from 'antd';
import { useState } from "react";

function Departamentos() {

const [showAlert, setShowAlert] = useState(false);

const handleNameChange = (newName)=>{
  setShowAlert(newName);
};

  return (
    <div className="metrics">
      <Navbar name = {<span className='nav-text'>Departamentos </span>}/>
      <div className="grid-one">
        <Departamento nameChange={handleNameChange}/>
      </div>
    </div>
  );
}

export default Departamentos;