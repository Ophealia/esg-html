import React, { useEffect, useState } from 'react';
import ESGDashboard from '../components/ESGDashboard';
import '../selectstyle.css';


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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl mb-4 font-bold">Select a Company</h2>
            <select
              className="selectstyle ml-10"
              onChange={(e) => handleCompanyClick(e.target.value)}
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

        </div>
        {selectedCompany && (
          <div className="mt-0">
            <ESGDashboard company={selectedCompany} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;