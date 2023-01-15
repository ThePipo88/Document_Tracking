import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import {Highlighter} from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const editarTramite = (id,name) => {
    const myData = {
      name: 'Tramites',
      id_tra: id
    }
    navigate("/admin/tramites/editartramites", {state:{myData}});
    cookies.set('ideTramite', id, {path: '/'});

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
      axios.get('http://localhost:3977/api/v1/tramites/getByIdOrg/'+cookies.get('organizacion_id'))
      .then(({data}) => {

        for(let i = 0; i < data.user.length; i++){   

            const newTramite = {
            key: i,
            id: data.user[i]._id,
            tramite: data.user[i].tipo_tra,
            nombreDepartamento: "",
            departamento: data.user[i].departamento_id,
            descripcion: data.user[i].descripcion_tra,
            editarTramite: <button className='button-37' onClick={() => editarTramite(newTramite.id,newTramite.departamento)}></button>,
            };

            nombreDepartamento(newTramite);
        }

  
      }).catch(({response}) => {
      })
    })();
}

async function nombreDepartamento(newTramite){

  (async () => {

    axios.get('http://localhost:3977/api/v1/departamento/obtener/'+newTramite.departamento)
    .then(({data}) => {

      newTramite.nombreDepartamento = data.user.nombre_dep;

      setDataSource((pre) => {
        return [...pre, newTramite];
      });

    }).catch(({response}) => {
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
      title: 'Tramite',
      dataIndex: 'tramite',
      key: 'tramite',
      width: '30%',
      ...getColumnSearchProps('tramite')
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
      width: '40%',
    },
    {
      title: 'Departamento',
      dataIndex: 'nombreDepartamento',
      key: 'nombreDepartamento',
      width: '20%',
    },
    {
      title: 'Editar Tramite',
      dataIndex: 'editarTramite',
      key: 'editarTramite',
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};

export default App;