import React, { useState, useEffect } from "react";
import axios from "axios";
import './Forecast.css'; // Import the external CSS file for styling

function FileUpload() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(""); // Store the download URL from the server
  const [data, setData] = useState(null); // State to store data from demo.json
  const [selectedSheet, setSelectedSheet] = useState(""); // Track the selected sheet
  const [loading, setLoading] = useState(false); // State to manage the loading spinner

// Fetch the demo.json file from the public directory
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sheet/")  // Replace the local file with your API URL
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data from API:", error));  // Handle any errors
  }, []);  // Empty dependency array ensures this runs only once when the component mounts
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

  const handleFileNameChange = (event) => {
    setOutputFileName(event.target.value); // Update output file name from input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    if (!outputFileName) {
      alert("Please enter a file name");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_filename", outputFileName);

    try {
      // First, upload the file and get the file path from the backend
      const response = await axios.post(
        "http://localhost:8000/forecast/upload/",
        formData
      );
      console.log("Forecast", response);

      // Extract the file path from the server response
      const filePathFromServer = response.data.file_path;
      setDownloadUrl(`http://localhost:8000${filePathFromServer}`); // Store the full file URL for download
    } catch (error) {
      console.error("Error uploading the file:", error);
      setErrorMessage(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };

  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
    // Show the loader spinner for 3 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds
    }, 500);
  };

  // Function to remove underscores and capitalize words
  const formatAttributeName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="container">
      <h1 className="header">Upload Forecasting Sheet</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="file"
            className="input-file"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="input-text"
            placeholder="Enter output file name"
            value={outputFileName}
            onChange={handleFileNameChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Upload and Process
        </button>
      </form>

      {downloadUrl && (
        <a href={downloadUrl} className="download-link" download={outputFileName + ".zip"}>
          Download Processed File
        </a>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display data from demo.json */}
      {data && (
        <div className="data-section">
          <h2>Select Sheet</h2>
          <select className="sheet-dropdown" value={selectedSheet} onChange={handleSheetChange}>
            <option value="">Select Sheet</option>
            {Object.keys(data).map((sheet) => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>

          {/* Show loading spinner while the sheet is being loaded */}
          {loading && (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          )}

          {/* Display the sheet data after 3 seconds */}
          {!loading && selectedSheet && (
            <div className="sheet-data">
              <h3>Attributes and Data for {selectedSheet}:</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(data[selectedSheet]).map((attribute) => (
                      <th key={attribute}>
                        {formatAttributeName(attribute)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.keys(data[selectedSheet]).map((attribute) => (
                      <td key={attribute}>
                        {data[selectedSheet][attribute].length > 0 ? (
                          data[selectedSheet][attribute].map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        ) : (
                          <p>No data available</p>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
