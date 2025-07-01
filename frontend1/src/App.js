import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import './App.css'; // Import your external CSS

function App() {
  const [svg, setSVG] = useState('');
  const [svgError, setSvgError] = useState('');

  const handleSVG = (svgCode) => {
    try {
      // Basic SVG validation
      if (typeof svgCode === 'string' && svgCode.startsWith('<svg')) {
        setSVG(svgCode);
        setSvgError('');
      } else {
        setSvgError('Invalid SVG generated');
        setSVG('');
      }
    } catch (e) {
      setSvgError('Error processing SVG');
      setSVG('');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Image to SVG Converter</h1>
        <p className="subtitle">Powered by StarVector AI Model</p>
      </header>
      
      <main>
        <UploadForm onSVG={handleSVG} />
        
        {svgError && <div className="error-message">{svgError}</div>}
        
        {svg ? (
          <div className="result-container">
            <div className="svg-preview" dangerouslySetInnerHTML={{ __html: svg }} />
            <a
              href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
              download="converted.svg"
              className="download-link"
            >
              Download SVG
            </a>
          </div>
        ) : (
          <div className="placeholder">
            <p>Upload an image to see SVG conversion</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
