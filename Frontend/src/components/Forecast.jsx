// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Upload } from "lucide-react";

// function Forecast() {
//   const [file, setFile] = useState(null);
//   const [outputFileName, setOutputFileName] = useState("");
//   const [monthFrom, setMonthFrom] = useState("");
//   const [monthTo, setMonthTo] = useState("");
//   const [percentage, setPercentage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [data, setData] = useState(null);
//   const [selectedSheet, setSelectedSheet] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
  
//   const categoryTuples = [
//     ['Bridge Gem', '742'],
//     ['Gold', '746'],
//     ['Gold', '262&270'],
//     ['Womens Silver', '260&404'],
//     ['Precious', '264&268'],
//     ['Fine Pearl', '265&271'],
//     ['Semi', '272&733'],
//     ['Diamond', '734&737&748'],
//     ['Bridal', '739&267&263'],
//     ["Men's", '768&771']
//   ];

//   const [checkedItems, setCheckedItems] = useState(
//     new Array(categoryTuples.length).fill(false)
//   );
//   const [isSelectAll, setIsSelectAll] = useState(false);

//   const handleCheckboxChange = (index) => {
//     const updatedCheckedItems = [...checkedItems];
//     updatedCheckedItems[index] = !updatedCheckedItems[index];
//     setCheckedItems(updatedCheckedItems);
//     setIsSelectAll(updatedCheckedItems.every((item) => item));
//   };

//   const handleSelectAllChange = () => {
//     const newState = !isSelectAll;
//     setIsSelectAll(newState);
//     setCheckedItems(new Array(categoryTuples.length).fill(newState));
//   };
  
//   useEffect(() => {
//     if(isFileUploaded){
//       fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sheet/`)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Fetched Data:", data);
//           setData(data);
//         })
//         .catch((error) => console.error("Error fetching data from API:", error));
//     }
//   }, [isFileUploaded]);
  
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileNameChange = (event) => {
//     setOutputFileName(event.target.value);
//   };

//   const handleMonthFromChange = (event) => {
//     setMonthFrom(event.target.value);
//   };

//   const handleMonthToChange = (event) => {
//     setMonthTo(event.target.value);
//   };

//   const handlePercentageChange = (event) => {
//     const value = event.target.value;
//     if(value < 0 || value > 100)
//       alert("Percentage must be between 0 and 100");
//     else
//       setPercentage(value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!file || !outputFileName || !monthFrom || !monthTo || !percentage || isNaN(percentage)) {
//       alert("Please fill out all fields correctly.");
//       return;
//     }

//     const selectedCategories = categoryTuples
//       .filter((_, index) => checkedItems[index])
//       .map(([name, value]) => ({ name, value }));

//     if (selectedCategories.length === 0) {
//       alert("Please select at least one category.");
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("output_filename", outputFileName);
//     formData.append("month_from", monthFrom);
//     formData.append("month_to", monthTo);
//     formData.append("percentage", percentage);
//     formData.append("categories", JSON.stringify(selectedCategories));
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/forecast/upload/`,
//         formData
//       );
      
//       console.log("FormData Contents:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//       }
      
//       const filePathFromServer = response.data.file_path;
//       setDownloadUrl(`${import.meta.env.VITE_API_BASE_URL}${filePathFromServer}`);
//       setIsFileUploaded(true);
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Error uploading the file:", error);
//       setErrorMessage(
//         error.response ? error.response.data.error : "An error occurred"
//       );
//       setIsFileUploaded(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSheetChange = (event) => {
//     setSelectedSheet(event.target.value);
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   };

//   // Function to remove underscores and capitalize words
//   const formatAttributeName = (name) => {
//     return name.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const months = [
//     "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December", "January",
//   ];

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-10 bg-white rounded-2xl shadow-lg font-sans">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Forecast Upload Dashboard</h1>
      
//       <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-3">
//           <label className="text-sm font-semibold text-gray-700">Upload Forecasting Sheet</label>
//           <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:border-blue-500 hover:bg-gray-100 transition-all">
//             <input 
//               type="file" 
//               className="w-full"
//               onChange={handleFileChange} 
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <label className="text-sm font-semibold text-gray-700">Output Filename</label>
//           <input
//             type="text"
//             className="p-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//             placeholder="Enter output file name"
//             value={outputFileName}
//             onChange={handleFileNameChange}
//           />
//         </div>

//         <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//           <h3 className="text-lg font-bold text-gray-800 mb-5">Product Categories</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             <label className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 accent-blue-500"
//                 checked={isSelectAll}
//                 onChange={handleSelectAllChange}
//               />
//               <span className="text-sm text-gray-600">Select All</span>
//             </label>
//             {categoryTuples.map(([name, value], index) => (
//               <label key={value} className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 accent-blue-500"
//                   checked={checkedItems[index]}
//                   onChange={() => handleCheckboxChange(index)}
//                 />
//                 <span className="text-sm text-gray-600">{`${name} (${value})`}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="flex flex-col gap-3">
//             <label className="text-sm font-semibold text-gray-700">Month From</label>
//             <select 
//               className="p-3 rounded-lg border border-gray-200 bg-gray-50"
//               value={monthFrom} 
//               onChange={handleMonthFromChange}
//             >
//               <option value="">Select Month</option>
//               {months.map((month, index) => (
//                 <option key={index} value={month}>{month}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col gap-3">
//             <label className="text-sm font-semibold text-gray-700">Month To</label>
//             <select 
//               className="p-3 rounded-lg border border-gray-200 bg-gray-50"
//               value={monthTo} 
//               onChange={handleMonthToChange}
//               disabled={!monthFrom}
//             >
//               <option value="">Select Month</option>
//               {monthFrom && 
//                 months
//                   .slice(months.indexOf(monthFrom) + 1)
//                   .map((month, index) => (
//                     <option key={index} value={month}>{month}</option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <label className="text-sm font-semibold text-gray-700">Current Month Percentage</label>
//           <input
//             type="number"
//             className="p-3 rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//             placeholder="Enter percentage (0-100)"
//             value={percentage}
//             onChange={handlePercentageChange}
//           />
//         </div>

//         <button 
//           className="p-4 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
//           type="submit" 
//           disabled={loading}
//         >
//           <Upload size={18} />
//           {loading ? "Processing..." : "Upload and Process"}
//         </button>
//       </form>

//       {loading && (
//         <div className="flex flex-col items-center gap-6 mt-10">
//           <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
//           <p className="text-gray-600">Processing your request...</p>
//         </div>
//       )}

//       {downloadUrl && (
//         <a 
//           href={downloadUrl}
//           className="block mt-6 text-center p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
//           download={outputFileName + ".zip"}
//         >
//           Download Processed File
//         </a>
//       )}

//       {errorMessage && (
//         <p className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
//           {errorMessage}
//         </p>
//       )}

//       {isFileUploaded && data && (
//         <div className="mt-10">
//           <h2 className="text-xl font-bold text-gray-800 mb-5">Sheet Selection</h2>
//           <select 
//             className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 mb-8"
//             value={selectedSheet} 
//             onChange={handleSheetChange}
//           >
//             <option value="">Select a Sheet</option>
//             {Object.keys(data).map((sheet) => (
//               <option key={sheet} value={sheet}>{sheet}</option>
//             ))}
//           </select>

//           {!loading && selectedSheet && (
//             <div className="mt-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">{selectedSheet} Sheet Data</h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       {Object.keys(data[selectedSheet]).map((attribute) => (
//                         <th 
//                           key={attribute} 
//                           className="p-4 text-left text-sm font-semibold text-gray-800 border-b border-gray-200"
//                         >
//                           {formatAttributeName(attribute)}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Array.from({ 
//                       length: Math.max(...Object.values(data[selectedSheet]).map(col => col.length)) 
//                     }).map((_, rowIndex) => (
//                       <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
//                         {Object.keys(data[selectedSheet]).map((attribute) => (
//                           <td 
//                             key={attribute} 
//                             className="p-4 text-sm text-gray-600 border-b border-gray-200"
//                           >
//                             {data[selectedSheet][attribute][rowIndex] || 
//                               <span className="text-gray-400">No data available</span>
//                             }
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Forecast;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, FileDown, Calendar, Percent, CheckCircle, AlertCircle, TrendingUp, ChevronDown, Filter } from "lucide-react";

function Forecast() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [monthFrom, setMonthFrom] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [percentage, setPercentage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [data, setData] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  
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
    setIsSelectAll(updatedCheckedItems.every((item) => item));
  };

  const handleSelectAllChange = () => {
    const newState = !isSelectAll;
    setIsSelectAll(newState);
    setCheckedItems(new Array(categoryTuples.length).fill(newState));
  };
  
  useEffect(() => {
    if(isFileUploaded){
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sheet/`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data:", data);
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
    const value = event.target.value;
    if(value < 0 || value > 100)
      alert("Percentage must be between 0 and 100");
    else
      setPercentage(value);
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
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/forecast/upload/`,
        formData
      );
      
      console.log("FormData Contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log("Response Data from Server:", response.data);
      
      const filePathFromServer = response.data.file_url;
      
      setDownloadUrl(filePathFromServer);
      setIsFileUploaded(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error uploading the file:", error);
      setErrorMessage(
        error.response ? error.response.data.error : "An error occurred"
      );
      setIsFileUploaded(false);
    } finally {
      setLoading(false);
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
     "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December", "January","February"
  ];

  const SelectedCategoriesCount = checkedItems.filter(item => item).length;

  return (
    <div className="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-10 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <TrendingUp className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Forecast Upload Dashboard</h1>
            <p className="text-indigo-100 mt-1 max-w-xl">Generate accurate sales forecasts by uploading your data and selecting parameters</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-10">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Upload and filename section */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Upload Forecasting Sheet</label>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <input 
                  type="file" 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                  onChange={handleFileChange} 
                />
              </div>
              {file && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <CheckCircle size={14} className="text-green-500 mr-1" /> 
                  <span>{file.name} selected</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Output Filename</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="Enter output file name"
                  value={outputFileName}
                  onChange={handleFileNameChange}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FileDown size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Categories section */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div 
              className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => setShowCategories(!showCategories)}
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-indigo-600" />
                <h3 className="text-base font-semibold text-gray-800">Product Categories</h3>
                <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {SelectedCategoriesCount} selected
                </div>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-gray-500 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {showCategories && (
              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <label className="inline-flex items-center gap-2 py-1.5 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-indigo-600 rounded"
                      checked={isSelectAll}
                      onChange={handleSelectAllChange}
                    />
                    <span className="text-sm font-medium text-gray-700">Select All Categories</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categoryTuples.map(([name, value], index) => (
                    <label 
                      key={value} 
                      className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border transition-colors ${
                        checkedItems[index] 
                          ? 'bg-indigo-50 border-indigo-200' 
                          : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-indigo-600 rounded"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className={`text-sm ${checkedItems[index] ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                        {name}
                        <span className="ml-1 text-xs text-gray-500">({value})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Month and percentage section */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-indigo-500" />
                Month From
              </label>
              <select 
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                value={monthFrom} 
                onChange={handleMonthFromChange}
              >
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-indigo-500" />
                Month To
              </label>
              <select 
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                value={monthTo} 
                onChange={handleMonthToChange}
                disabled={!monthFrom}
              >
                <option value="">Select Month</option>
                {monthFrom && 
                  months
                    .slice(months.indexOf(monthFrom) + 1)
                    .map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <Percent size={16} className="text-indigo-500" />
                Current Month Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all pr-10"
                  placeholder="0-100"
                  value={percentage}
                  onChange={handlePercentageChange}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button 
            className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Upload size={18} />
                Generate Forecast
              </>
            )}
          </button>
        </form>

        {/* Loading indicator */}
        {loading && (
          <div className="flex flex-col items-center gap-6 mt-12 mb-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 font-medium text-sm">
                {Math.floor(Math.random() * 100)}%
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-medium">Processing your forecast</p>
              <p className="text-sm text-gray-500 mt-1">This may take a moment to complete</p>
            </div>
          </div>
        )}

        {/* Download section */}
        {downloadUrl && (
          <div className="mt-10 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <CheckCircle className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800">Forecast Generated Successfully</h3>
                  <p className="text-sm text-emerald-700">Your forecast is ready to download</p>
                </div>
              </div>
              
              <a 
                href={downloadUrl}
                className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm hover:shadow"
                download={outputFileName + ".zip"}
              >
                <FileDown size={18} />
                Download Forecast
              </a>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mt-8 p-5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <div className="text-red-500 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="font-medium text-red-800">Error Processing Forecast</h4>
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Data display section */}
        {isFileUploaded && data && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-100 p-1.5 rounded">
                <TrendingUp size={18} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Data Preview</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Sheet</label>
                <select 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
                  value={selectedSheet} 
                  onChange={handleSheetChange}
                >
                  <option value="">Select a Sheet</option>
                  {Object.keys(data).map((sheet) => (
                    <option key={sheet} value={sheet}>{sheet}</option>
                  ))}
                </select>
              </div>

              {!loading && selectedSheet && (
                <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">{selectedSheet} Sheet Data</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          {Object.keys(data[selectedSheet]).map((attribute) => (
                            <th 
                              key={attribute} 
                              className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                            >
                              {formatAttributeName(attribute)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Array.from({ 
                          length: Math.max(...Object.values(data[selectedSheet]).map(col => col.length)) 
                        }).map((_, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            {Object.keys(data[selectedSheet]).map((attribute) => (
                              <td 
                                key={attribute} 
                                className="py-3 px-6 text-sm text-gray-600 whitespace-nowrap"
                              >
                                {data[selectedSheet][attribute][rowIndex] || 
                                  <span className="text-gray-400 italic text-xs">No data</span>
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;