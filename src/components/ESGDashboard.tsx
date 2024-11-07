// src/components/ESGDashboard.tsx
import React, { useState } from 'react';
import { Leaf, Users, Building2 } from 'lucide-react';
import { EnvironmentalMetrics } from './metrics/EnvironmentalMetrics';
import { SocialMetrics } from './metrics/SocialMetrics';
import { GovernanceMetrics } from './metrics/GovernanceMetrics';
import OverallMetrics from './metrics/OverallMetrics';

interface ESGDashboardProps {
  company: string;
}


const ESGDashboard: React.FC<ESGDashboardProps> = ({ company }) => {
  const [activeTab, setActiveTab] = useState<'overall' |'environmental' | 'social' | 'governance'>('overall');

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-950 text-white p-8">
      <h1 className="m-6 text-4xl font-bold ">{company}</h1>
      <div className="mx-auto">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overall')}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'overall'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Leaf className="mr-2 h-5 w-5" />
            Overall
          </button>
          <button
            onClick={() => setActiveTab('environmental')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'environmental'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Leaf className="mr-2 h-5 w-5" />
            Environmental
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'social'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Users className="mr-2 h-5 w-5" />
            Social
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'governance'
                ? 'bg-green-900 text-green-500'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Building2 className="mr-2 h-5 w-5" />
            Governance
          </button>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {activeTab === 'overall' && <OverallMetrics />}            
          {activeTab === 'environmental' && <EnvironmentalMetrics />}
          {activeTab === 'social' && <SocialMetrics />}
          {activeTab === 'governance' && <GovernanceMetrics />}
        </div>
      </div>
    </div>
  );
};

export default ESGDashboard;
