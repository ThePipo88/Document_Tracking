import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import Tramite from "../components/Tramites/Tramite";
import imagen from "../assets/documento.png";
import pendiente from "../assets/pendiente.png";
import subido from "../assets/subido.png";
import axios from "axios";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";


function VerConsulta(props) {

  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();

  const data = location.state;


  const [datos, setDatos] = useState([

  ]);

  useEffect(() => {
    return () => {
        (async () => {
          
            axios.get('http://localhost:3977/api/v1/documentos/finByNumCaso/'+data.myData.id_cons)
            .then(({data}) => {
              
              for(var i = 0; i < data.user.length; i++){

                if(data.user[i].estado_doc){
                  const newDocument = {
                    key: i,
                    nombre: data.user[i].nombre_doc,
                    color: "rgb(178, 255, 214)",
                    textoInferior: "Subido",
                    icono: subido
                  }

                  setDatos((pre) => {
                    return [...pre, newDocument];
                  });
                }else{
                  const newDocument = {
                    key: i,
                    nombre: data.user[i].nombre_doc,
                    color: "rgb(255, 255, 204)",
                    textoInferior: "Pendiente",
                    icono: pendiente
                   }

                   setDatos((pre) => {
                    return [...pre, newDocument];
                  });
                }
              }

            }).catch(({response}) => {
      
      })
          })();
    }
  },[]);

  const documentos  = [
    {
     nombre: "Digitales",
     color: "rgb(178, 255, 214)",
     textoInferior: "Subido",
     icono: subido
    },
    {
      nombre: "Hoja de vida",
      color: "rgb(255, 255, 204)",
      textoInferior: "Pendiente",
      icono: pendiente
     }
  ]

  return (
    <div className="metrics">
      <Navbar name = {<div><span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}}>Consulta {'>'} </span>
      <span className='nav-text' style={{cursor: "pointer"}} >Estado </span>
      </div>}/>
      {datos.map(documento => (
        <div className="grid-tracking" key={documento.key}>
        <div style={{backgroundColor:documento.color}} className="top__tracking">
           <h2 className="text_document">{documento.nombre}</h2>
              <div>
                <img src={imagen} alt="" style={{height:"150px", width:"150px", marginLeft: "5%"}}/>
              </div>
              <div style={{marginTop: "2%"}}>
                <img src={documento.icono} alt="" style={{height:"50px", width:"50px"}}/>
                <h3 className="text_document">{documento.textoInferior}</h3>
              </div>
          </div>
       </div>
      ))}
    </div>
  );
}

export default VerConsulta;