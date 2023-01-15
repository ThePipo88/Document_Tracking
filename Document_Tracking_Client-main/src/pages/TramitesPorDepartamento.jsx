import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBars  from 'react-custom-scrollbars';
import { Alert, Form, Input, Button, Select, DatePicker } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import TablaEmpleados from "../components/Departamentos/TablaEmpleados";
import axios from "axios";
//Nesito hacer una consulta a la base de datos que me traiga todos los tramites ingresando el id del usario, y estos cargarlos en la pagina

const { Option } = Select;

function TramitesPorDepartamento(props) {

  const location = useLocation();
  const data = location.state;

  const [showAlert, setShowAlert] = useState(false);

  const nombre = "Departamentos > "+ data.myData.name;

//Actualizar datos en el sistema

useEffect(() => {
  return () => {
    (async () => {
      axios.get('http://localhost:3977/api/v1/departamento/obtener/'+data.myData.id_dep)
      .then(({data}) => {

        body.departamento = data.user.nombre_dep;
        body.descripcion = data.user.descripcion_dep;
        body.telefono = data.user.tel_dep;
        body.correoElectronico = data.user.correo_dep;

        cargarForm();


      }).catch(({response}) => {

     })
    }
    )();
  }
},[]);

//Variables para actualizar departamento

const [visible, setVisible] = useState(false);

  const [nombreD, setNombreDep] = useState();

  const [descripcion, setDescripcion] = useState('');

  const [telefono, setTelefono] = useState('');

  const [correo, setCorreo] = useState('');

  const [body, setBody] = useState({ departamento: '', Descripcion: '', telefono: '', correoElectronico: '', tipoEmpleado:''})

	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}

  const onChangeFecha = (value) => {
    setFechaNac(value);
  };
  
  const onChangeJefe = (value) => {
    /*console.log(`selected ${value}`);*/
    body.tipoEmpleado = value;
  };

  const onSearch = (value) => {
    console.log('search:', value);

  };

    const actualizarDepartamento = (values) => {
            setTimeout(() => {
                swal({
                    title: "Felicidades",
                    text: "Informacion de departamento actualizada",
                    icon: "success",
                    button: "Aceptar"
                });
            },200)

    };


    const onChangeEmpleado = (value) => {
      setTipoEmp(value);
    };

   const [form] = Form.useForm();

   const cargarForm = () => {
    form.setFieldsValue({departamento: body.departamento, descripcion: body.descripcion, telefono: body.telefono, correoElectronico: body.correoElectronico});
  }

   //Variables para agregar empleados
   const registrarUsuario = (values) => {

    const user = {
      nombre_emp: nombreE,
      apellidos_emp: apellidos,
      cedula_emp: cedula,
      fecNacimiento_emp: fechaNac,
      tipoEmpleado: tipoEmp,
      id_departamento: data.myData.id_dep
    }

    axios.post('http://localhost:3977/api/v1/empleados/registrar/empleados', user)
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

  const [nombreE, setNombreEmp] = useState('');

  const [apellidos, setApellidos] = useState('');

  const [cedula, setCedula] = useState('');

  const [fechaNac, setFechaNac] = useState('');

  const [tipoEmp, setTipoEmp] = useState('');

   const [form2] = Form.useForm();

const handleNameChange = (newName)=>{
  setShowAlert(newName);
};

  return (
      <div className="metrics">
      <Navbar name = {nombre}/>
      <div className="grid-edit">
      <div className="top__edit">
        <div className="container_edit">
          <h3>Informacion del departamento</h3>
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
      onFinish={actualizarDepartamento}
      autoComplete="off"
    >
      <Form.Item
        name="departamento"
        rules={[
          {
            required: true,
            message: 'El nombre del departamento es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del departamento" prefix={<BankOutlined />} />
      </Form.Item>

      <Form.Item
        name="descripcion"
        rules={[
          {
            required: true,
            message: 'La descripcion del departamento es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Descripcion" onChange={handleChange} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="telefono"
        rules={[
          {
            required: true,
            message: 'El numero de telefono es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Telefono" onChange={handleChange} prefix={<PhoneOutlined />} />
      </Form.Item>

      <Form.Item
        name="correoElectronico"
        rules={[
          {
            required: true,
            message: 'El correo electronico es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Correo electronico" onChange={handleChange} prefix={<CommentOutlined />} />
      </Form.Item>

      <Form.Item
      name="jefeDepartamento"
    >
       <Select
        showSearch
        placeholder="Jefe del departamento"
        optionFilterProp="children"
        onChange={onChangeJefe}
        onSearch={onSearch}
        prefix={<CommentOutlined />}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
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
       <div className="top__edit">
       <h3>Agregar empleado</h3>
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
      onFinish={registrarUsuario}
      autoComplete="off"
    >
      <Form.Item
        name="empleado"
        rules={[
          {
            required: true,
            message: 'El nombre del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del empleado" onChange={event => setNombreEmp(event.target.value)}prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="PrimerApellido"
        rules={[
          {
            required: true,
            message: 'El primer apellido es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Apellidos" onChange={event => setApellidos(event.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="SegundoApellido"
      >
        <Input size="large" placeholder="Cedula" onChange={event => setCedula(event.target.value)} prefix={<SolutionOutlined />} />
      </Form.Item>

      <Form.Item
        name="fechaNacimiento"
        rules={[
          {
            required: true,
            message: 'La fecha de nacimiento es requerida',
          },
        ]}
      >
        <DatePicker onChange={onChangeFecha} placeholder="Fecha de nacimiento" style={{ width: '100%' }}  />
      </Form.Item>

      <Form.Item
      name="tipoEmpleado"
      rules={[
        {
          required: true,
          message: 'El tipo de empleado es requerido',
        },
      ]}
    >
       <Select
        showSearch
        placeholder="Tipo de empleado"
        optionFilterProp="children"
        onChange={onChangeEmpleado}
        onSearch={onSearch}
        prefix={<CommentOutlined />}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        <Option value="Ingeniero">Ingeniero</Option>
        <Option value="Administrador">Administrador</Option>
        <Option value="Contador">Contador</Option>
      </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 10,
        }}
      >
        <button type="primary" className="button-63">
          Registrar empleado
        </button>
      </Form.Item>
    </Form>
       </div>
      </div>
      <div className="grid-users">
      <div className="bootom__users">
       <h3>Empleados del departamento</h3>
       <ResponsiveContainer width="100%" height="100%">
         <div className="container_table">
         <TablaEmpleados id_dep = {data.myData.id_dep}/>
         </div>
      </ResponsiveContainer>
       </div>
      </div>
    </div>
  );
}

export default TramitesPorDepartamento;