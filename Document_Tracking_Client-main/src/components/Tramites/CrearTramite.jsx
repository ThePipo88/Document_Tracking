import React, {useState, useEffect} from "react";
import { Modal, Button, Input, Form, Alert, Select  } from 'antd';
import { useLocation } from 'react-router-dom';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import { message } from 'antd';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";

const { Option } = Select;

const App = (mostrar) => {

  const location = useLocation();

    const [visible, setVisible] = useState(false);

    const [nombre, setNombre] = useState('');

    const [descripcion, setDescripcion] = useState('');

    const [departamentoAsinar, setDepartamentoAginar] = useState('');

    const [nombreDep, setNombreDep] = useState('');

    const [idDep, setIdDep] = useState('');

    const [estadoCiclo, setEstadoCiclo] = useState('');

    const [nombreDoc, setNombreDoc] = useState('');

    const [descripcionDoc, setDesdoc] = useState('');

    const [estado, setEstado] = useState('');

    const [tipoArch, setTipoArc] = useState('');

    const [dep, setDep] = useState([

    ]);
    
    const data = location.state;

    const cookies = new Cookies();


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
                setDep((pre) => {
                  return [...pre, newDep];
                });
            }
    
            }).catch(({response}) => {
      
           })
          }
        )();
    }
    },[]);

    const onFinish = (values) => {
      if(nombre != '' && descripcion != '' && departamentoAsinar != ''){


        const user = {
          tipo_tra: nombre,
          organizacion_id: cookies.get('organizacion_id'),
          departamento_id: departamentoAsinar,
          descripcion_tra: descripcion,
          ciclo_tra:
              [
                  {
                      nombre_departamento: nombreDep,
                      id_departamento: idDep,
                      estado_cic: true
                  }
              ],
          documentos:
          [
          ]
      }
        axios.post('http://localhost:3977/api/v1/tramites/registrartramites',user)
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
    
            if(response.status == "500"){
              Swal.fire({
                title: 'Tramite ya existentes',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                
                })
            }else if(response.status == "500"){
              Swal.fire({
                title: 'Se produjo un error',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                
                })
            }
          })
      }else{
      
      }
  };

    const [form] = Form.useForm();

    const resetearForm = () => {
        form.resetFields();
        setVisible(false);
    }


    const onChangeDepartamento = (value) => {
      setDepartamentoAginar(value);
    };
  
    const onSearch = (value) => {
      console.log('search:', value);
    };

    return(
    <>
        <button className='button-62' onClick={() => setVisible(true)}>
        Nuevo Tramite
        </button>

    <Modal
        title="Nuevo Tramite"
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
        name="tramite"
        rules={[
          {
            required: true,
            message: 'El nombre del tramite es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del tramite" onChange={(e) => setNombre(e.target.value)} prefix={<ContainerOutlined />} />
      </Form.Item>

      <Form.Item
        name="Descripcion"
        rules={[
          {
            required: true,
            message: 'La descripcion del tramite es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Descripcion" onChange={(e) => setDescripcion(e.target.value)} prefix={<AlignCenterOutlined />} />
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
      {dep.map(documento => (
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