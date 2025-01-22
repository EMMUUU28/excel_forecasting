import React, { useState } from "react";
import axios from "axios";
import { Upload, FileDown, CheckCircle, AlertCircle } from "lucide-react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      transition: "transform 0.3s ease",
    },
    header: {
      color: "#1e293b",
      fontSize: "1.875rem",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "2rem",
      letterSpacing: "-0.025em"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    },
    dropzone: {
      padding: "2rem",
      border: "2px dashed #e2e8f0",
      borderRadius: "12px",
      backgroundColor: "#f8fafc",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    },
    dropzoneActive: {
      borderColor: "#3b82f6",
      backgroundColor: "#eff6ff",
      transform: "scale(1.02)"
    },
    dropzoneText: {
      color: "#64748b",
      fontSize: "0.925rem",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
    input: {
      width: "100%",
      padding: "0.875rem 1rem",
      borderRadius: "8px",
      border: "1.5px solid #e2e8f0",
      fontSize: "0.925rem",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundColor: "#f8fafc",
    },
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
    },
    button: {
      padding: "1rem",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      position: "relative",
      overflow: "hidden"
    },
    buttonHover: {
      backgroundColor: "#2563eb",
      transform: "translateY(-1px)"
    },
    successContainer: {
      marginTop: "2rem",
      padding: "1.5rem",
      backgroundColor: "#f0fdf4",
      borderRadius: "8px",
      border: "1px solid #bbf7d0",
      animation: "slideIn 0.5s ease"
    },
    downloadButton: {
      backgroundColor: "#059669",
      color: "white",
      padding: "0.875rem 1.25rem",
      borderRadius: "8px",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.925rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      marginTop: "1rem"
    },
    downloadButtonHover: {
      backgroundColor: "#047857",
      transform: "translateY(-1px)"
    },
    error: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fee2e2",
      borderRadius: "8px",
      padding: "1rem",
      color: "#dc2626",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      animation: "shake 0.5s ease"
    },
    uploadProgress: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "4px",
      backgroundColor: "#93c5fd",
      transition: "width 0.3s ease"
    },
    fileName: {
      marginTop: "1rem",
      padding: "0.5rem",
      backgroundColor: "#f1f5f9",
      borderRadius: "6px",
      fontSize: "0.875rem",
      color: "#475569"
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!outputFileName) {
        setOutputFileName(selectedFile.name.split('.')[0]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (!outputFileName) {
        setOutputFileName(droppedFile.name.split('.')[0]);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !outputFileName) {
      setErrorMessage("Please select a file and enter an output filename");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_filename", outputFileName);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/upload/`,
        formData
      );
      const filePathFromServer = response.data.file_path;
      setDownloadUrl(`${process.env.REACT_APP_API_BASE_URL}${filePathFromServer}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upload Pricing Sheet</h1>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : {})
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".xlsx,.xls,.csv"
          />
          <Upload size={32} color="#64748b" />
          <div style={styles.dropzoneText}>
            {file ? (
              <div style={styles.fileName}>{file.name}</div>
            ) : (
              "Drag & drop your file here or click to browse"
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter output file name"
          value={outputFileName}
          onChange={(e) => setOutputFileName(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={isUploading}
          onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'none' })}
        >
          {isUploading ? (
            <>Processing...</>
          ) : (
            <>
              <Upload size={18} /> Upload and Process
            </>
          )}
          {isUploading && (
            <div 
              style={{
                ...styles.uploadProgress,
                width: '100%'
              }}
            />
          )}
        </button>
      </form>

      {downloadUrl && (
        <div style={styles.successContainer}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669' }}>
            <CheckCircle size={20} />
            <span>File processed successfully!</span>
          </div>
          <a
            href={downloadUrl}
            download={`${outputFileName}.xlsx`}
            style={styles.downloadButton}
            onMouseOver={(e) => Object.assign(e.target.style, styles.downloadButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'none' })}
          >
            <FileDown size={18} />
            Download File
          </a>
        </div>
      )}

      {errorMessage && (
        <div style={styles.error}>
          <AlertCircle size={18} />
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default FileUpload;