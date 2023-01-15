import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
import 'antd/dist/antd.min.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const [datos, setDatos] = useState([

  ]);

  const consultaTraking = (id) => {

    const myData = {
      id_cons: id
    }

    navigate("/admin/consulta/verconsulta", {state:{myData}});
  }

  useEffect(() => {
    return () => {
        (async () => {

            axios.get('http://localhost:3977/api/v1/casos/getByIdOrganizacion/'+cookies.get('organizacion_id'))
            .then(({data}) => {
              
              for(var i = 0; i < data.user.length; i++){

                const nId = data.user[i]._id;

                const newDocumento = {
                  key: i,
                  id: nId,
                  nombreCaso: data.user[i].nombre_caso,
                  departamento: data.user[i].id_departamento,
                  numeroCaso: data.user[i].nume_cas,
                  consultaTraking: <button className='button-33' onClick={() => consultaTraking(nId)} ></button>
                  };     

                  getNombreDepartamento(newDocumento);

              }

            }).catch(({response}) => {
      
      })
          })();
    }
  },[]);


  function getNombreDepartamento(newContact){

    axios.get('http://localhost:3977/api/v1/departamento/obtener/'+newContact.departamento)
            .then(({data}) => {
              
              newContact.departamento = data.user.nombre_dep;

                  setDatos((pre) => {
                    return [...pre, newContact];
                  });

            }).catch(({response}) => {
      
      })
    
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
      title: 'Caso',
      dataIndex: 'nombreCaso',
      key: 'caso',
      width: '40%',
    },
    {
      title: 'Departamento',
      dataIndex: 'departamento',
      key: 'departamento',
      width: '25%',
    },
    {
      title: 'Numero Caso',
      dataIndex: 'numeroCaso',
      key: 'numero caso',
      width: '20%',
    },
    {
      title: 'Consulta Tracking',
      dataIndex: 'consultaTraking',
      key: 'consulta tracking',
    },
  ];
  return <Table columns={columns} dataSource={datos} />;
};

export default App;