import React, { useState, useEffect } from "react";
import axios from "axios";
import './Forecast.css';
import { Upload } from "lucide-react";

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

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "2rem auto",
      padding: "2.5rem",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    },
    header: {
      color: "#1e293b",
      textAlign: "center",
      fontSize: "2.25rem",
      marginBottom: "3rem",
      fontWeight: "700",
      letterSpacing: "-0.025em"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    },
    label: {
      fontSize: "0.925rem",
      fontWeight: "600",
      color: "#334155",
      letterSpacing: "-0.01em"
    },
    input: {
      padding: "0.875rem 1rem",
      borderRadius: "8px",
      border: "1.5px solid #e2e8f0",
      fontSize: "0.925rem",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundColor: "#f8fafc",
      "&:focus": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
      },
      "&:hover": {
        borderColor: "#94a3b8"
      }
    },
    fileInput: {
      padding: "1rem",
      border: "2px dashed #cbd5e1",
      borderRadius: "8px",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#3b82f6",
        backgroundColor: "#f1f5f9"
      }
    },
    categoriesContainer: {
      backgroundColor: "#f8fafc",
      padding: "1.5rem",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      marginTop: "1.5rem"
    },
    categoryHeader: {
      fontSize: "1.125rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "1.25rem"
    },
    checkboxGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1rem"
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "0.925rem",
      color: "#475569",
      padding: "0.5rem",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#f1f5f9"
      }
    },
    checkbox: {
      width: "1.125rem",
      height: "1.125rem",
      accentColor: "#3b82f6"
    },
    button: {
      padding: "1rem 1.5rem",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      "&:hover": {
        backgroundColor: "#2563eb",
        transform: "translateY(-1px)"
      },
      "&:disabled": {
        backgroundColor: "#94a3b8",
        cursor: "not-allowed",
        transform: "none"
      }
    },
    downloadButton: {
      backgroundColor: "#059669",
      marginTop: "1.5rem",
      textDecoration: "none",
      "&:hover": {
        backgroundColor: "#047857"
      }
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      marginTop: "1.5rem",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      overflow: "hidden"
    },
    th: {
      backgroundColor: "#f8fafc",
      padding: "1rem 1.25rem",
      textAlign: "left",
      fontSize: "0.925rem",
      fontWeight: "600",
      color: "#1e293b",
      borderBottom: "1px solid #e2e8f0"
    },
    td: {
      padding: "1rem 1.25rem",
      fontSize: "0.925rem",
      color: "#475569",
      borderBottom: "1px solid #e2e8f0"
    },
    error: {
      color: "#dc2626",
      marginTop: "1rem",
      textAlign: "center",
      padding: "1rem",
      backgroundColor: "#fef2f2",
      borderRadius: "8px",
      border: "1px solid #fee2e2"
    },
    loader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
      marginTop: "2.5rem"
    },
    spinner: {
      width: "2.5rem",
      height: "2.5rem",
      border: "3px solid #e2e8f0",
      borderTop: "3px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Forecast Upload Dashboard</h1>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Forecasting Sheet</label>
          <input 
            type="file" 
            style={{...styles.input, ...styles.fileInput}}
            onChange={handleFileChange} 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Output Filename</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter output file name"
            value={outputFileName}
            onChange={handleFileNameChange}
          />
        </div>

        <div style={styles.categoriesContainer}>
          <h3 style={styles.categoryHeader}>Product Categories</h3>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={isSelectAll}
                onChange={handleSelectAllChange}
              />
              Select All
            </label>
            {categoryTuples.map(([name, value], index) => (
              <label key={value} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                {`${name} (${value})`}
              </label>
            ))}
          </div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem"}}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Month From</label>
            <select style={styles.input} value={monthFrom} onChange={handleMonthFromChange}>
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Month To</label>
            <select style={styles.input} value={monthTo} onChange={handleMonthToChange}>
              <option value="">Select Month</option>
              {months
                .slice(months.indexOf(monthFrom) + 1)
                .map((month, index) => (
                  <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Current Month Percentage</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Enter percentage (0-100)"
            value={percentage}
            onChange={handlePercentageChange}
          />
        </div>

        <button style={styles.button} type="submit" disabled={loading}>
          <Upload size={18} />
          {loading ? "Processing..." : "Upload and Process"}
        </button>
      </form>

      {loading && (
        <div style={styles.loader}>
          <div style={styles.spinner} />
          <p style={{ color: "#475569", fontSize: "1rem" }}>Processing your request...</p>
        </div>
      )}

      {downloadUrl && (
        <a 
          href={downloadUrl}
          style={{...styles.button, ...styles.downloadButton}}
          download={outputFileName + ".zip"}
        >
          Download Processed File
        </a>
      )}

      {errorMessage && (
        <p style={styles.error}>{errorMessage}</p>
      )}

      {isFileUploaded && data && (
        <div style={{ marginTop: "2.5rem" }}>
          <h2 style={styles.categoryHeader}>Sheet Selection</h2>
          <select 
            style={styles.input}
            value={selectedSheet} 
            onChange={handleSheetChange}
          >
            <option value="">Select a Sheet</option>
            {Object.keys(data).map((sheet) => (
              <option key={sheet} value={sheet}>{sheet}</option>
            ))}
          </select>

          {!loading && selectedSheet && (
            <div style={{ marginTop: "1.5rem" }}>
              <h3 style={styles.categoryHeader}>{selectedSheet} Sheet Data</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {Object.keys(data[selectedSheet]).map((attribute) => (
                        <th key={attribute} style={styles.th}>
                          {formatAttributeName(attribute)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.keys(data[selectedSheet]).map((attribute) => (
                        <td key={attribute} style={styles.td}>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
