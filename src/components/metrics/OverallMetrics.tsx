import React, { useState, useEffect } from 'react';
import { ScoreCard } from '../ScoreCard.tsx';
import { MetricChart } from '../MetricChart.tsx';
import { ESGBreakdown } from '../ESGBreakdown.tsx';
import { Leaf, Users, Building2, TreePine, Factory, Scale, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, AlertTriangle, Award, ArrowRight, ExternalLink } from 'lucide-react';



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

const environmentalDimensionsData = [
  { name: 'Energy Efficiency', value: 92 },
  { name: 'Waste Reduction', value: 89 },
  { name: 'Water Conservation', value: 85 },
  { name: 'Carbon Emissions', value: 78 }
];


interface NewsItem {
  id: number;
  category: 'environmental' | 'social' | 'governance';
  title: string;
  source: string;
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    category: 'environmental',
    title: 'Company Achieves Carbon Neutrality Ahead of Schedule',
    source: 'Environmental Report',
    impact: 'positive',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    category: 'social',
    title: 'New Diversity Initiative Launches Across Global Offices',
    source: 'HR Bulletin',
    impact: 'positive',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    category: 'governance',
    title: 'Board Approves New Sustainability Framework',
    source: 'Corporate Affairs',
    impact: 'positive',
    timestamp: '6 hours ago'
  },
  {
    id: 4,
    category: 'environmental',
    title: 'Renewable Energy Implementation Exceeds Targets',
    source: 'Energy Report',
    impact: 'positive',
    timestamp: '8 hours ago'
  },
  {
    id: 5,
    category: 'social',
    title: 'Employee Wellness Program Shows Positive Results',
    source: 'HR Analytics',
    impact: 'positive',
    timestamp: '12 hours ago'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'environmental':
      return 'bg-emerald-500/20 text-emerald-500';
    case 'social':
      return 'bg-blue-500/20 text-blue-500';
    case 'governance':
      return 'bg-purple-500/20 text-purple-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'positive':
      return 'bg-green-500/20 text-green-500';
    case 'negative':
      return 'bg-red-500/20 text-red-500';
    case 'neutral':
      return 'bg-yellow-500/20 text-yellow-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};

type BreakdownItem = {
  name: string;
  value: number;
};

type ESGData = {
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  esgBreakdown: BreakdownItem[];
};


const OverallMetrics: React.FC = () => {
  const [activeNews, setActiveNews] = useState<NewsItem[]>(mockNews);
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [esgData, setEsgData] = useState<ESGData>({
    environmentScore: 0,
    socialScore: 0,
    governanceScore: 0,
    esgBreakdown: [],
  });

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('http://localhost:3002/score-data');
        if (!response.ok) {
          throw new Error(`Error fetching CSV data: ${response.statusText}`);
        }

        const csvText = await response.text();
        const rows = csvText.split('\n');
        const headers = rows[0].split(',');

        const parsedData = rows.slice(1).map(row => {
          const values = row.split(',');
          return headers.reduce((acc, header, i) => {
            acc[header.trim()] = values[i].trim();
            return acc;
          }, {} as Record<string, string>);
        });

        const latestData = parsedData[0];

        setEsgData({
          environmentScore: parseFloat(latestData['Environment Score']),
          socialScore: parseFloat(latestData['Social Score']),
          governanceScore: parseFloat(latestData['Governance Score']),
          esgBreakdown: [
            { name: 'Environmental Score', value: parseFloat(latestData['Environment Score']) },
            { name: 'Social Score', value: parseFloat(latestData['Social Score']) },
            { name: 'Governance Score', value: parseFloat(latestData['Governance Score']) },
          ],
        });
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNews((prev) => {
        const newItem: NewsItem = {
          id: prev[prev.length - 1]?.id + 1 || 1,
          category: ['environmental', 'social', 'governance'][Math.floor(Math.random() * 3)] as 'environmental' | 'social' | 'governance',
          title: 'New ESG Initiative Announced',
          source: 'Latest Updates',
          impact: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
          timestamp: 'Just now'
        };
        return [...prev.slice(1), newItem];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* ESG Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScoreCard title="Environmental Score" score={esgData.environmentScore} change={5.2} icon={<TreePine size={24} />} />
          <ScoreCard title="Social Score" score={esgData.socialScore} change={3.8} icon={<Users size={24} />} />
          <ScoreCard title="Governance Score" score={esgData.governanceScore} change={4.5} icon={<Building2 size={24} />} />
        </div>

        {/* Environmental, Social, and Governance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricChart data={environmentalDimensionsData} dataKey="value" title="Environmental Dimensions" />
          <ESGBreakdown data={esgData.esgBreakdown} />
        </div>

        {/* Real-time News Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between mb-6">
              <motion.div className="flex items-center">
                <Newspaper className="text-green-500 mr-2" />
                <h3 className="text-xl font-semibold">ESG News Feed</h3>
              </motion.div>
              <motion.div className="text-green-500 text-sm" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                Live Updates
              </motion.div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {activeNews.map((news) => (
                  <motion.div key={news.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer relative overflow-hidden group">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                        {news.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(news.impact)}`}>
                        {news.impact}
                      </span>
                    </div>
                    <h4 className="font-medium mb-1">{news.title}</h4>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{news.source}</span> • <span>{news.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div className="bg-gray-900 p-6 rounded-xl border border-green-800">
            <h3 className="text-xl font-semibold mb-6">Quick Stats</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <span>Overall Score</span> <span className="text-green-500 font-bold">84.3</span>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <span>Risk Level</span> <span className="text-yellow-500 font-bold">Low</span>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                <span>Compliance</span> <span className="text-blue-500 font-bold">98%</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default OverallMetrics;