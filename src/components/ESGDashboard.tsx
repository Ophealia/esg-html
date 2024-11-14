// src/components/ESGDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Leaf, Users, Building2 } from 'lucide-react';
import { EnvironmentalMetrics } from './metrics/EnvironmentalMetrics';
import { SocialMetrics } from './metrics/SocialMetrics';
import { GovernanceMetrics } from './metrics/GovernanceMetrics';
import OverallMetrics from './metrics/OverallMetrics';

interface ESGDashboardProps {
  company: string;
}

const overall = {
  value: 0,
  rating: 'A',
}


const ESGDashboard: React.FC<ESGDashboardProps> = ({ company }) => {
  const [activeTab, setActiveTab] = useState<'overall' |'environmental' | 'social' | 'governance'>('overall');
  // const [overall2, setOverall2] = useState<overall2>({value: 0});  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOverall = async () => {
      try {
        const response = await fetch(`http://localhost:3002/score-data/?company=${company}`);
        if (!response.ok) {
          throw new Error(`Error fetching overall: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('data:', data);
        const overalldata_value = data[0][0]['Total ESG Score']
        const overalldata_rating = data[0][0]['Letter Rating']
        console.log('overall data:', overalldata_value);
        overall.value = overalldata_value;
        overall.rating = overalldata_rating;
      
        setLoading(false);
        console.log('overall:', overall);

      } catch (error) {
        console.error('Error fetching overall:', error);
        setLoading(false);
      }
    };
    fetchOverall();
  }, [company]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-950 text-white p-8">
      <div className="grid grid-cols-4 items-center justify-between">
        <h1 className="col-span-3 first-letter:text-center m-6 text-6xl font-bold">{company}</h1>
        <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-lg max-w-fit">
          <Leaf className="text-gre" />
          <span className="text-gre font-bold text-xl">{overall.value} Overall Score</span>
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full">
            {overall.rating}
          </div>
        </div>
      </div>
      <div className="m-6">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 space-x-8 mb-6">
          <button
            onClick={() => setActiveTab('overall')}
            className={`flex items-center text-xl px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overall'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Leaf className="mr-2 h-7 w-7" />
            Overall
          </button>
          <button
            onClick={() => setActiveTab('environmental')}
            className={`flex items-center text-xl px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'environmental'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Leaf className="mr-2 h-7 w-7" />
            Environmental
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center text-xl px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'social'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Users className="mr-2 h-7 w-7" />
            Social
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`flex items-center text-xl px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'governance'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Building2 className="mr-2 h-7 w-7" />
            Governance
          </button>
        </div>

        {/* Content */}
        <div className="max-w-screen-2xl transition-all duration-300">
          {activeTab === 'overall' && <OverallMetrics company={company} />}            
          {activeTab === 'environmental' && <EnvironmentalMetrics company={company} />}
          {activeTab === 'social' && <SocialMetrics company={company} />}
          {activeTab === 'governance' && <GovernanceMetrics company={company} />}
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;
