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

  const handleCompanyClick = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div>
      {selectedCompany ? (
          <ESGDashboard company={selectedCompany} />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold ">ESG Performance Analysis</h1>
                <p className="text-gray-400 mt-2">Comprehensive analysis of Environmental, Social, and Governance metrics</p>
                <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-lg">
                  <Leaf className="text-green-500" />
                  <span className="text-green-500 font-semibold">84.3 Overall Score</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl mb-4 font-bold">Select a Company</h2>
              <ul className="mt-4 bg-gray-800 text-white p-2 rounded-lg">
                {companies.map((company) => (
                  <li
                    key={company}
                    className="cursor-pointer h-20 text-2xl font-bold p-4 bg-gray-800 rounded-lg hover:bg-gray-700 
                              hover:shadow-lg transition-shadow duration-200 ease-in-out flex items-center justify-between"
                    onClick={() => handleCompanyClick(company)}
                  >
                    {company}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;