import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, DatePicker, Select  } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined} from '@ant-design/icons';
import { message } from 'antd';
import LoadImage from '../../assets/load.gif';
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";



const App = (props) => {

    const [form] = Form.useForm();

    const {id} = props;

  const resetearForm = () => {
    setVisible(false);
    window.location.reload();
  }
  
  const cookies = new Cookies();

  const { Option } = Select;

  const [visible, setVisible] = useState(false);

  const [nombre, setNombre] = useState('');

  const [apellidos, setApellidos] = useState('');

  const [cedula, setCedula] = useState('');

  const [fechaNac, setFechaNacimiento] = useState(new Date());

  const [tipoEmpleado, setTipoEmp] = useState('');

  const [isLoading, setLoading] = useState(true);

  const [isListo, setListo] = useState(true);
  
  function guardarArchivo(e) {
    setLoading(false);
    var file = e.target.files[0] //the file
    var reader = new FileReader() //this for convert to Base64 
    reader.readAsDataURL(e.target.files[0]) //start conversion...
    reader.onload = function (e) { //.. once finished..
      var rawLog = reader.result.split(',')[1]; //extract only thee file data part
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      fetch('https://script.google.com/macros/s/AKfycbzdqg30zUnST_fncNXaQbY20k1FgLkzcec-iNuxN7Qq1A1c92PRqFD3W8ctTJkQWYDx/exec', //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
        .then(res => res.json()).then((a) => {
            setLoading(true);
            setListo(false);
          console.log(a) //See response
          modificarArchivoBD(a);
        }).catch(e => console.log(e)) // Or Error in console
    }
  }

  function modificarArchivoBD(a){

    axios.get('http://localhost:3977/api/v1/documentos/finById/'+id)
      .then(({data}) => {

        const updateDocument = {
            nombre_doc: data.user.nombre_doc,
            url_doc: a.url,
            estado_doc: true,
            tipo_documento: data.user.tipo_documento,
            id_tramite: data.user.id_tramite,
            id_caso: data.user.id_caso
        }

        axios.put('http://localhost:3977/api/v1/documentos/actualizar/'+id,updateDocument)
      .then(({data}) => {
        console.log("actualizado");
      }).catch(({response}) => {
      })
        
      }).catch(({response}) => {
      })

  }

    const onFinish = (values) => {


        
    };
      const cargarForm = () => {
        form.setFieldsValue({nombreE: nombre, apellidosE: apellidos, cedulaE: cedula,fechaNacimiento: moment(fechaNac), tipoEmpleado: tipoEmpleado});
        setVisible(true)
      }


  return (
    <>
      <button className='button-archivo' onClick={() => cargarForm()}>Subir</button>

      <Modal
        title="Subir archivo"
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

      <Form.Item >
      <input type="file" accept="application" id="customFile" onChange={(e) => guardarArchivo(e)} />
        </Form.Item>  

        <Form.Item >
        {isLoading ? "" :
      <div>
        <img style={{width: "100px", height: "100px"}} src={LoadImage} /> 
        </div>
        }
        </Form.Item>  

        <Form.Item >
        {isListo ? "" :
      <div>
        <h3>Subido correctamente!</h3>
        </div>
        }
        </Form.Item>  

    </Form>
      </Modal>
      
    </>
  );
};

export default App;