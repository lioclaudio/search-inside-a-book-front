import PDFObject from "pdfobject";
import React, { useEffect } from "react";

const ObjectPdfViewer = (props) => {
  //TODO: Definir las propiedades por defecto y desestructurar las props
  const { width = "100%", height = "100%", data, containerID = "pdf-viewer" } = props;

  useEffect(() => {
    //TODO: Configurar opciones para la incrustación del PDF
    const options = {
      forcePDFJS: true,
    };
    //TODO: Usar la biblioteca PDFObject para incrustar el PDF en el contenedor
    PDFObject.embed(data, `#${containerID}`, options);
  }, [data, containerID]);

  return (
    //TODO: Renderizar el contenedor que se utilizará para mostrar el PDF
    <div id={containerID} style={{ width, height }} />
  );
};

export default ObjectPdfViewer;
