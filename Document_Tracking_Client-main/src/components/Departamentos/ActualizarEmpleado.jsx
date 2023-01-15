import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, DatePicker, Select  } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined} from '@ant-design/icons';
import { message } from 'antd';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";



const App = ({idU, nombreU, apellidosU, cedulaU, fechaU, puestoU}) => {

    const [form] = Form.useForm();

  const resetearForm = () => {
    form.resetFields();
    setVisible(false);
  }
  
  const cookies = new Cookies();

  const { Option } = Select;

  const [visible, setVisible] = useState(false);

  const [nombre, setNombre] = useState('');

  const [apellidos, setApellidos] = useState('');

  const [cedula, setCedula] = useState('');

  const [fechaNac, setFechaNacimiento] = useState(new Date());

  const [tipoEmpleado, setTipoEmp] = useState('');

  

    const onFinish = (values) => {

        console.log(fechaNac);

        const newData = {
            nombre_emp: nombre,
            apellidos_emp: apellidos,
            cedula_emp: cedula,
            fecNacimiento_emp: fechaNac,
            tipoEmpleado: tipoEmpleado
        }

        axios.put('http://localhost:3977/api/v1/empleados/actualizar/'+idU, newData)
        .then(({data}) => {
  
          setTimeout(() => {
            swal({
                title: "Felicidades",
                text: "Infromacion de empleado actualizada",
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
    
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const handleDateChange = date => {
        console.log(date);
    }

    useEffect(() => {

            setNombre(nombreU);
            setApellidos(apellidosU);
            setCedula(cedulaU);
            setFechaNacimiento(fechaU);
            setTipoEmp(puestoU);

      },[]);

      const cargarForm = () => {
        form.setFieldsValue({nombreE: nombre, apellidosE: apellidos, cedulaE: cedula,fechaNacimiento: moment(fechaNac), tipoEmpleado: tipoEmpleado});
        setVisible(true)
      }


  return (
    <>
      <button className='button-users' onClick={() => cargarForm()}>
      </button>

      <Modal
        title="Actualizar empleado"
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
        name="nombreE"
        rules={[
          {
            required: true,
            message: 'El nombre del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del empleado" onChange={(e) => setNombre(e.target.value)} prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="apellidosE"
        rules={[
          {
            required: true,
            message: 'Los apellidos del empleado son requeridos',
          },
        ]}
      >
        <Input size="large" placeholder="Apellidos" onChange={(e) => setApellidos(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="cedulaE"
        rules={[
          {
            required: true,
            message: 'La cedula del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Cedula" onChange={(e) => setCedula(e.target.value)} prefix={<SolutionOutlined />} />
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
        <DatePicker placeholder="Fecha de nacimiento" onChange={date => setFechaNacimiento(date)} style={{ width: '100%' }}  />
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
          offset: 18,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      
    </>
  );
};

export default App;