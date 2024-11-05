import React from 'react';
import { Leaf } from 'lucide-react';
import ESGDashboard from '../components/ESGDashboard';


const AnalysisPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">ESG Performance Analysis</h1>
            <p className="text-gray-400 mt-2">Comprehensive analysis of Environmental, Social, and Governance metrics</p>
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