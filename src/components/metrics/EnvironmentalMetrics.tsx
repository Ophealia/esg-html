import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Droplets, Trash2, Factory } from 'lucide-react';

interface ESGData {
  dimensions: Array<{
    aspect: string;
    score: number;
  }>;
}

interface EnvironmentalMetricsProps {
  company: string;
}

const ScoreCard = ({ title, icon: Icon, score }: {
  title: string;
  icon: React.ElementType;
  score: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900 p-6 rounded-xl border border-green-800 hover:border-green-600 transition-colors w-full"
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-green-500 h-6 w-6" />
      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">Score</p>
      <p className="text-3xl font-bold text-green-400">
        {score.toLocaleString()}
      </p>
    </div>
  </motion.div>
);

const MainCard = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900 p-8 rounded-xl border border-green-800 mb-6"
  >
    <h2 className="text-3xl font-bold text-center text-gray-100 mb-4">
      Environmental Performance Overview
    </h2>
    <p className="text-xl text-center text-gray-400">
      Comprehensive analysis of environmental metrics and sustainability performance
    </p>
  </motion.div>
);

export const EnvironmentalMetrics: React.FC<EnvironmentalMetricsProps> = ({ company }) => {
  const [esgData, setEsgData] = useState<ESGData>({
    dimensions: []
  });

  useEffect(() => {
    // 模拟的 JSON 数据
    const mockData = [
      {
        "company": "Company A",
        "ENV_GHG": 75,
        "ENV_Energy": 85,
        "ENV_Water": 90,
        "ENV_Waste": 65
      },
      {
        "company": "Company B",
        "ENV_GHG": 60,
        "ENV_Energy": 78,
        "ENV_Water": 88,
        "ENV_Waste": 70
      },
      {
        "company": "Company C",
        "ENV_GHG": 82,
        "ENV_Energy": 95,
        "ENV_Water": 76,
        "ENV_Waste": 80
      }
    ];

    // 模拟数据过滤逻辑
    const companyData = mockData.find(item => item.company === company);
    if (companyData) {
      const reducedData = {
        dimensions: [
          { aspect: 'GHG', score: companyData['ENV_GHG'] },
          { aspect: 'Energy', score: companyData['ENV_Energy'] },
          { aspect: 'Water', score: companyData['ENV_Water'] },
          { aspect: 'Waste', score: companyData['ENV_Waste'] }
        ]
      };
      
      setEsgData(reducedData);
    } else {
      console.error(`No data found for company: ${company}`);
    }
  }, [company]);

  return (
    <div className="max-w-4xl mx-auto">
      <MainCard />
      
      <div className="space-y-4">
        {esgData.dimensions.map((dimension, index) => {
          let icon;
          switch (dimension.aspect) {
            case 'GHG':
              icon = Factory;
              break;
            case 'Energy':
              icon = TreePine;
              break;
            case 'Water':
              icon = Droplets;
              break;
            case 'Waste':
              icon = Trash2;
              break;
            default:
              icon = Factory;
          }
          
          return (
            <ScoreCard
              key={index}
              title={`${dimension.aspect} Score`}
              icon={icon}
              score={dimension.score}
            />
          );
        })}
      </div>
    </div>
  );
};
