import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

function EvaluatePage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [companyType, setCompanyType] = useState<string>('');
  const [threshold, setThreshold] = useState<number>(50); // 默认阈值为50

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      
      // Validate file type and size
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(selectedFile.type);
      const isValidSize = selectedFile.size <= 50 * 1024 * 1024; // 50MB

      if (!isValidType) {
        setUploadStatus('error');
        setFile(null);
        return;
      }

      if (!isValidSize) {
        setUploadStatus('error');
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setUploadStatus('processing');
      
      // Simulate file processing with success/failure
      setTimeout(() => {
        const success = Math.random() > 0.2;
        setUploadStatus(success ? 'success' : 'error');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-custom-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl text-gre font-bold mb-4">ESG Evaluation</h1>
          <p className="text-2xl text-white">Upload your documents for comprehensive ESG analysis</p>
        </div>

        <div className="bg-gray-500 bg-opacity-30 rounded-2xl shadow-md p-20">
          <div className="mb-6">
            <h3 className="text-lg text-gre font-medium mb-4">Select company type</h3>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="w-full p-2 bg-custom-gray border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-custom-gray"
            >
              {['Manufacturing', 'Service', 'Retail', 'Finance', 'Technology', 'Others'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-lg text-gre font-medium mb-4">Set threshold</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-gray-400 text-center">Current threshold: {threshold}</p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-16 text-center ${
              dragActive ? 'border-green-500 bg-green-500' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.xlsx"
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <p className="text-xl text-slate-400 font-medium">
                  Drag and drop your files here or click to browse
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Supported formats: PDF, DOC, DOCX, XLSX
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="mt-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="h-6 w-6 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {uploadStatus === 'processing' && (
                  <div className="flex items-center text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2" />
                    Processing
                  </div>
                )}
                {uploadStatus === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete
                  </div>
                )}
                {uploadStatus === 'error' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Error
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg text-gray-400 font-medium mb-4">Instructions</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Upload your company's sustainability reports or ESG documentation</li>
              <li>• Supported file formats include PDF, DOC, DOCX, and XLSX</li>
              <li>• Maximum file size: 50MB</li>
              <li>• Processing typically takes 2-3 minutes</li>
              <li>• Results will be available in the Analysis section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluatePage;
