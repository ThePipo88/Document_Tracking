import React from "react";
import { ResponsiveContainer } from "recharts";
import TableCaso  from "../Casos/TableCasos";
import CrearCaso  from "../Casos/CrearCaso";



function Caso(){

    return(
        <div className="top__card">
            <div className="container_top">
                <div className="container_text">
                    <h3>Casos departamento</h3>
                </div>
                <div className="container_button">
       <CrearCaso/>
      </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <div className="container_table">
                <TableCaso origin={true}/>
                </div>
            </ResponsiveContainer>
        </div>
    )  
}

export default Caso;