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
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/companies`);
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
        <div className="flex items-center justify-between mb-0">
          <h2 className="text-4xl mb-4 font-bold">Select a Company</h2>
            <select
              className="selectstyle ml-10"
              onChange={(e) => handleCompanyClick(e.target.value)}
            >
              <option value="" disabled selected>
                Select a company
              </option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

        </div>
        <div className="flex items-center justify-between mb-0">
          {/* add dash line */}
          <hr className="border-2 border-gray-700 w-full" />
        </div>

        <div className="mt-0">
        <ESGDashboard company={selectedCompany || 'United Overseas Bank Limited'} />
      </div>
      </div>
    </div>
  );
};

export default AnalysisPage;