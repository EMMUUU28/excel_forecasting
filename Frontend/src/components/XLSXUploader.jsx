// import React, { useState } from "react";
// import axios from "axios";
// import { Upload, FileDown, CheckCircle, AlertCircle } from "lucide-react";

// function XLSXUploader() {
//   const [file, setFile] = useState(null);
//   const [outputFileName, setOutputFileName] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragActive(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragActive(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//       if (!outputFileName) {
//         setOutputFileName(droppedFile.name.split('.')[0]);
//       }
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file || !outputFileName) {
//       setErrorMessage("Please select a file and enter an output filename");
//       return;
//     }

//     setIsUploading(true);
//     setErrorMessage("");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("output_filename", outputFileName);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/upload/`,
//         formData
//       );
//       const filePathFromServer = response.data.file_path;
//       setDownloadUrl(`${import.meta.env.VITE_API_BASE_URL}${filePathFromServer}`);
//     } catch (error) {
//       setErrorMessage(error.response?.data?.error || "An error occurred during upload");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-lg transition-transform duration-300">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload Pricing Sheet</h1>
      
//       <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//         <div
//           className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${
//             dragActive 
//               ? "border-blue-500 bg-blue-50 scale-102" 
//               : "border-gray-200 bg-gray-50"
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={() => document.querySelector('input[type="file"]').click()}
//         >
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//             accept=".xlsx,.xls,.csv"
//           />
//           <Upload className="mx-auto text-gray-400" size={32} />
//           <div className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
//             {file ? (
//               <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm text-gray-600">
//                 {file.name}
//               </div>
//             ) : (
//               "Drag & drop your file here or click to browse"
//             )}
//           </div>
//         </div>

//         <input
//           type="text"
//           placeholder="Enter output file name"
//           value={outputFileName}
//           onChange={(e) => setOutputFileName(e.target.value)}
//           className="w-full p-3.5 rounded-lg border-2 border-gray-200 text-sm bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
//         />

//         <button
//           type="submit"
//           disabled={isUploading}
//           className="p-4 bg-blue-500 text-white rounded-lg text-base font-semibold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all hover:-translate-y-0.5 disabled:bg-blue-300 disabled:cursor-not-allowed relative overflow-hidden"
//         >
//           {isUploading ? (
//             <>
//               <Upload size={18} />Processing...
//             </>
//           ) : (
//             <>
//               <Upload size={18} /> Upload and Process
//             </>
//           )}
      
//           {isUploading && (
//             <div className="absolute bottom-0 left-0 h-1 bg-blue-300 w-full"></div>
//           )}
//         </button>
//       </form>

//       {isUploading && (
//         <div className="flex flex-col items-center gap-6 mt-10">
//           <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
//           <p className="text-gray-600 text-base">Processing your request...</p>
//         </div>
//       )}

//       {downloadUrl && (
//         <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 animate-slideIn">
//           <div className="flex items-center gap-2 text-green-600">
//             <CheckCircle size={20} />
//             <span>File processed successfully!</span>
//           </div>
//           <a
//             href={downloadUrl}
//             download={`${outputFileName}.xlsx`}
//             className="inline-flex items-center gap-2 mt-4 px-5 py-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all hover:-translate-y-0.5"
//           >
//             <FileDown size={18} />
//             Download File
//           </a>
//         </div>
//       )}

//       {errorMessage && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2 animate-shake">
//           <AlertCircle size={18} />
//           {errorMessage}
//         </div>
//       )}
//     </div>
//   );
// }

// export default XLSXUploader;

import React, { useState } from "react";
import axios from "axios";
import { Upload, FileDown, CheckCircle, AlertCircle, FileSpreadsheet } from "lucide-react";

function XLSXUploader() {
  const [file, setFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
        `${import.meta.env.VITE_API_BASE_URL}/api/upload/`,
        formData
      );
      const filePathFromServer = response.data.file_path;
      setDownloadUrl(`${import.meta.env.VITE_API_BASE_URL}${filePathFromServer}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-0 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header with matching gradient to forecast */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-8 px-10 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <FileSpreadsheet className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Pricing Sheet Processor</h1>
            <p className="text-indigo-100 max-w-xl relative z-10">Upload your Excel or CSV file to generate formatted pricing reports</p>
          </div>
        </div>
      </div>
      
      <div className="p-10">
        {/* Progress indicator */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${file ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className="text-xs mt-2 font-medium text-gray-600">Upload File</span>
          </div>
          <div className={`h-1 flex-grow mx-2 ${file ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${outputFileName ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className="text-xs mt-2 font-medium text-gray-600">Name Output</span>
          </div>
          <div className={`h-1 flex-grow mx-2 ${downloadUrl ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${downloadUrl ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <span className="text-xs mt-2 font-medium text-gray-600">Download</span>
          </div>
        </div>
        
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Spreadsheet File</label>
            <div
              className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 group ${
                dragActive 
                  ? "border-indigo-500 bg-indigo-50 scale-[1.01]" 
                  : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx,.xls,.csv"
              />
              
              <div className="flex flex-col items-center">
                {file ? (
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                    <FileSpreadsheet size={32} />
                  </div>
                ) : (
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
                    <Upload size={28} />
                  </div>
                )}
                
                {file ? (
                  <div>
                    <div className="text-sm font-medium text-gray-800">File selected:</div>
                    <div className="mt-2 py-2 px-4 bg-indigo-50 rounded-lg border border-indigo-100 inline-flex items-center">
                      <FileSpreadsheet size={16} className="text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-medium text-gray-800">Drag & drop your file here</div>
                    <div className="mt-2 text-xs text-gray-500">Supports XLSX, XLS and CSV files</div>
                    <div className="mt-4 inline-flex items-center text-sm text-indigo-600 font-medium py-1 px-3 border border-indigo-200 rounded-md hover:bg-indigo-50">
                      <Upload size={14} className="mr-1" /> Select file
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output filename */}
          <div className="space-y-2">
            <label htmlFor="output-filename" className="block text-sm font-medium text-gray-700">Output Filename</label>
            <div className="relative">
              <input
                id="output-filename"
                type="text"
                placeholder="Enter output file name"
                value={outputFileName}
                onChange={(e) => setOutputFileName(e.target.value)}
                className="w-full p-4 pl-12 rounded-lg border border-gray-300 text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FileDown size={18} />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                .xlsx
              </div>
            </div>
            <p className="text-xs text-gray-500 ml-1">Enter a name for your processed file</p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isUploading}
            className="mt-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-semibold flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Upload size={18} /> Process and Generate Report
              </>
            )}
          </button>
        </form>

        {/* Loading indicator */}
        {isUploading && (
          <div className="mt-12 flex flex-col items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 font-medium text-xs">
                {Math.floor(Math.random() * 100)}%
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-gray-700 font-medium">Processing your file</p>
              <p className="text-sm text-gray-500">This may take a moment depending on file size</p>
            </div>
          </div>
        )}

        {/* Success message */}
        {downloadUrl && (
          <div className="mt-10 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 animate-fadeIn">
            <div className="flex items-start">
              <div className="mr-4 bg-emerald-100 rounded-full p-2">
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="text-emerald-800 font-semibold text-lg">File Processed Successfully</h3>
                <p className="mt-1 text-emerald-700 text-sm">Your file has been processed and is ready for download</p>
                
                <a 
                  href={downloadUrl}
                  download={`${outputFileName}.xlsx`}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm hover:shadow"
                >
                  <FileDown size={18} />
                  Download Processed File
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
            <div className="text-red-500 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="font-medium text-red-800">An error occurred</h4>
              <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default XLSXUploader;