import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import ActualizarEmpleado from '../Departamentos/ActualizarEmpleado';
import axios from "axios";
import 'antd/dist/antd.min.css';

const App = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([

  ]);

  useEffect(() => {
    return () => {
      (async () => {
        axios.get('http://localhost:3977/api/v1/empleados/obtener/empleadosPorDepartamento/'+props.id_dep)
        .then(({data}) => {

          for(let i = 0; i < data.user.length; i++){   
            const newUser = {
            key: i,
            id: data.user[i]._id,
            nombre: data.user[i].nombre_emp,
            apellidos: data.user[i].apellidos_emp,
            cedula: data.user[i].cedula_emp,
            fecha: data.user[i].fecNacimiento_emp,
            puesto: data.user[i].tipoEmpleado,
            editar: <ActualizarEmpleado idU={data.user[i]._id} nombreU={data.user[i].nombre_emp} apellidosU={data.user[i].apellidos_emp} cedulaU={data.user[i].cedula_emp} fechaU={data.user[i].fecNacimiento_emp} puestoU={data.user[i].tipoEmpleado}/>,
            };
            setDataSource((pre) => {
              return [...pre, newUser];
            });
        }

        }).catch(({response}) => {
  
       })
      }
      )();
    }
  },[]);
  
  const myData = {
    name: 'Recursos Humanos'
  }

  function editarDepartamento(id){
    console.log("Se metio en la vara");
    //navigate("/admin/departamentos/editar", {state:{myData}});
    return(
      <ActualizarEmpleado/>
    );
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      width: '20%',

    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      width: '20%',
      ...getColumnSearchProps('apellidos'),
    },
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
      width: '20%',
      ...getColumnSearchProps('cedula'),
    },
    {
      title: 'Puesto',
      dataIndex: 'puesto',
      key: 'puesto',
      width: '20%',
      ...getColumnSearchProps('puesto'),
    },
    {
      title: 'Editar',
      dataIndex: 'editar',
      key: 'editar',
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};

export default App;