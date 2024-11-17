import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface GovernanceMetricsProps {
  company: string;
}

interface boardCompositionData {
  name: string;
  value: number;
}

interface independentValue {
  value: number;
}

interface EthicalBehaviour {
  value: number; 
}

interface ethicalBehaviourData {
  name: string;
  value: number;
}

interface certificationData {
  metric: string;
  value: string;
  unit: string;
}

interface frameworkAlignmentData {
  metric: string;
  value: string;
  unit: string;
}

const COLORS = ['#059669', '#0ea5e9', '#6366f1','#34D399'];

export const GovernanceMetrics: React.FC<GovernanceMetricsProps> = ({ company })  => {
  const [boardCompositionData, setBoardCompositionData] = useState<boardCompositionData[]>([]);
  const [independentValue, setIndependentValue] = useState<independentValue>({ value: 0 });
  const [ethicalBehaviourData, setEthicalBehaviourData] = useState<ethicalBehaviourData[]>([]);
  const [EthicalBehaviour, setEthicalBehaviour] = useState<EthicalBehaviour>({ value: 0 });
  const [frameworkAlignmentData, setFrameworkAlignmentData] = useState<frameworkAlignmentData>({ metric: '', value: '', unit: '' });
  const [certificationData, setCertificationData] = useState<certificationData>({ metric: '', value: '', unit: '' });

  useEffect(() => {
    // Fetch data here
    const fetchData = async () => {
      try {
        const metricsResponse = await fetch(`${process.env.react_app_api_base_url}/company-metrics?company=${company}`);
        if (!metricsResponse.ok) {
          throw new Error(`Error fetching company metrics: ${metricsResponse.statusText}`);
        }
        const metricsData = await metricsResponse.json();

        const getboarCompositionData = (data: Record<string, { value: string; unit: string }>): boardCompositionData[] => {
          const independentValue = Number(data['B-GOV_BOC_WOB'].value);
          const otherValue = 100 - independentValue;
        
          return [
            {
              name: 'Independent',
              value: independentValue,
            },
            {
              name: 'Other',
              value: otherValue,
            }
          ];
        }
        setIndependentValue({ value: Number(metricsData['B-GOV_BOC_WOB'].value) });
        setBoardCompositionData(getboarCompositionData(metricsData));
        console.log('boarddata', getboarCompositionData(metricsData));

        const getEthicalBehaviourData = (data: Record<string, { value: string; unit: string }>): ethicalBehaviourData[] => {
          const ethicalBehaviour = Number(data['B-GOV_ETB_ACT_P'].value);
          const remaining = 100 - ethicalBehaviour;
        
          return [
            {
              name: 'Ethical Behaviour',
              value: ethicalBehaviour,
            },
            {
              name: 'Remaining',
              value: remaining,
            }
          ];
        }
        setEthicalBehaviourData(getEthicalBehaviourData(metricsData));
        setEthicalBehaviour({ value: Number(metricsData['B-GOV_ETB_ACT_P'].value) });
        console.log('ethicaldata', getEthicalBehaviourData(metricsData));

        const getCertificationData = (data: Record<string, { value: string; unit: string }>): certificationData => {
          return {
            metric: 'B-GOV_CER_LRC',
            value: data['B-GOV_CER_LRC'].value,
            unit: data['B-GOV_CER_LRC'].unit,
          };
        }
        setCertificationData(getCertificationData(metricsData));
        console.log('certificationdata', getCertificationData(metricsData));

        const getFrameworkAlignmentData = (data: Record<string, { value: string; unit: string }>): frameworkAlignmentData => {
          return {
            metric: 'B-GOV_ALF_AFD',
            value: data['B-GOV_ALF_AFD'].value,
            unit: data['B-GOV_ALF_AFD'].unit,
          };
        }
        setFrameworkAlignmentData(getFrameworkAlignmentData(metricsData));
        console.log('frameworkdata', getFrameworkAlignmentData(metricsData));


      } catch (error) {
        console.error('Fail to fetch gov data ', error);
      }
    } ;
    
    fetchData();
  }, [company]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Board Composition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Building2 className="text-green-500 mr-2" />
            <h3 className="text-2xl font-semibold">Board Composition</h3>
          </div>
          
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="80%" height="80%">
              <PieChart>
                <Pie
                  data={boardCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {boardCompositionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-green-400 text-xl mt-2">
            {independentValue.value}% Independent
          </div>
        </motion.div>

        {/* Certification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Users className="text-green-500 mr-2" />
            <h3 className="text-2xl font-semibold">Certification</h3>
          </div>

          {/* 显示认证信息 */}
          <div className="bg-gray-800 p-4 rounded-lg text-sm text-green-400">
            <div className="text-lg font-semibold text-white">{certificationData.value}</div>
            <div className="mt-2">
              <span className="text-gray-400">Metric:</span> {certificationData.metric}
            </div>
            <div className="mt-1">
              <span className="text-gray-400">Unit:</span> {certificationData.unit}
            </div>
          </div>

          {/* 可选的徽标或标签 */}
          {/* 
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span>{certificationData.unit}</span>
            </div>
          </div> 
          */}
        </motion.div>

        {/*Ethical Behaviour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Award className="text-green-500 mr-2" />
            <h3 className="text-2xl font-semibold">Ethical Behaviour</h3>
          </div>

          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="80%" height="80%">
              <PieChart>
                <Pie
                  data={ethicalBehaviourData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ethicalBehaviourData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center text-green-400 text-xl mt-2">
            {EthicalBehaviour.value}% Ethical Behaviour
          </div>
        </motion.div>

        {/* Alignment with Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Users className="text-green-500 mr-2" />
            <h3 className="text-2xl font-semibold">Alignment with Frameworks</h3>
          </div>

          {/* 显示认证信息 */}
          <div className="bg-gray-800 p-4 rounded-lg text-sm text-green-400">
            <div className="text-lg font-semibold text-white">{frameworkAlignmentData.value}</div>
            <div className="mt-2">
              <span className="text-gray-400">Metric:</span> {frameworkAlignmentData.metric}
            </div>
            <div className="mt-1">
              <span className="text-gray-400">Unit:</span> {frameworkAlignmentData.unit}
            </div>
          </div>

          {/* 可选的徽标或标签 */}
          {/*
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span>{frameworkAlignmentData.unit}</span>
            </div>
          </div>
          */}
        </motion.div>
      </div>
    </div>
  );
};