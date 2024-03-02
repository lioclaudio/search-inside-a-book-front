import { useState, useEffect } from "react";
import "./SearchBook.css";
//TODO: Importamos la grilla DataGrid y el componente modal para mostrar la imagen dentro
import { DataGrid } from "@mui/x-data-grid";
import { Modal } from "@mui/material";
import ObjectPdfViewer from "./ObjectPdfViewer";
import { Link } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const columns = [
    { field: "page", headerName: "Nº Pagina", width: 80 },
    {
        field: "target_paragraph",
        headerName: "Parrafo",
        width: 1000,
        editable: false,
        sortable: false,
    },
    {
        field: "",
        headerName: "",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const { row } = params;
            const { image_base64 } = row;
            const [isModalOpen, setIsModalOpen] = useState(false);
            const handleClose = () => setIsModalOpen(false);
            //TODO: Boton para abrir la imagen en un modal, utilizando el componente de MUI.
            return (
                <>
                    <button onClick={() => setIsModalOpen(true)}>Ver</button>
                    <Modal
                        open={isModalOpen}
                        onClose={handleClose}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <img
                            src={`data:image/png;base64, ${image_base64}`}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "auto",
                                height: "auto",
                            }}
                        />
                    </Modal>
                </>
            );
        },
    },
];

function SearchBook() {
    //TODO: Estado para guardar las respuestas de la API
    const [data, setData] = useState([]);
    const [dataBook, setDataBook] = useState([]);
    //TODO: Estado para manejar el cambio del input.
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    //TODO: Funcion donde manejamos los valores introducidos en el input guardandolos en un estado.
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    //TODO: Funcion donde hacemos el llamado a la api en base al texto guardado en el estado anterior, para luego guardar la informacion en el estado data.
    const handleSearch = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/search-book-pages?search_text=${searchText}`
            );
            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error("Error al obtener datos de la API", error);
        }
    };

    const handleBook = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/books/1`
            );
            const result = await response.json();

            setDataBook(result);
        } catch (error) {
            console.error("Error al obtener datos de la API", error);
        }
    };

    // const handleSearchBook = () => {
    //     setOpen(true)
    // };

    useEffect(() => {
        handleBook();
    }, []);

    return (
        <>
            <h1>Buscar dentro de Elocuent Javascript</h1>
            <div className="card">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="buttons" style={{ marginBottom: 10 }}>
                {/* TODO: Boton para la busqueda por tema */}
                <button
                    type="button"
                    onClick={handleSearch}
                    style={{ marginRight: 10 }}
                >
                    Buscar texto
                </button>
                {/* TODO: Boton para ver el libro completo en otra pestaña*/}
                <Link to="/pdf" target="_blank">
                    <button>Ver Libro</button>
                </Link>
                {/* TODO: Boton para para ver el libro completo */}
                {/* <button onClick={handleSearchBook}>Ver Libro</button> */}
            </div>
            {/* TODO: Mostramos la grilla si es que hay informacion, sino mostramos un mensaje */}
            {Object.keys(data).length > 0 ? (
                <DataGrid rows={data} columns={columns} />
            ) : (
                <p>No hay datos para mostrar</p>
            )}
            {/* <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <ObjectPdfViewer
                    data={"http://localhost/eloquent.pdf"}
                    width="75%"
                    height="100%"
                    containerID="pdf-viewer"
                />
            </Modal> */}
        </>
    );
}

export default SearchBook;
