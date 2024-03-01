import { useState, useEffect } from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid'
import { Modal } from '@mui/material';

const columns = [
  { field: 'page', headerName: 'N° de pagina', width: 200 },
  {
    field: 'text_content',
    headerName: 'Contenido',
    width: 600,
    editable: false,
    sortable: false,
  },
  {
    field: "",
    headerName: "Ver",
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const { row } = params;
      const { image_base64 } = row;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleClose = () => setIsModalOpen(false);
      return(
        <>
        <button
          onClick={() => 
            setIsModalOpen(true)
          }
        >
          Ver
        </button>
        
        <Modal 
        open={isModalOpen}
        onClose={handleClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}

        
        >
          
            <img 
            src={`data:image/png;base64, ${image_base64}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            />
          
        </Modal>
        
        
        </>
      )
    }
  },
];



function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.100.8:8888/api/search-book-pages?search_text=${searchText}`);
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  };

  return (
    <>
      <h1>Busca dentro de Elocuent Javascript</h1>
      <div className="card">
        <input type="text" value={searchText} onChange={handleInputChange} />
      </div>
        <button onClick={handleSearch}>
          Buscar tema
        </button>
        {/* <DataGrid rows={data} columns={columns} disableColumnMenu={true}/> */}
        {Object.keys(data).length > 0 ? (
        <DataGrid rows={data} columns={columns} />
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </>
  )
}

export default App
