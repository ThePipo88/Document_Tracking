import React, {useState, useEffect} from "react";
import { Modal, Button, Input, Form, Alert, Select  } from 'antd';
import { useLocation } from 'react-router-dom';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import { message } from 'antd';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";



const App = () => {

    const { Option } = Select;

    const cookies = new Cookies();

    const location = useLocation();

    const [visible, setVisible] = useState(false);

    const [departamentoC, setDepartamentoC] = useState('');

    const [estadoC, setEstadoC] = useState('');

    const [numCiclo, setNumCiclo] = useState('');

    

    const data = location.state;

    const [form] = Form.useForm();

    const resetearForm = () => {
        form.resetFields();
        setVisible(false);
    }

    const [dataSource, setDataSource] = useState([

    ]);

    useEffect(() => {
        return () => {
          (
            async () => {
              axios.get('http://localhost:3977/api/v1/departamento/getByIdOrg/'+cookies.get('organizacion_id'))
              .then(({data}) => {
      
                for(let i = 0; i < data.user.length; i++){   
                  const newDep = {
                  key: i,
                  id_dep: data.user[i]._id,
                  nombre: data.user[i].nombre_dep,
                  };
                  setDataSource((pre) => {
                    return [...pre, newDep];
                  });
              }
      
              }).catch(({response}) => {
        
             })
            }
          )();
      }
      },[]);



    const onChangeCiclo = (value) => {
        setDepartamentoC(value);
    };
  
    const onSearch = (value) => {
      console.log('search:', value);
    };

    const onFinish = (values) => {

            axios.get('http://localhost:3977/api/v1/tramites/obtener/'+cookies.get('ideTramite'))
            .then(({data}) => {
    
              const tramite = data.user;

              const newCiclo = {
                id_departamento: departamentoC,
                estado_cic: false
              }

              tramite.ciclo_tra.push(newCiclo);

              axios.put('http://localhost:3977/api/v1/tramites/actualizar/'+cookies.get('ideTramite'), tramite)
            .then(({data}) => {

                swal({
                    title: "Felicidades",
                    text: "Departamento agregado con exito",
                    icon: "success",
                    button: "Aceptar",
                }).then((result) => {
                  window.location.reload();
                })
    
            }).catch(({response}) => {
      
           })   
    
            }).catch(({response}) => {
      
           })          

        
                
    }

    return(
        <>
            <button className='button-62' onClick={() => setVisible(true)}>
                Agregar departamento
            </button>

            <Modal
                title="Agregar departamento al ciclo"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => resetearForm()}
                footer={null}
                width={400}
            >
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
            onFinish={onFinish}
            autoComplete="off"
            >
            <Form.Item
            name="numCiclo"
            >
            <Select
                showSearch
                placeholder="Departamento a seleccionar"
                optionFilterProp="children"
                onChange={onChangeCiclo}
                onSearch={onSearch}
                prefix={<HomeOutlined />}
            >
            {dataSource.map(documento => (
            <Option key={documento.key} value={documento.id_dep}> {documento.nombre}</Option>
            ))}
  
            </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 18,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                Registrar
                </Button>
            </Form.Item>
            </Form>
            </Modal>

            </>
    );
}
export default App;