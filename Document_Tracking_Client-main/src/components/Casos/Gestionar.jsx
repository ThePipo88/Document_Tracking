import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TableGestionar from "./TableGestionar";

function Gestionar(props){

    const { id, nombre } = props;



    return(
    <div className="top__card">
      <div className="container_top">
      <div className="container_text">
      <h3>{nombre} documentos</h3>
      </div>

      <div className="container_button">
      </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
         <div className="container_table">
         <TableGestionar id_c={id}/>
         </div>
      </ResponsiveContainer>
    </div>
    );
}
export default Gestionar;