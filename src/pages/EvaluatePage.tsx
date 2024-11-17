import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, LineChart } from 'lucide-react';


interface FileStatus {
  file: File;
  status: 'processing' | 'success' | 'error';
  fileUrl?: string;
  analysisStatus?: 'complete' | 'not_started' | 'analyzing' |'error';
}

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}


function EvaluatePage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileStatus[]>([]);

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleReadClick = async (path: string) => {
    try {
      console.log('read file', path);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/read-file?path=${path}`);
      
      if (!response.ok) {
        throw new Error(`Error reading file: ${response.statusText}`);
      }
      const data = await response.arrayBuffer();

      const text = new TextDecoder().decode(data);
      setFileContent(text);
      setIsPreviewVisible(true);

    } catch (error: any) {
      console.error(error);
      setIsPreviewVisible(false);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setFileContent(null);
  };


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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const startAnalysis = async (fileStatus: FileStatus) => {
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.file === fileStatus.file ? { ...f, analysisStatus: 'analyzing' } : f
      )
    );

    try {
      const startTime = Date.now();
      //console.log('to backend filestatus', fileStatus);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/start-analysis?file=${fileStatus.file.name}`)
      
      if (response.ok) {
        const result = await response.json();
        console.log('analysis result', result);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(30000 - elapsedTime, 0);

        setTimeout(() => {
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.file === fileStatus.file ? { ...f, analysisStatus: 'complete' } : f
            )
          );
        }, remainingTime);
      } else {
        throw new Error(`Error starting analysis: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error starting analysis:', error);
    }
  };

  const handleFiles = async (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(file => ({
      file,
      status: 'processing' as const,
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    for (const fileStatus of newFiles) {
      const formData = new FormData();
      formData.append('file', fileStatus.file);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('upload result', result);
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.file === fileStatus.file
              ? { ...f, 
                status: 'success', 
                fileUrl: result.fileUrl,
                analysisStatus: result.message.includes('already exists') ? 'complete' : 'not_started' 
              }
              : f
          )
        );

        // console.log('analysis status', files);

        
      } catch (error) {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.file === fileStatus.file ? { ...f, status: 'error' } : f
          )
        );
      }
    }
  };


  return (
    <div className="min-h-screen bg-custom-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl text-custom-green font-bold mb-4">ESG Evaluation</h1>
          <p className="text-2xl text-white">Upload your documents for comprehensive ESG analysis</p>
        </div>

        <div className="bg-gray-500 bg-opacity-30 rounded-2xl shadow-md p-20 ">
          <div
            className={`relative border-2 border-dashed rounded-lg p-16 text-center ${
              dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
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
          
          {/* Show the list of uploaded files */}
          {files.map((fileStatus, index) => (
            <div key={index} className="mt-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="h-6 w-6 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">{fileStatus.file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(fileStatus.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {fileStatus.status === 'processing' && (
                  <div className="flex items-center text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2" />
                    Processing
                  </div>
                )}
                {fileStatus.status === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete
                  </div>
                )}
                {fileStatus.status === 'error' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Error
                  </div>
                )}
              </div>

              {/* Show the download link */}
              {fileStatus.status === 'success' && fileStatus.fileUrl && (
                <div className="mt-4">
                  <a href={fileStatus.fileUrl} download className="text-blue-500 underline">
                    Download File
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* Show Analysis link if at least one file has been successfully uploaded */}
          {/* 
          {files.some(file => file.status === 'success') && (
            <nav className="hidden md:flex space-x-4 flex-1 justify-center">
            <NavLink to="/analysis" icon={<LineChart />} text="Analysis" />
            </nav>
          )}
          */}
          

          {files.map(file => (
            <div key={file.file.name}>
              <nav className="hidden md:flex space-x-4 flex-1 justify-center">
                {file.status === 'success' && (
                  <nav className="hidden md:flex space-x-4 flex-1 justify-center">
                    {file.analysisStatus === 'not_started' ? (
                        <button onClick={() => startAnalysis(file)} className="flex items-center space-x-1 px-4 py-3 bg-green-600 text-custom-gray hover:text-black border-2 border-custom-gray rounded-lg transition-colors duration-200">
                        <LineChart />
                        <span>Start Analysis</span>
                      </button>
                    ) : file.analysisStatus === 'complete' ? (
                      <NavLink to="/analysis" icon={<LineChart />} text="Analysis" />
                    ) : (
                      <span className='items-center space-x-1 px-4 py-3 bg-green-600 text-custom-gray hover:text-black border-2 border-custom-gray rounded-lg'>Analyzing...</span>
                    )}
                  </nav>
                )}
              </nav>
            </div>
          ))}


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
      
      <div className="mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl text-custom-green font-bold mb-4">Prompt Management System</h1>
            <p className="text-2xl text-white">Manage and organize LLM prompts and configurations</p>
          </div>

        {/* Prompt Management List */}
        <div className="space-y-6">
          {[
            { title: "Parse", path: "data/prompt/user_prompt.txt" },
            { title: "Annotate", path: "data/prompt/anotation/user_prompt.txt" },
            { title: "Realtime Info", path: "data/prompt/real_time_info/user_prompt.txt" },
            { title: "Greenwash", path: "data/prompt/greenwashing/user_prompt.txt" },
            { title: "Retrieve", path: "data/esg_retrieve/retrieve_questions.xlsx" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-lg">
              <div className="flex items-center">
                <div className="mr-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h2 className="text-xl text-white font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-400">{item.path}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  onClick={() => handleReadClick(item.path)}
                >
                  Read
                </button>
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  onClick={() => handleReadClick(item.path)}
                >
                  Modify
                </button>
                {item.title === "Retrieve" && (
                  <button className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600">+ Add</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isPreviewVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl">
              <h2 className="text-2xl font-bold mb-4">File Preview</h2>
              <pre className="bg-gray-100 p-4 text-xs rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{fileContent}</pre>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleClosePreview}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    </div>
  );
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-1 px-4 py-3 bg-green-600 text-custom-gray hover:text-black border-2 border-custom-gray rounded-lg transition-colors duration-200"
    >
      {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      <span>{text}</span>
    </button>
  );
};

export default EvaluatePage;