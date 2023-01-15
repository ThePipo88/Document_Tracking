import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import SubirArchivo from "./SubirArchivo";
import Swal from 'sweetalert2';
import axios from "axios";
import 'antd/dist/antd.min.css';

const App = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const {id_c} = props;

  const consultaTraking = () => {
    
  }

  function getEstado(estado){
    if(estado){
        return "Subido";
    }else{
        return "No subido";
    }
  }

  function cargarArchivo(url){
    var win = window.open(url, '_blank');
// Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

  useEffect(() => {
    return () => {
        (async () => {
            console.log(id_c);

            axios.get('http://localhost:3977/api/v1/documentos/finByNumCaso/'+id_c)
            .then(({data}) => {

                console.log(data);

                for(let i = 0; i < data.user.length; i++){  
                const newDocumento = {
                  key: i,
                  id: data.user[i]._id,
                  nombre: data.user[i].nombre_doc,
                  estado: getEstado(data.user[i].estado_doc),
                  tipo: data.user[i].tipo_documento,
                  accion: <div><SubirArchivo id={data.user[i]._id}/><button className='button-archivo' style={{marginLeft: "2%"}} onClick={() => cargarArchivo(data.user[i].url_doc)}>Abrir</button></div>,
                  };     

                  setDatos((pre) => {
                    return [...pre, newDocumento];
                  });
              }
               
              
            }).catch(({response}) => {
      
      })
          })();
    }
  },[]);

  const data = [
   
  ];

  const [datos, setDatos] = useState([

  ]);

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
      title: 'Nombre documento',
      dataIndex: 'nombre',
      key: 'nombre',
      width: '40%'
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: '15%',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: '18%',
    },
    {
      title: 'Accion',
      dataIndex: 'accion',
      key: 'accion',
    },
  ];
  return <Table columns={columns} dataSource={datos} />;
};

export default App;