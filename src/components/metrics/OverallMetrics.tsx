import React from 'react';
import { ScoreCard } from '../ScoreCard.tsx';
import { MetricChart } from '../MetricChart.tsx';
import { ESGBreakdown } from '../ESGBreakdown.tsx';
import { Leaf, Users, Building2, TreePine, Factory, Scale, Heart } from 'lucide-react';

// Mock data
const environmentalData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 68 },
  { name: 'Mar', value: 72 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 78 },
  { name: 'Jun', value: 82 },
];

const socialData = [
  { name: 'Jan', value: 70 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 75 },
  { name: 'Apr', value: 78 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 83 },
];

const governanceData = [
  { name: 'Jan', value: 75 },
  { name: 'Feb', value: 78 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 82 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 88 },
];

const esgBreakdownData = [
    { name: 'Environmental', value: 82 },
    { name: 'Social', value: 83 },
    { name: 'Governance', value: 88 },
  ];


const OverallMetrics: React.FC = () => {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-7xl mx-auto">  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ScoreCard
              title="Environmental Score"
              score={82}
              change={5.2}
              icon={<TreePine size={24} />}
            />
            <ScoreCard
              title="Social Score"
              score={83}
              change={3.8}
              icon={<Users size={24} />}
            />
            <ScoreCard
              title="Governance Score"
              score={88}
              change={4.5}
              icon={<Building2 size={24} />}
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <MetricChart
              data={environmentalData}
              dataKey="value"
              title="Environmental Performance Trend"
            />
            <ESGBreakdown data={esgBreakdownData} />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-green-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Factory className="mr-2 text-green-500" />
                Carbon Emissions
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current (tCO2e)</span>
                    <span className="text-green-500">12,450</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Target (tCO2e)</span>
                    <span className="text-green-500">8,000</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-gray-900 p-6 rounded-xl border border-green-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="mr-2 text-green-500" />
                Social Impact
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Employee Satisfaction</span>
                  <span className="text-green-500">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Community Investment</span>
                  <span className="text-green-500">$2.5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Diversity Score</span>
                  <span className="text-green-500">88%</span>
                </div>
              </div>
            </div>
  
            <div className="bg-gray-900 p-6 rounded-xl border border-green-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Scale className="mr-2 text-green-500" />
                Governance Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Board Independence</span>
                  <span className="text-green-500">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ethics Compliance</span>
                  <span className="text-green-500">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Management</span>
                  <span className="text-green-500">94%</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricChart
              data={socialData}
              dataKey="value"
              title="Social Performance Trend"
            />
            <MetricChart
              data={governanceData}
              dataKey="value"
              title="Governance Performance Trend"
            />
          </div>
        </div>
      </div>
    );
};

export default OverallMetrics;