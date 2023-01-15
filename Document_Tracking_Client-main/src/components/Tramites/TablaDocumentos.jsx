import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import {Highlighter} from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";


const App = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const navigate = useNavigate();
    const cookies = new Cookies();
  
    const editarDocumento = (id, index) => {

      const myData = {
        name: 'Tramites',
        id_doc: id,
        indice: index
      }
      navigate("/admin/tramites/editartramites/editardocumento", {state:{myData}});
    }
  
    const [dataSource, setDataSource] = useState([

    ]);
  
    useEffect(() => {
      return () => {
        actualizarTablaT();
      }
    },[]);
  
    async function actualizarTablaT(){
      (async () => {
        axios.get('http://localhost:3977/api/v1/tramites/obtener/'+cookies.get('ideTramite'))
        .then(({data}) => {
          for(let i = 0; i < data.user.documentos.length; i++){   
              const newStudent = {
              key: i,
              id: data.user.documentos[i]._id,
              documento: data.user.documentos[i].nombre_documento,
              descripcion: data.user.documentos[i].descripcion_documento,
              estado:data.user.documentos[i].estado_documento,
              estadoDoc: getEstado(data.user.documentos[i].estado_documento),
              tipArch:data.user.documentos[i].tipo_documento,
              accion: <button className='button-37' onClick={() => editarDocumento(cookies.get('ideTramite'),i)}></button>,
              };
              setDataSource((pre) => {
                return [...pre, newStudent];
              });
          }
  
    
        }).catch(({response}) => {
  
  })
      })();
  
  }

  function getEstado(estado){
    if(estado){
      return "Activo";
    }else{
      return "Inactivo";
    }
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
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
        width: '30%',
        ...getColumnSearchProps('documento')
      },
      {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        key: 'descripcion',
        width: '40%',
        ...getColumnSearchProps('descripcion'),
      },
      {
        title: 'Estado',
        dataIndex: 'estadoDoc',
        key: 'estadoDoc',
        width: '10%',
        ...getColumnSearchProps('estado'),
      },
      {
        title: 'Tipo Archivo',
        dataIndex: 'tipArch',
        key: 'tipArch',
        width: '10%',
        ...getColumnSearchProps('tipArch'),
      },
      {
        title: 'Accion',
        dataIndex: 'accion',
        key: 'accion',
      },
    ];
    return <Table columns={columns} dataSource={dataSource} />;
  };
  
  export default App;