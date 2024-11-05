import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import ESGDashboard from '../components/ESGDashboard';


const AnalysisPage: React.FC = () => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  useEffect(() => {
    // Fetch the list of companies (file names) from the backend
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:3002/companies');
        if (!response.ok) {
          throw new Error(`Error fetching companies: ${response.statusText}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">ESG Performance Analysis</h1>
            <p className="text-gray-400 mt-2">Comprehensive analysis of Environmental, Social, and Governance metrics</p>
            <select
              className="mt-4 p-4 bg-gray-800 text-white rounded"
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              <option value="">Select a company</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-lg">
            <Leaf className="text-green-500" />
            <span className="text-green-500 font-semibold">84.3 Overall Score</span>
          </div>
        </div>

        <div>
          <ESGDashboard />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;