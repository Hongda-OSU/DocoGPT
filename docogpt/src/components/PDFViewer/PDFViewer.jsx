import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./pdf-viewer.css";

const PDFViewer = ({ fileContent, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-container">
      <div className="pdf-viewer">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <Document file={fileContent} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1.3}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
