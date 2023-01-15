import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBars  from 'react-custom-scrollbars';
import { Alert, Form, Input, Button, Select, DatePicker, Dropdown, Menu } from 'antd';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import TablaDocumentos from "../components/Tramites/TablaDocumentos";
import TablaCiclos from "../components/Tramites/TablaCiclos";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import CrearDocumento from "../components/Tramites/CrearDocumento";
import EditarCiclo from './EditarCiclo';
import CrearCiclo from "../components/Tramites/CrearCiclo"


const { Option } = Select;

function EditarTramite(props){
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

    //const [descripcion, setDescripcion] = useState('');

    //const [departamnetoAsig, setDepartamentoAsig] = useState('');



    const [body, setBody] = useState({ nombreT: '', descripcion: '', departamnetoAsig: ''})

	const handleChange = (e,name) => {

    if(name == "nombreT"){
      body.nombreT = e.target.value;
    } 
    else if(name == "descripcion"){
      body.descripcion = e.target.value;
    }
    else if(name == "departamnetoAsig"){
      body.departamnetoAsig = e.target.value;
    }
	}

    //Actualizar Tramite

    useEffect(() => {
        return () => {
            (async () => {
                axios.get('http://localhost:3977/api/v1/tramites/obtener/'+data.myData.id_tra)
                .then(({data}) => {
          
                  body.nombreT = data.user.tipo_tra;
                  body.descripcion = data.user.descripcion_tra;
                  body.departamnetoAsig = data.user.departamento_id;
                  setNombreTra(body.nombreT);
                }).catch(({response}) => {
          
               })
              }
              )();
              (
                async () => {
                  axios.get('http://localhost:3977/api/v1/departamento/getByIdOrg/'+cookies.get('organizacion_id'))
                  .then(({data}) => {
          
                    for(let i = 0; i < data.user.length; i++){   
                      const newDep = {
                      key: i,
                      nombre: data.user[i].nombre_dep,
                      };

                      if(body.departamnetoAsig == data.user[i]._id){
                        body.departamnetoAsig = data.user[i].nombre_dep;
                      }

                      setDep((pre) => {
                        return [...pre, newDep];
                      });
                  }
          
                  cargarForm();
                  }).catch(({response}) => {
            
                 })
                }
              )();
        }
    },[]);


    const onChangeJefe = (value) => {
        console.log(`selected ${value}`);
    };
      
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const actualizarTramite = (values) => {
        setTimeout(() => {
            swal({
                title: "Felicidades",
                text: "Infromacion de tramite actualizada",
                icon: "success",
                button: "Aceptar"
            });
        },200)

    };

    const [form] = Form.useForm();

    const resetearForm = () => {
        form.resetFields();
        setVisible(false);
    }

    const handleNameChange = (newName)=>{
        setShowAlert(newName);
    };
    const onChangeDepartamento = (value) => {
        body.departamnetoAsig = value;
      };


    const cargarForm = () => {
        form.setFieldsValue({nombreT: body.nombreT, descripcion: body.descripcion, departamentoAsinar: body.departamnetoAsig});
    }
        
    const actualizarTramite1 = (values) => {

        console.log(body);
  
        
        const user = {
          tipo_tra: body.nombreT,
          descripcion_tra: body.descripcion,
          departamento_id: body.departamnetoAsig 
        }
    
        axios.put('http://localhost:3977/api/v1/tramites/actualizar/'+data.myData.id_tra, user)
          .then(({data}) => {
  
    
            setTimeout(() => {
              swal({
                  title: "Felicidades",
                  text: "Infromacion de departamento actualizada",
                  icon: "success",
                  button: "Aceptar"
              }).then((result) => {
                window.location.reload();
              })
    
          },200)
    
          }).catch(({response}) => {
    
        }) 
  
      }; 

    return(
        <div className="metrics">
            <Navbar name = {<div><Link to={"/admin/tramites" } params={data}>
                 <span className='nav-text'>Tramites {'>'}</span>
                </Link> <span className='nav-text'>Editar</span></div>}/>
            <div className="grid-edit">
                <div className="top__edit">
                    <div className="container_edit">
                        <h3>Informacion del Tramite</h3>
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
                            onFinish={actualizarTramite1}
                            autoComplete="off"
                        >
                        <Form.Item
                            name="nombreT"
                            rules={[
                            {
                                required: true,
                                message: 'El nombre del tramite es requerido',
                            },
                            ]}
                        >
                            <Input size="large" placeholder="Nombre del tramite" onChange={e => handleChange(e,"nombreT")} prefix={<ContainerOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="descripcion"
                            rules={[
                            {
                                required: true,
                                message: 'La descripcion del tramite es requerida',
                            },
                            ]}
                        >
                            <Input size="large" placeholder="Descripcion" onChange={e => handleChange(e,"descripcion")} prefix={<AlignCenterOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="departamentoAsinar"
                            >
                            <Select
                                showSearch
                                placeholder="Departamento a Asignar"
                                optionFilterProp="children"
                                onChange={onChangeDepartamento}
                                onSearch={onSearch}
                                prefix={<HomeOutlined />}
                            >
                            {dep.map((user)=> <Option key={user.key} value={user.nombre}/>) }
                            </Select>
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
            <div className="grid-users">
                <div className="bootom__users">
                    <h3>Documentos Requeridos</h3>
                    <div className="container_button">
                    <CrearDocumento mostrar={mostrarSms}/>
                    </div>
                <ResponsiveContainer width="100%" height="100%">
                <div className="container_table">
                    <TablaDocumentos/>
                </div>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="grid-users">
                <div className="bootom__users">
                <h3>Ciclo</h3>
                <div className="container_button">
                    <CrearCiclo/>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                <div className="container_table">
                    <TablaCiclos/>
                </div>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

}

export default EditarTramite;