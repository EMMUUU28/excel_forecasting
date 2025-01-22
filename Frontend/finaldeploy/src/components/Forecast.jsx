import React, { useState, useEffect } from "react";
import axios from "axios";
import './Forecast.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [percentage, setPercentage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [data, setData] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [loading, setLoading] = useState(false); // Manage loading state
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const categoryTuples = [
    ['Bridge Gem', '742'],
    ['Gold', '746'],
    ['Gold', '262&270'],
    ['Womens Silver', '260&404'],
    ['Precious', '264&268'],
    ['Fine Pearl', '265&271'],
    ['Semi', '272&733'],
    ['Diamond', '734&737&748'],
    ['Bridal', '739&267&263'],
    ["Men's", '768&771']
];

const [checkedItems, setCheckedItems] = useState(
  new Array(categoryTuples.length).fill(false)
);
const [isSelectAll, setIsSelectAll] = useState(false);


  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    // Update "Select All" state if all items are selected
    setIsSelectAll(updatedCheckedItems.every((item) => item));
};

const handleSelectAllChange = () => {
    const newState = !isSelectAll;
    setIsSelectAll(newState);
    setCheckedItems(new Array(categoryTuples.length).fill(newState));
};
useEffect(() => {
  if(isFileUploaded){

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sheet/`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Data:", data); // Log data to the console
      setData(data);
    })
    .catch((error) => console.error("Error fetching data from API:", error));
  }
}, [isFileUploaded]);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setOutputFileName(event.target.value);
  };

  const handleMonthFromChange = (event) => {
    setMonthFrom(event.target.value);
  };

  const handleMonthToChange = (event) => {
    setMonthTo(event.target.value);
  };

  const handlePercentageChange = (event) => {
    const value=event.target.value;
    if(value<0 || value>100)
        alert("Percantage must be between 0 and 100")
      else
    setPercentage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !outputFileName || !monthFrom || !monthTo || !percentage || isNaN(percentage)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const selectedCategories = categoryTuples
    .filter((_, index) => checkedItems[index])
    .map(([name, value]) => ({ name, value }));

  if (selectedCategories.length === 0) {
    alert("Please select at least one category.");
    return;
  }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_filename", outputFileName);
    formData.append("month_from", monthFrom);
    formData.append("month_to", monthTo);
    formData.append("percentage", percentage);
    formData.append("categories", JSON.stringify(selectedCategories));
    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/forecast/upload/`,
        formData
      );
      console.log("FormData Contents:");
for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}
      
      const filePathFromServer = response.data.file_path;
      setDownloadUrl(`${process.env.REACT_APP_API_BASE_URL}${filePathFromServer}`);
      setIsFileUploaded(true);
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
      console.error("Error uploading the file:", error);
      setErrorMessage(
        error.response ? error.response.data.error : "An error occurred"
      );
      setIsFileUploaded(false);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Function to remove underscores and capitalize words
  const formatAttributeName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="container">
      <h1 className="header">Upload Forecasting Sheet</h1>
      
      <form className="upload-form" onSubmit={handleSubmit}>
      <label>Select sheet to get forecasting information</label>

        <div className="form-group">
          <input type="file" className="input-file" onChange={handleFileChange} />
        </div>
        <label htmlFor="">Enter output filename</label>

        <div className="form-group">
          <input
            type="text"
            className="input-text"
            placeholder="Enter output file name"
            value={outputFileName}
            onChange={handleFileNameChange}
          />
        </div>
        <label htmlFor="">Select STD Period</label>

   {/* categories names */}
   <div>
    <h3>Categories</h3>
    <div>
        <label>
            <input
                type="checkbox"
                checked={isSelectAll}
                onChange={handleSelectAllChange}
            />
            Select All
        </label>
    </div>
    {categoryTuples.map(([name, value], index) => (
        <div key={value}>
            <label>
                <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                />
                {`${name}, ${value}`}
            </label>
        </div>
    ))}
</div>

        <div className="form-group">
          <label htmlFor="monthFrom">Month From:</label>
          <select
            id="monthFrom"
            className="input-month"
            value={monthFrom}
            onChange={handleMonthFromChange}
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="monthTo"> Month To:</label>
          <select
            id="monthTo"
            className="input-month"
            value={monthTo}
            onChange={handleMonthToChange}
          >
            <option value="">Select Month</option>
            {months
            .slice(months.indexOf(monthFrom)+1)
            .map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="percentage">Enter current month percentage</label>
          <input
            type="percentage"
            id="percentage"
            className="input-percentage"
            placeholder="Enter percentage"
            value={percentage}
            onChange={handlePercentageChange}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : "Upload and Process"}
        </button>
      </form>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Processing your request, please wait...</p>
        </div>
      )}

      {downloadUrl && (
        <a href={downloadUrl} className="download-link" download={outputFileName + ".zip"}>
          Download Processed File
        </a>
      )}

{errorMessage && <p className="error-message">{errorMessage}</p>}
{console.log(data)}

{/*  data && Displaying data from demo.json only if file is uploaded successfully */}
{  isFileUploaded && data && (
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      {/* Display raw JSON */}
{/* Display data dynamically */}

</div>
);
}

export default FileUpload;

