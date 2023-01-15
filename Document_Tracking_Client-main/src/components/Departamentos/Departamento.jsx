import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TableU from "./TableU";
import CrearDepartamento from './CrearDepartamento';
import {Table} from "react-bootstrap";


function Departamento(props) {

  const { nameChange } = props;

  const mostrarSms = (newName)=>{
    nameChange(newName);
  };

  return (
    <div className="top__card">
      <div className="container_top">
      <div className="container_text">
      <h3>Departamentos registrados</h3>
      </div>

      <div className="container_button">
       <CrearDepartamento mostrar={mostrarSms}/>
      </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
         <div className="container_table">
         <TableU/>
         </div>
      </ResponsiveContainer>
    </div>
  );
}

export default Departamento;
