import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";

const App = () => {
  const [searchText, setSearchText] = useState('');

  const [searchedColumn, setSearchedColumn] = useState('');

  const [nombreDep, setNombreDep] = useState('');

  const searchInput = useRef(null);

  const cookies = new Cookies();

  const navigate = useNavigate();


  const editarDepartamento = (id, nombreCaso) => {
    const myData = {
      id_cons: id,
      nombre: nombreCaso
    }
    navigate("/admin/casos/gestionar", {state:{myData}});
  }

  const [dataSource, setDataSource] = useState([

  ]);

  useEffect(() => {
    return () => {
      actualizarTabla();
    }
  },[]);

  async function getNombreTramite(newCaso){

    await axios.get('http://localhost:3977/api/v1/tramites/obtener/'+newCaso.tramite)
      .then(({data}) => {
        newCaso.tramite = data.user.tipo_tra;
        setDataSource((pre) => {
          return [...pre, newCaso];
        });
      }).catch(({response}) => {
       })
  }

  async function getNombreDep(id,newCaso){

    await axios.get('http://localhost:3977/api/v1/departamento/obtener/'+id)
      .then(({data}) => {
        newCaso.departamento = data.user.nombre_dep;
        getNombreTramite(newCaso);
      }).catch(({response}) => {
       })
  }

  async function actualizarTabla(){
    (async () => {
      axios.get('http://localhost:3977/api/v1/casos/getByIdOrganizacion/'+cookies.get('organizacion_id'))
      .then(({data}) => {

        for(let i = 0; i < data.user.length; i++){  

          const newCaso = {
            key: i,
            id: data.user[i]._id,
            departamento: '',
            tramite: data.user[i].id_tramite,
            caso: data.user[i].nombre_caso,
            editar: <button className='button-37' onClick={() => editarDepartamento(data.user[i]._id, data.user[i].nombre_caso)}></button>,
            };

            getNombreDep(data.user[i].id_departamento, newCaso);
            
        }
      }).catch(({response}) => {

    Swal.fire({
      title: 'Organizacion o correo ingresado ya existentes',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
      }).then((result) => {
      
      })

})
    })();

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
      title: 'Departamento',
      dataIndex: 'departamento',
      key: 'departamento',
      width: '30%',
    },
    {
      title: 'Tramite',
      dataIndex: 'tramite',
      key: 'tramite',
      width: '30%',
      ...getColumnSearchProps('correo'),
    },
    {
      title: 'Caso',
      dataIndex: 'caso',
      key: 'caso',
      width: '30%',
      ...getColumnSearchProps('correo'),
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