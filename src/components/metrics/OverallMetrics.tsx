import React, { useState, useEffect } from 'react';
import { ScoreCard } from '../ScoreCard.tsx';
import { MetricChart } from '../MetricChart.tsx';
import { ESGBreakdown } from '../ESGBreakdown.tsx';
import { Leaf, Users, Building2, TreePine, Factory, Scale, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, TrendingUp, AlertTriangle, Award, ArrowRight, ExternalLink } from 'lucide-react';

interface ESGData {
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  esgBreakdown: Array<{
    metric: string;
    score: number;
  }>;
}

interface OverallMetricsProps {
  company: string;
}

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


const OverallMetrics: React.FC<OverallMetricsProps> = ({ company }) => {
  const [activeNews, setActiveNews] = useState<NewsItem[]>(mockNews);
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [esgData, setEsgData] = useState<ESGData>({
    environmentScore: 0,
    socialScore: 0,
    governanceScore: 0,
    esgBreakdown: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/score-data?company=${company}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        const parsedData = jsonData.flat(); // Flatten the nested array structure

        // Assuming the backend returns an array of objects with the required fields
        const esgData = parsedData.reduce(
          (acc: ESGData, item: any) => {
            acc.environmentScore += item['ENV Score'] || 0;
            acc.socialScore += item['SOC Score'] || 0;
            acc.governanceScore += item['GOV Score'] || 0;
            acc.esgBreakdown.push(
              { metric: 'ENV Score', score: item['ENV Score'] || 0 },
              { metric: 'SOC Score', score: item['SOC Score'] || 0 },
              { metric: 'GOV Score', score: item['GOV Score'] || 0 }
            );
            return acc;
          },
          {
            environmentScore: 0,
            socialScore: 0,
            governanceScore: 0,
            esgBreakdown: [],
          } as ESGData
        );

        setEsgData(esgData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log('Data fetched:', esgData);
    };

    fetchData();
  }, [company]);

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