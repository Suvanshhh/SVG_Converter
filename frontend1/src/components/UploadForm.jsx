import React, { useState } from 'react';

const UploadForm = ({ onSVG }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file (PNG/JPEG)');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `mutation($image: Upload!) { 
        uploadImage(image: $image) { 
          svgCode 
        } 
      }`,
      variables: { image: null }
    }));
    formData.append('map', JSON.stringify({ '0': ['variables.image'] }));
    formData.append('0', file);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.errors) {
        setError(result.errors[0].message);
      } else if (result.data?.uploadImage?.svgCode) {
        onSVG(result.data.uploadImage.svgCode);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Converting...' : 'Convert to SVG'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      
      <style jsx>{`
        .upload-form {
          margin: 2rem 0;
        }
        input, button {
          padding: 0.5rem;
          margin: 0.5rem 0;
          display: block;
        }
        .error {
          color: #e74c3c;
          margin-top: 0.5rem;
        }
        button.loading {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default UploadForm;
