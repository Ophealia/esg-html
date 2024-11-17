import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { version as pdfjsVersion } from 'pdfjs-dist';

interface CompanyData {
  name: string;
  missingValue: number;
  extract_score: number;
  report_score: number;
  file_path: string;
  json_data: string;
  [key: string]: any;
}

function Validation() {
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [showJson, setShowJson] = useState(false);
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);


  const handleViewClick = (url: string) => {
    setPdfUrl(`${process.env.REACT_APP_API_BASE_URL}/${url}`);
    //console.log(`${process.env.REACT_APP_API_BASE_URL}/${url}`);
    setShowPdf(true);
  };

  const handleJsonViewClick = (jsonData: string) => {
    setJsonContent(JSON.stringify(jsonData, null, 2))
    setShowJson(true);
  };

  const handleCloseClick = () => {
    setShowPdf(false);
    setPdfUrl('');
    setShowJson(false);
    setJsonContent(null);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  // 获取数据
  useEffect(() => {
      // Fetch the list of companies (file names) from the backend
      const fetchCompanies = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/validation-company`);
          console.log('env', process.env.REACT_APP_API_BASE_URL)
          if (!response.ok) {
            throw new Error(`Error fetching companies: ${response.statusText}`);
          }
          const data = await response.json();
          const company = data[0].map((item: any) => {
              console.log('item:', item); 
              return {
                  name: item['report'],
                  missingValue: item['total_missing_fields_count'],
                  extract_score: item['extraction_quality_score'],
                  report_score: item['report_quality_score'],
                  file_path: item['file_path'],
                  json_data: item['json_data'],
            };
          });
          setCompanyData(company);
          // console.log('companyData:', companyData);
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
  
      fetchCompanies();
    }, []);

  // 表格列标题
  const sortedData = React.useMemo(() => {
    let sortableData = [...companyData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [companyData, sortConfig]);

  const tableHeaders = [
    { key: 'name', label: 'Company Name' },
    { key: 'missingValue', label: 'Missing Value' },
    { key: 'extract_score', label: 'Extract Score' },
    { key: 'report_score', label: 'Report Score' },
    { key: 'file_path', label: 'Report' },
    { key: 'json_data', label: 'Metrics' },
  ];

  return (
      <div className="min-h-screen bg-black text-white p-8 mr-10 ml-10">
      <h1 className="text-4xl font-bold mb-6">ESG Company Data</h1>
      
      {/* 表格 */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-gray-700">
          <thead>
            <tr>
            {tableHeaders.map(header => (
              <th
                key={header.key}
                className="p-4 border border-gray-700 text-left cursor-pointer"
                onClick={() => handleSort(header.key)}
              >
                {header.label}
                {sortConfig && sortConfig.key === header.key && (
                  <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((company, index) => (
            <tr key={index} className="border border-gray-700">
                <td className="p-4">{company.name}</td>
                <td className="p-4">{company.missingValue}</td>
                <td className="p-4">{company.extract_score}</td>
                <td className="p-4">{company.report_score}</td>
                <td className="p-4">
                  <button 
                  className="bg-blue-500 px-3 py-1 rounded" 
                  onClick={() => handleViewClick(company.file_path)}>View</button>
                </td>
                <td className="p-4">
                <button 
                  className="bg-green-500 px-3 py-1 rounded" 
                  onClick={() => handleJsonViewClick(company.json_data)}>View JSON</button>
                </td>
            </tr>
            ))}

            {showPdf && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4">
                  <button className="bg-red-500 px-3 py-1 rounded mb-4" onClick={handleCloseClick}>
                    Close
                  </button>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl} />
                  </Worker>
                </div>
              </div>
            )}

            {showJson && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto">
                  <button className="bg-red-500 px-3 py-1 rounded mb-4" onClick={handleCloseClick}>
                    Close
                  </button>
                  <pre className='text-black text-lg'>{jsonContent}</pre>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
  </div>
  );
}

export default Validation;