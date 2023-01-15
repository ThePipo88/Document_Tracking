import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Dashboard/Navbar";
import { Link } from 'react-router-dom';
import { Alert, Form, Input, Button, Select, DatePicker } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import TablaEmpleados from "../components/Departamentos/TablaEmpleados";
import axios from "axios";

const { Option } = Select;

function EditarDepartamento(props) {

  const location = useLocation();

  const data = location.state;

const [showAlert, setShowAlert] = useState(false);

const [nombreDepartamentoT, setNombDepT] = useState('');


//Departamento
const [body, setBody] = useState({ departamento: '', descripcion: '', telefono: '', correoElectronico: '', jefeDepa:''})

	const handleChange = (e,name) => {

    if(name == "departamento"){
      body.departamento = e.target.value;
    } 
    else if(name == "descripcion"){
      body.descripcion = e.target.value;
    }
    else if(name == "telefono"){
      body.telefono = e.target.value;
    }
    else if(name == "correoElectronico"){
      body.correoElectronico = e.target.value;
    }
    else if(name == "tipoEmpleado"){
      body.jefeDepa = e.target.value;
    }

	}

  //Empleado
  const [nombreE, setNombreEmp] = useState('');

  const [apellidos, setApellidos] = useState('');

  const [cedula, setCedula] = useState('');

  const [fechaNac, setFechaNac] = useState('');

  const [tipoEmp, setTipoEmp] = useState('');

  const [form2] = Form.useForm();

  //Cargar los empleados en el select
  const [emp, setEmp] = useState([

  ]);


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
        body.jefeDepa = data.user.jefe_dep;

        setNombDepT(body.departamento);

        cargarForm();


      }).catch(({response}) => {

     })
    }
    )();

    (
      async () => {
        axios.get('http://localhost:3977/api/v1/empleados/obtener/empleadosPorDepartamento/'+data.myData.id_dep)
        .then(({data}) => {

          for(let i = 0; i < data.user.length; i++){   
            const newUser = {
            key: i,
            nombre: data.user[i].nombre_emp +' '+data.user[i].apellidos_emp,
            };
            setEmp((pre) => {
              return [...pre, newUser];
            });
        }

        }).catch(({response}) => {
  
       })
      }
    )();
  }
},[]);

  

  const onChangeFecha = (value) => {
    setFechaNac(value);
  };
  
  const onChangeJefe = (value) => {
    /*console.log(`selected ${value}`);*/
    body.jefeDepa = value;
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

    const actualizarDepartamento = (values) => {

      console.log(body);

      
      const user = {
        nombre_dep: body.departamento,
        jefe_dep: body.jefeDepa,
        descripcion_dep: body.descripcion,
        tel_dep: body.telefono,
        correo_dep: body.correoElectronico
      }
  
      axios.put('http://localhost:3977/api/v1/departamento/actualizar/'+data.myData.id_dep, user)
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


    const onChangeEmpleado = (value) => {
      setTipoEmp(value);
    };

   const [form] = Form.useForm();

   const cargarForm = () => {
    if(body.jefeDepa != ''){
      form.setFieldsValue({departamento: body.departamento, jefeDepartamento: body.jefeDepa, descripcion: body.descripcion, telefono: body.telefono, correoElectronico: body.correoElectronico});
    }else{
      form.setFieldsValue({departamento: body.departamento, descripcion: body.descripcion, telefono: body.telefono, correoElectronico: body.correoElectronico});
    }
    
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


  return (
      <div className="metrics">
      <Navbar name = {<div>
                 <span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}}>Departamentos {'>'} </span>
                <span className='nav-text' style={{cursor: "pointer"}} > Editar</span></div>}/>
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
        <Input size="large" placeholder="Nombre del departamento" onChange={e => handleChange(e,"departamento")} prefix={<BankOutlined />} />
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
        <Input size="large" placeholder="Descripcion" onChange={e => handleChange(e,"descripcion")} prefix={<AuditOutlined />} />
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
        <Input size="large" placeholder="Telefono" onChange={e => handleChange(e,"telefono")} prefix={<PhoneOutlined />} />
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
        <Input size="large" placeholder="Correo electronico" onChange={e => handleChange(e,"correoElectronico")} prefix={<CommentOutlined />} />
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
      >
        {emp.map((user)=> <Option key={user.key} value={user.nombre}/>) }
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

export default EditarDepartamento;