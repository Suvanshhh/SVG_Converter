import React, { useState } from 'react';
import UploadForm from './components/UploadForm';

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
    <div className="app">
      <header>
        <h1>Image to SVG Converter</h1>
        <p>Using StarVector Machine Learning Model</p>
      </header>
      
      <main>
        <UploadForm onSVG={handleSVG} />
        
        {svgError && <div className="error">{svgError}</div>}
        
        {svg ? (
          <div className="result-container">
            <div className="svg-preview" dangerouslySetInnerHTML={{ __html: svg }} />
            <a
              href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
              download="converted.svg"
              className="download-btn"
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
      
      <style jsx>{`
        .app {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .result-container {
          margin-top: 2rem;
          border: 1px solid #eee;
          padding: 1rem;
          border-radius: 4px;
        }
        .svg-preview {
          max-width: 100%;
          overflow: auto;
          margin-bottom: 1rem;
          background: #f8f8f8;
          padding: 1rem;
        }
        .download-btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 4px;
        }
        .placeholder {
          text-align: center;
          color: #7f8c8d;
          margin: 2rem 0;
        }
        .error {
          color: #e74c3c;
          padding: 1rem;
          background: #fadbd8;
          border-radius: 4px;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}

export default App;
