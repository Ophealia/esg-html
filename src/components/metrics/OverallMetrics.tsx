import React, { useState, useEffect } from 'react';
import { ScoreCard } from '../ScoreCard.tsx';
import { MetricChart } from '../MetricChart.tsx';
import { ESGBreakdown } from '../ESGBreakdown.tsx';
import { Leaf, Users, Building2, TreePine, Factory, Scale, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Newspaper, TrendingUp, AlertTriangle, Award, ArrowRight, ExternalLink } from 'lucide-react';

interface ESGData {
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  esgBreakdown: Array<{
    metric: string;
    score: number;
  }>;
  env_dimensions: Array<{
    name: string;
    value: number;
  }>;
}

interface OverallMetricsProps {
  company: string;
}

interface realtime {
  insight: string;
  timestamp: string;
}

interface greenwash {
  rate: string;
  reason: string;
}

const OverallMetrics: React.FC<OverallMetricsProps> = ({ company }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [esgData, setEsgData] = useState<ESGData>({
    environmentScore: 0,
    socialScore: 0,
    governanceScore: 0,
    esgBreakdown: [],
    env_dimensions: []
  });
  const [realtimeData, setRealtimeData] = useState<realtime[]>([]);
  const [greenwashData, setGreenwashData] = useState<greenwash[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPreviewContent = (content: string) => {
    const lines = content.split('\n');
    return lines.slice(0, 3).join('\n');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/score-data?company=${company}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const news_response = await fetch(`http://localhost:3002/realtime-data?company=${company}`);
        if (!news_response.ok) {
          throw new Error(`Error fetching data: ${news_response.statusText}`);
        }

        const greenwash_response = await fetch(`http://localhost:3002/greenwash-data?company=${company}`);
        if (!greenwash_response.ok) {
          throw new Error(`Error fetching data: ${greenwash_response.statusText}`);
        }

        const esg_jsonData = await response.json();
        const news_jsonData = await news_response.json();
        const greenwash_jsonData = await greenwash_response.json();

        // Flatten the nested array structure
        const esg_parsedData = esg_jsonData.flat(); 
        const news_parsedData = news_jsonData.flat(); 
        
        // Assuming the backend returns an array of objects with the required fields
        const esgData = esg_parsedData.reduce(
          (acc: ESGData, item: any) => {
            acc.environmentScore += item['ENV Score'] || 0;
            acc.socialScore += item['SOC Score'] || 0;
            acc.governanceScore += item['GOV Score'] || 0;
            acc.esgBreakdown.push(
              { metric: 'ENV Score', score: item['ENV Score'] || 0 },
              { metric: 'SOC Score', score: item['SOC Score'] || 0 },
              { metric: 'GOV Score', score: item['GOV Score'] || 0 }
            );
            acc.env_dimensions.push(
              { name: 'Carbon Emissions', value: item['ENV_GHG'] || 0 },
              { name: 'Energy Efficiency', value: item['ENV_Energy'] || 0 },
              { name: 'Water Conservation', value: item['ENV_Water'] || 0 },
              { name: 'Waste Reduction', value: item['ENV_Waste'] || 0 }
            );
            return acc;
          },
          {
            environmentScore: 0,
            socialScore: 0,
            governanceScore: 0,
            esgBreakdown: [],
            env_dimensions: []
          } as ESGData
        );

        const realtimeData = news_parsedData.map((item: any) => ({
          insight: item['insight'],
          timestamp: item['timestamp']
        }));

        setRealtimeData(realtimeData);
        setEsgData(esgData);
        setGreenwashData(greenwashData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log('Data fetched:', esgData);
      console.log('Realtime data fetched:', realtimeData);
      console.log('Greenwash data fetched:', greenwashData);
    };

    fetchData();
  }, [company]);

  return (
    <div className="w-full mx-auto bg-gray-950 text-white p-8">
      {/* ESG Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ScoreCard title="Environmental Score" score={esgData.environmentScore} change={5.2} icon={<TreePine size={36} />} />
        <ScoreCard title="Social Score" score={esgData.socialScore} change={3.8} icon={<Users size={36} />} />
        <ScoreCard title="Governance Score" score={esgData.governanceScore} change={4.5} icon={<Building2 size={36} />} />
      </div>

      {/* Environmental, Social, and Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricChart data={esgData.env_dimensions} dataKey="value" title="Environmental Dimensions" />
        <ESGBreakdown data={esgData.esgBreakdown} />
      </div>

      {/* Real-time News Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-green-800">
          <div className="flex items-center justify-between mb-6">
            <motion.div className="flex items-center">
              <Newspaper className="text-green-500 mr-2" />
              <h3 className="text-2xl font-semibold">ESG News Feed</h3>
            </motion.div>
            <motion.div className="text-green-500 text-lg" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              Live Updates
            </motion.div>
          </div>

          <div className="space-y-4">
            {realtimeData.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${hoveredNews === index ? 'bg-gray-800' : 'bg-gray-700'}`}
                onMouseEnter={() => setHoveredNews(index)}
                onMouseLeave={() => setHoveredNews(null)}
              >
                <div className="grid items-center justify-between">
                <div className="grid text-base font-mono text-custom-green">{item.timestamp}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-mono">
                      <ReactMarkdown>{expandedItems[index] ? item.insight : getPreviewContent(item.insight)}</ReactMarkdown>
                    </span>
                  </div>
                </div>
                {item.insight.split('\n').length > 3 && (
                  <button onClick={() => toggleExpand(index)} className="text-blue-500 text-sm mt-2">
                    {expandedItems[index] ? 'Show less' : 'Show more'}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="bg-gray-900 p-6 rounded-xl border border-green-800">
          <h3 className="text-xl font-semibold mb-6">Green Wash</h3>
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
  );
};

export default OverallMetrics;