import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBars  from 'react-custom-scrollbars';
import { Alert, Form, Input, Button, Select, DatePicker, Space } from 'antd';
import { UserOutlined, AuditOutlined, SettingOutlined, AlignCenterOutlined,GoogleOutlined,CaretDownOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import axios from "axios";

const { Option } = Select;

function Parametro(props){

  const cookies = new Cookies();


    const { nameChange } = props;

    const mostrarSms = (newName)=>{
        nameChange(newName);
    };

  
  
  const [showAlert, setShowAlert] = useState(false);
  

  const [visible, setVisible] = useState(true);


  const [body, setBody] = useState({ nombreOrg: '', descripcionOrg: '', correoOrg: '', tipoOrg: ''})

  const [userBody, setUserBody] = useState({ nombreUser: '', rolUser: '', contrasenaUser: ''})


   //Actualizar datos en el sistema

useEffect(() => {
  return () => {
    (async () => {
      axios.get('http://localhost:3977/api/v1/organizacion/getOrganizacion/'+cookies.get('organizacion_id'))
      .then(({data}) => {

        body.nombreOrg = data.user.nombre_org;
        body.descripcionOrg = data.user.descripcion_org;
        body.correoOrg = data.user.correo_org;
        body.tipoOrg = data.user.tipo_org;

        form.setFieldsValue({nombreO: body.nombreOrg, descripcion: body.descripcionOrg, Correo: body.correoOrg, tipo: body.tipoOrg});

      }).catch(({response}) => {

     })

     axios.get('http://localhost:3977/api/v1/usuarios/obtener/usuario/'+cookies.get('usuarioAdminId'))
      .then(({data}) => {

        userBody.nombreUser = data.user.nombre_usuario;
        userBody.rolUser = data.user.rol;
        userBody.contrasenaUser = '';

        form2.setFieldsValue({nombreU: userBody.nombreUser, rol: userBody.rolUser, contrasena: ''});
      }).catch(({response}) => {

     })

    }
    )();
  }
},[]);

    const actualizarOrganizacion = (values) => {

      const newData = {
        nombre_org: body.nombreOrg,
        descripcion_org: body.descripcionOrg,
        correo_org: body.correoOrg,
        tipo_org: body.tipoOrg,
    }

      axios.put('http://localhost:3977/api/v1/organizacion/updateById/'+cookies.get('organizacion_id'),newData)
      .then(({data}) => {

        setTimeout(() => {
          swal({
              title: "Felicidades",
              text: "Infromacion de parametros actualizada",
              icon: "success",
              button: "Aceptar"
          }).then((result) => {
            window.location.reload();
          })
      },200)

      }).catch(({response}) => {
           
     })

    };

    const [form] = Form.useForm();

    const actualizarUsuario= (values) => {

      var newData = {};

      if(userBody.contrasenaUser == ''){
        newData = {
          nombre_usuario: userBody.nombreUser,
          rol: userBody.rolUser,
        }
      }else{
        newData = {
          nombre_usuario: userBody.nombreUser,
          rol: userBody.rolUser,
          contrasena: userBody.contrasenaUser
        }
      }


      axios.put('http://localhost:3977/api/v1/usuarios/actualizar/usuario/'+cookies.get('usuarioAdminId'),newData)
      .then(({data}) => {
        form2.setFieldsValue({contrasena: ''});

        cookies.set('nombreUsuario', userBody.nombreUser, {path: '/'});
        
        setTimeout(() => {
          swal({
              title: "Felicidades",
              text: "Infromacion de usuario actualizada",
              icon: "success",
              button: "Aceptar"
          }).then((result) => {
            window.location.reload();
          })
      },200)

      }).catch(({response}) => {
           
     })
    };

    const [form2] = Form.useForm();

    const resetearForm = () => {
      form.resetFields();
      setVisible(false);
    }
  
    const handleNameChange = (newName)=>{
    setShowAlert(newName);
     };

    return(
        <div className="metrics">
      <div className="grid-edit">
      <div className="top__edit">
        <div className="container_edit">
          <h3>Organización</h3>
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
      onFinish={actualizarOrganizacion}
      autoComplete="off"
    >
      <Form.Item
        name="nombreO"
        rules={[
          {
            required: true,
            message: 'El nombre de la organizacion es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre Organizacion" onChange={(e) => body.nombreOrg = e.target.value} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="descripcion"
        rules={[
          {
            required: true,
            message: 'La descripcion es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Descripción" onChange={(e) => body.descripcionOrg = e.target.value} prefix={<AlignCenterOutlined />} />
      </Form.Item>

      <Form.Item
        name="Correo"
        rules={[
          {
            required: true,
            message: 'El correo electronico es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Correo electrónico" onChange={(e) => body.correoOrg = e.target.value} prefix={<GoogleOutlined />} />
      </Form.Item>

      <Form.Item
        name="tipo"
        rules={[
          {
            required: true,
            message: 'El tipo es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Tipo" onChange={(e) => body.tipoOrg = e.target.value} prefix={<CaretDownOutlined />} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 10,
        }}
      >
        <button type="primary" className="button-62">
          Actualizar Organización
        </button>
      </Form.Item>
    </Form>
        </div>
       </div>
       <div className="top__edit">
       <h3>Usuario Administrador</h3>
       <Form
      form={form2}
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
      onFinish={actualizarUsuario}
      autoComplete="off"
    >
      <Form.Item
        name="nombreU"
        rules={[
          {
            required: true,
            message: 'El nombre del usuario administrador es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del administrador" onChange={(e) => userBody.nombreUser = e.target.value} prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="rol"
        rules={[
          {
            required: true,
            message: 'El rol es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Rol" onChange={(e) => userBody.rolUser = e.target.value} prefix={<SettingOutlined />} />
      </Form.Item>

      <Form.Item
        name="contrasena"
      >

    <Input.Password
      onChange={(e) => userBody.contrasenaUser = e.target.value}
      placeholder="Ingresar nueva contraseña del administrador"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />

      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 10,
        }}
      >
        <button type="primary" className="button-63" >
          Actualizar Administrador
        </button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>
    );
}

export default Parametro;