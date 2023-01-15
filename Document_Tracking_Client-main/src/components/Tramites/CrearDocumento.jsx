import React, {useState, useEffect} from "react";
import { Modal, Button, Input, Form, Alert, Select, Switch  } from 'antd';
import { useLocation } from 'react-router-dom';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import { message } from 'antd';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";

const App = (mostrar) => {
    const location = useLocation();

    const [visible, setVisible] = useState(false);

    const [documento, setDocumento] = useState('');

    const [descripcion, setDescripcion] = useState('');

    const[tipoArchivo, setTipoArchivo] = useState('');


    const data = location.state;

    const cookies = new Cookies();


    const [form] = Form.useForm();

    const resetearForm = () => {
        form.resetFields();
        setVisible(false);
    }


  
    const onSearch = (value) => {
      console.log('search:', value);
    };

    const onFinish = (values) => {
       

          axios.get('http://localhost:3977/api/v1/tramites/obtener/'+cookies.get('ideTramite'))
          .then(({data}) =>{
            const user = {
                      nombre_documento: documento,
                      descripcion_documento: descripcion,
                      estado_documento: true,
                      tipo_documento:tipoArchivo     
            }
            data.user.documentos.push(user);
            axios.put('http://localhost:3977/api/v1/tramites/actualizar/'+cookies.get('ideTramite'),data.user)
                  .then(({data}) => {
            setVisible(false);
            form.resetFields();
                swal({
                    title: "Felicidades",
                    text: "Tramite registrado con exito",
                    icon: "success",
                    button: "Aceptar",
                }).then((result) => {
                  window.location.reload();
                })
                
                  }).catch(({response}) => {
      

            })
            /*
            data.user.documentos.push(user);
            console.log(data.user.documentos);*/

          }
          )       
    };

    return(
        <>
        <button className='button-62' onClick={() => setVisible(true)}>
        Nuevo Documento
        </button>

    <Modal
        title="Nuevo Documento Requerido"
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
        name="documento"
        rules={[
          {
            required: true,
            message: 'El nombre del documento es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del documento" onChange={(e) => setDocumento(e.target.value)} prefix={<ContainerOutlined />} />
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
        <Input size="large" placeholder="Descripcion" onChange={(e) => setDescripcion(e.target.value)} prefix={<AlignCenterOutlined />} />
      </Form.Item>
      <Form.Item
        name="tipoArchivo"
        rules={[
          {
            required: true,
            message: 'El tipo del archivo es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Tipo del Archivo" onChange={(e) => setTipoArchivo(e.target.value)} prefix={<AlignCenterOutlined />} />
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