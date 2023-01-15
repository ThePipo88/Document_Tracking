import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TablaConsulta from "../Consulta/TablaConsulta";

function ConsultaT(props){

    const { nameChange } = props;

    const mostrarSms = (newName)=>{
      nameChange(newName);
    };

    return(
        <div className="top__card">
        <div className="container_top">
        <div className="container_text">
        <h3>Consulta Tracking</h3>
        </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
            <div className="container_table">
            <TablaConsulta/>
            </div>
        </ResponsiveContainer>
        </div>
    );
}
export default ConsultaT;