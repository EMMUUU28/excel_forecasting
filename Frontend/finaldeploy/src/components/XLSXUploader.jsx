import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(""); // Store the download URL from the server

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
        `${process.env.REACT_APP_API_BASE_URL}/api/upload/`,
        formData
      );
      console.log("File uploaded:", response);

      // Extract the file path from the server response
      const filePathFromServer = response.data.file_path;
      setDownloadUrl(`${process.env.REACT_APP_API_BASE_URL}${filePathFromServer}`); // Store the full file URL for download
    } catch (error) {
      console.error("Error uploading the file:", error);
      setErrorMessage(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };

  
  return (
    <div>
      <h1>Upload and Process Pricing Sheet</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter output file name"
          value={outputFileName}
          onChange={handleFileNameChange}
        />
        <button type="submit">Upload and Process</button>
      </form>

      {downloadUrl && (
        <div>
          <p>
            File uploaded successfully. You can download the processed file:
          </p>
          <a href={downloadUrl} download={outputFileName + ".xlsx"}>
            Direct Download
          </a>
          {/* <button onClick={handleDownload}>Download via API</button> */}
        </div>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default FileUpload;
