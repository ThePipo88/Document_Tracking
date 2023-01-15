import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBars  from 'react-custom-scrollbars';
import { Alert, Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined, CommentOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from 'sweetalert2';


function EditarDocumento(props){

  const location = useLocation();

  const data = location.state;

  const [showAlert, setShowAlert] = useState(false);

  const nombre = "Tramites > "+ data.myData.name;

  //Variables para actualizar Tramite
  const [visible, setVisible] = useState(false);

  const [nombreT, setNombreTra] = useState('');

  const cookies = new Cookies();


  const [dep, setDep] = useState([

  ]);
  const { nameChange } = props;

  const mostrarSms = (newName)=>{
      nameChange(newName);
  };
  const [form] = Form.useForm();

  const ind =data.myData.indice;
   
  const {Option} = Select;

  const [estado, setEstado] = useState(false);

const [body, setBody] = useState({ nombreD: '', descripcion: '', estadoD: '', tipoArch: ''})

const [documento, setDocumento] = useState({ })

const handleChange = (e,name) => {

  if(name == "nombreD"){
    body.nombreD = e.target.value;
  } 
  else if(name == "descripcion"){
    body.descripcion = e.target.value;
  }
  else if(name == "estadoD"){
    body.estadoD = e.target.value;
  }
  else if(name == "tipoArch"){
    body.tipoArch = e.target.value;
  }
}

const user = {
            
  documentos:
  [
      {
          nombre_documento: body.nombreD,
          descripcion_documento: body.descripcion,
          estado_documento: body.estadoD,
          tipo_documento:body.tipoArch,
      }
  ]
}

const onChange = (checked) => {

};

const cargarForm = () => {
  form.setFieldsValue({nombreD: body.nombreD, descripcion: body.descripcion, estadoD: body.estadoD, tipoArch: body.tipoArch});
}
      
useEffect(() => {
  return () => {


        (async () => {
          axios.get('http://localhost:3977/api/v1/tramites/obtener/'+data.myData.id_doc)
          .then(({data}) => {

               
           
              body.nombreD = data.user.documentos[ind].nombre_documento;
              body.descripcion = data.user.documentos[ind].descripcion_documento;

              if(data.user.documentos[ind].estado_documento){
                body.estadoD = "Activo";
              }else{
                body.estadoD = "Inactivo";
              }
              body.tipoArch = data.user.documentos[ind].tipo_documento;

              setDocumento(data.user);

              cargarForm();
        
            
          }).catch(({response}) => {

        })
        }
        )();

        
  }
},[]);
        

                  
  

  const actualizarDocumento = (values) => {

    documento.documentos[ind].nombre_documento = body.nombreD;
    documento.documentos[ind].descripcion_documento = body.descripcion;
    documento.documentos[ind].estado_documento = estado;
    documento.documentos[ind].tipo_documento = body.tipoArch;

    console.log(documento.documentos[ind].nombre_documento)

    const newDocumenro =  {
      tipo_tra: documento.tipo_tra,
          departamento_id: documento.departamento_id,
          descripcion_tra: documento.descripcion_tra,
          ciclo_tra: documento.ciclo_tra,
          documentos: documento.documentos
    };

    console.log(newDocumenro)
  
    axios.put('http://localhost:3977/api/v1/tramites/actualizar/'+data.myData.id_doc, newDocumenro)
                  .then(({data}) => {
            setVisible(false);
                swal({
                    title: "Felicidades",
                    text: "Documento actualizado con exito",
                    icon: "success",
                    button: "Aceptar",
                }).then((result) => {
                  window.location.reload();
                })
                
                  }).catch(({response}) => {
      
 
                Swal.fire({
                  title: 'Tramite ya existentes',
                  icon: 'warning',
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar'
                  }).then((result) => {
                  
                  })
              
            })
};

function onChangeEstado(value){
  if(value == "Activo"){
    console.log("Activo");
    setEstado(true);
  }else{
    console.log("Inactivo");
    setEstado(false);
  }
}


    return(
      <div className="metrics">
      <Navbar name = {<div>
                 <span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}}>Tramites {'>'}</span>
                 <span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}} >Editar {'>'}</span>
                 <span className='nav-text'>Documentos</span></div>}/>
      <div className="grid-edit">
          <div className="top__edit">
              <div className="container_edit">
                  <h3>Informacion del Documento</h3>
                  <Form
                      form={form}
                      name="basic"
                      labelCol={{
                          span: 16,
                      }}
                      wrapperCol={{
                          span: 24,
                      }}
                      initialValues={{
                          remember: true,
                      }}
                      onFinish={actualizarDocumento}
                      autoComplete="off"
                  >
                  <Form.Item
                    name="nombreD"
                    rules={[
                      {
                        required: true,
                        message: 'El nombre del documento es requerido',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nombre del documento" onChange={e => body.nombreD = e.target.value} prefix={<ContainerOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name="descripcion"
                    rules={[
                      {
                        required: true,
                        message: 'La descripcion del documento es requerida',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Descripcion" onChange={e => body.descripcion = e.target.value}  prefix={<AlignCenterOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="estadoD"
                    rules={[
                      {
                        required: true,
                        message: 'El estado del documento es requerido',
                      },
                    ]}
                  >

                      <Select
                       showSearch
                       placeholder="Departamento a Asignar"
                        optionFilterProp="children"
                        onChange={onChangeEstado}
                        prefix={<CommentOutlined />}
                        >
                        <Option value="Activo">Activo</Option>
                        <Option value="Inactivo">Inactivo</Option>
                        </Select>
                  </Form.Item>
                  <Form.Item
                    name="tipoArch"
                    rules={[
                      {
                        required: true,
                        message: 'El tipo del archivo es requerido',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Tipo del Archivo" onChange={e => body.tipoArch = e.target.value}  prefix={<AlignCenterOutlined />} />
                  </Form.Item>
                  <Form.Item
                      wrapperCol={{
                      offset: 0,
                      span: 10,
                      }}
                  >
                  <button type="primary" className="button-62">
                       Actualizar
                  </button>
                  </Form.Item>
                  </Form>
              </div>
          </div>
      </div>
  </div>
    );

}
export default EditarDocumento;