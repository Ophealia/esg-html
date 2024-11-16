import React, { useState, useEffect } from 'react';
import { ScoreCard } from '../ScoreCard.tsx';
import { MetricChart } from '../MetricChart.tsx';
import { ESGBreakdown } from '../ESGBreakdown.tsx';
import { Cloud , Leaf, Users, Building2, TreePine, Factory, Scale, Heart, Diameter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Newspaper, TrendingUp, AlertTriangle, Award, ArrowRight, ExternalLink } from 'lucide-react';
import ESGScoreComponent from '../data/esgscore';


interface ESGData {
  rating: string;
  overallScore: number;
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

interface advice {
  title: string;
  text: string;
}

interface greenwash {
  rate: string;
  reason: string;
}

// Matrix Coverage
interface MatrixCoverageProps {
  matrixnumber: number;
}

interface AdviceCardProps {
  title: string;
  icon: React.ReactNode;
  text: React.ReactNode;
}


const ProgressCard: React.FC<{ matrixnumber: number; totalMatrixCount: number }> = ({ matrixnumber, totalMatrixCount }) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-green-800 w-full">
        <div className="flex items-center mb-4">
          <TreePine size={24} className="text-green-600" />
          <span className="ml-2 font-semibold text-lg">Matrix Coverage</span>
        </div>
        <div className="relative">
          {/* 底部进度条 - 灰色 */}
          <div className="w-full h-4 bg-gray-300 rounded-full" />

          {/* 动态的进度条 - 绿色 */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(matrixnumber / totalMatrixCount) * 100}%` }}  // 动态调整进度
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-4 bg-green-500 rounded-full absolute top-0 left-0"
            style={{ zIndex: 1 }}  // 确保绿色进度条在上层
          />

          {/* 显示当前进度和总进度 */}
          <div className="absolute bottom-8 left-0 w-full text-right text-sm text-white pr-2 z-10">
            {matrixnumber}/{totalMatrixCount}
          </div>
        </div>
      </div>
    </div>

  );
};

const AdviceCard: React.FC<AdviceCardProps> = ({ title, icon, text }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-green-800 w-full">
      <div className="flex items-center space-x-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-white">{text}</p> {/* 显示动态的建议文本 */}
    </div>
  );
};



const OverallMetrics: React.FC<OverallMetricsProps> = ({ company }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [esgData, setEsgData] = useState<ESGData>({
    rating: '',
    overallScore: 0,
    environmentScore: 0,
    socialScore: 0,
    governanceScore: 0,
    esgBreakdown: [],
    env_dimensions: []
  });
  const [realtimeData, setRealtimeData] = useState<realtime[]>([]);
  const [greenwashData, setGreenwashData] = useState<greenwash[]>([]);
  const [matrixnumber, setMatrixNumber] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPreviewContent = (content: string) => {
    try {
      if (typeof content !== 'string') {
        throw new Error('Invalid content type');
      }
      const lines = content.split('\n');
      return lines.slice(0, 3).join('\n');
    } catch (error) {
      console.error('Error processing content:', (error as Error).message);
      return 'Error processing content';
    }
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

        const matrix_response = await fetch(`http://localhost:3002/validation-company`);
        if (!matrix_response.ok) {
          throw new Error(`Error fetching data: ${matrix_response.statusText}`);
        }

        const esg_jsonData = await response.json();
        const news_jsonData = await news_response.json();
        const greenwash_jsonData = await greenwash_response.json();
        const matrix_jsonData = await matrix_response.json();

        // Flatten the nested array structure
        const esg_parsedData = esg_jsonData.flat(); 
        const news_parsedData = news_jsonData.flat(); 
        
        console.log('greenwash_jsonData:', greenwash_jsonData);

        // Assuming the backend returns an array of objects with the required fields
        const esgData = esg_parsedData.reduce(
          (acc: ESGData, item: any) => {
            acc.rating = item['Letter Rating'];
            acc.overallScore += item['Total ESG Score'] || 0;
            acc.environmentScore += item['ENV Score'] || 0;
            acc.socialScore += item['SOC Score'] || 0;
            acc.governanceScore += item['GOV Score'] || 0;
            acc.esgBreakdown.push(
              { metric: 'ENV Score', score: item['ENV Score'] || 0 },
              { metric: 'SOC Score', score: item['SOC Score'] || 0 },
              { metric: 'GOV Score', score: item['GOV Score'] || 0 }
            );
            acc.env_dimensions.push(
              { name: 'Carbon', value: item['ENV_GHG'] || 0 },
              { name: 'Energy', value: item['ENV_Energy'] || 0 },
              { name: 'Water', value: item['ENV_Water'] || 0 },
              { name: 'Waste', value: item['ENV_Waste'] || 0 }
            );
            {/*
            acc.env_dimensions.push(
              { name: 'Carbon Emissions', value: item['ENV_GHG'] || 0 },
              { name: 'Energy Efficiency', value: item['ENV_Energy'] || 0 },
              { name: 'Water Conservation', value: item['ENV_Water'] || 0 },
              { name: 'Waste Reduction', value: item['ENV_Waste'] || 0 }
            );
            */}
            return acc;
          },
          {
            rating: '',
            overallScore: 0,
            environmentScore: 0,
            socialScore: 0,
            governanceScore: 0,
            esgBreakdown: [],
            env_dimensions: []
          } as ESGData
        );

        const realtimeData = news_parsedData.map((item: any) => ({
          insight: item['esg_insights'],
          timestamp: item['timestamp'].split('T')[0]
        }));

        const greenwashData = greenwash_jsonData.map((item: any) => ({
          rate: item['rate'],
          reason: item['reason']
        }));

        
        const matrixItem = matrix_jsonData[0].find((item: any) => {
          const company_report = company + '_report';
          return item['report'] === company_report;
        });
   
        const result = matrixItem ? 45 - matrixItem['total_missing_fields_count'] : null;
        
        setEsgData(esgData);
        console.log('ESG Data:', esgData);
        setRealtimeData(realtimeData);
        setGreenwashData(greenwashData);
        setMatrixNumber(result);
        console.log('Matrix Number:', matrixnumber);
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
       <div className="grid grid-cols-1 gap-6 mb-4">
        <AdviceCard 
          title="Advice" 
          icon={<Cloud size={25} color="#7FF000" />} 
          text={
            <ESGScoreComponent
            rating={esgData.rating ?? ''}
            overallScore={esgData.overallScore ?? 0}
            environmentScore={esgData.environmentScore ?? 0}
            socialScore={esgData.socialScore ?? 0}
            governanceScore={esgData.governanceScore ?? 0}
          />
          } // 传递动态建议文本
        />
      </div>     

      <div className="grid grid-cols-1 gap-6 mb-4">
        <ProgressCard matrixnumber={matrixnumber ?? 0} totalMatrixCount={45} />
      </div>

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
      <div className="flex gap-6 max-w-screen-xl">
        <motion.div className="bg-gray-900 p-6 rounded-xl border border-green-800">
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
      </div>
    
      {/* Green Wash */}
      <div className="flex gap-6 max-w-screen-xl mt-6">
        <motion.div className="bg-gray-900 p-6 rounded-xl border border-green-800">
          <div className="flex items-center justify-between mb-6">
            <motion.div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" />
              <h3 className="text-2xl font-semibold">Green Wash</h3>
            </motion.div>
          </div>

          <div className="space-y-4">
            {greenwashData.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg ${hoveredNews === index ? 'bg-gray-800' : 'bg-gray-700'}`}
                onMouseEnter={() => setHoveredNews(index)}
                onMouseLeave={() => setHoveredNews(null)}
              >
                <div className="grid items-center justify-between">
                  <div className="grid text-2xl font-bold text-custom-green">Rate: {item.rate}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-mono">
                      <div className='text-custom-green text-2xl font-bold'>Reason: </div>
                      <ReactMarkdown>{expandedItems[index] ? item.reason : getPreviewContent(item.reason)}</ReactMarkdown>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>   
      </div>

    </div>
  );
};

export default OverallMetrics;