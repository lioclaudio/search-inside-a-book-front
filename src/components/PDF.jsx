//TODO: link en que me base para el uso de esta libreria https://betterprogramming.pub/how-to-display-pdfs-but-prevent-them-from-downloading-in-react-2e77292ca9a5
import { useState } from "react";
//TODO: Importamos los componenetes necesarios de la libreria react-pdf
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

//TODO: Configuracion provista por la libreria 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();
const apiUrl = import.meta.env.VITE_API_URL;
export default function PDF() {
    //TODO: Estado para almacenar el número de páginas del PDF
    const [numPages, setNumPages] = useState(null);
    const url =`${apiUrl}/get-pdf`;

    return (
        <>
            <Document
                file={url}
                // TODO: Evitar que aparezca el menú contextual al hacer clic derecho
                onContextMenu={(e) => e.preventDefault()}
                className="pdf-container"
                 // TODO: Manejar el evento onLoadSuccess para obtener el número de páginas
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                 {/* TODO: Crear un array de páginas y renderizar cada Page componente */}
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map((page) => (
                        <Page pageNumber={page} scale={1.5}/>
                    ))}  
            </Document>
        </>
    );
}
