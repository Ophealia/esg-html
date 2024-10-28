import React, { useState } from 'react';
import { Leaf, Users, Scale } from 'lucide-react';

function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('environmental');
  const [selectedMetric, setSelectedMetric] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <MetricsList
            metrics={metrics[activeTab]}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
          <DetailedAnalysis metric={metrics[activeTab].find(m => m.id === selectedMetric)} />
        </div>

        <Recommendations recommendations={recommendations[activeTab]} />
      </div>
    </div>
  );
}

const Header = () => (
  <div className="text-center mb-12">
    <h1 className="text-3xl font-bold mb-4">ESG Analysis Dashboard</h1>
    <p className="text-gray-600">Comprehensive analysis across Environmental, Social, and Governance dimensions</p>
  </div>
);

const NavigationTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center mb-8">
    <nav className="flex space-x-4">
      <TabButton
        active={activeTab === 'environmental'}
        onClick={() => setActiveTab('environmental')}
        icon={<Leaf className="h-5 w-5" />}
        text="Environmental"
      />
      <TabButton
        active={activeTab === 'social'}
        onClick={() => setActiveTab('social')}
        icon={<Users className="h-5 w-5" />}
        text="Social"
      />
      <TabButton
        active={activeTab === 'governance'}
        onClick={() => setActiveTab('governance')}
        icon={<Scale className="h-5 w-5" />}
        text="Governance"
      />
    </nav>
  </div>
);

const MetricsList = ({ metrics, selectedMetric, setSelectedMetric }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
    <div className="space-y-3">
      {metrics.map((metric, index) => (
        <button
          key={index}
          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
            selectedMetric === metric.id ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMetric(metric.id)}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{metric.name}</span>
            <span className={`text-sm ${getScoreColor(metric.score)}`}>{metric.score}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const DetailedAnalysis = ({ metric }) => (
  <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-6">Detailed Analysis</h2>
    {metric ? (
      <MetricDetail metric={metric} />
    ) : (
      <div className="text-center text-gray-500 py-12">
        Select a metric to view detailed analysis
      </div>
    )}
  </div>
);

const MetricDetail = ({ metric }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
      <p className="text-gray-600">{metric.description}</p>
    </div>
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Current Score</span>
        <span className={`font-bold ${getScoreColor(metric.score)}`}>{metric.score}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className={`h-full rounded-full ${getScoreBackgroundColor(metric.score)}`} style={{ width: `${metric.score}%` }} />
      </div>
    </div>
    <TrendAnalysis />
  </div>
);

const Recommendations = ({ recommendations }) => (
  <div className="mt-8 bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">Recommendations</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((rec, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">{rec.title}</h3>
          <p className="text-sm text-gray-600">{rec.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const TrendAnalysis = () => (
  <div>
    <h4 className="font-medium mb-2">Trend Analysis</h4>
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="h-40 flex items-center justify-center text-gray-500">Trend visualization would go here</div>
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, text }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
      active ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const getScoreColor = (score) => (score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600');
const getScoreBackgroundColor = (score) => (score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600');

export default AnalysisPage;
