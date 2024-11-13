import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCircle, GraduationCap, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';


interface SocialMetricsProps {
  company: string;
}

interface genderData {
  name: string;
  value: number;
}

interface ageData {
  age: string;
  value: number;
}



const genderDiversityData = [
  { category: 'Current employees', female: 30, male: 70 },
  { category: 'New hires', female: 40, male: 60 },
  { category: 'Employee turnover', female: 50, male: 50 },
];

const ageData = [
  { age: 'Under 30', current: 40, newHires: 20, turnover: 10 },
  { age: '30-50', current: 50, newHires: 30, turnover: 15 },
  { age: 'Above 50', current: 20, newHires: 10, turnover: 5 },
];


const trainingData = [
  { name: 'Male', value: 30 }, // 示例数据：男性的平均培训小时数
  { name: 'Female', value: 25 }, // 示例数据：女性的平均培训小时数
];
const COLORS = ['#059669', '#0ea5e9']; // 定义颜色数组，男和女各自的颜色

const healthSafetyData = [
  { OHS: 'Fatalities', value:3 },
  { OHS: 'High-consequence injuries',value:2 },
  { OHS: 'Recordable injuries', value:1 },
  { OHS: 'Recordable work-related ill health cases',value:4},
];


export const SocialMetrics:  React.FC<SocialMetricsProps> = ({ company }) => {
  const [genderData, setgenderData] = useState<genderData[]>([]);
  const [ageData, setageData] = useState<ageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await fetch(`http://localhost:3002/company-metrics?company=${company}`);
        if (!metricsResponse.ok) {
          throw new Error(`Error fetching company metrics: ${metricsResponse.statusText}`);
        }
        const metricsData = await metricsResponse.json();

        //get green gas emissions(ghg) data
        const getGenData = (data: Record<string, { value: string; unit: string }>): genderData[] => {
          const value_w = parseFloat(data['B-SOC_GED_CEG_F'].value) || 0;
          const value_m = parseFloat(data['B-SOC_GED_CEG_M'].value) || 0;

          return [
            {
              name: 'Current employees by gender (Female)',
              value: value_w
            },
            {
              name: 'Current employeess by gender (Male)',
              value: value_m
            }
          ];
        };

        const transformedData = getGenData(metricsData);
        setgenderData(transformedData);

        //get age distribution data
        const getAgeData = (data: Record<string, { value: string; unit: string }>): ageData[] => {
          const value_30 = parseFloat(data['B-SOC_AGD_CEA_U30'].value) || 0;
          const value_35_50 = parseFloat(data['B-SOC_AGD_CEA_B35'].value) || 0;
          const value_50 = parseFloat(data['B-SOC_AGD_CEA_A50'].value) || 0;

          return [
            {
              age: '< 30',
              value: value_30
            },
            {
              age: '35-50',
              value: value_35_50
            },
            {
              age: '> 50',
              value: value_50
            }
          ];
        }

        const ageData = getAgeData(metricsData);
        setageData(ageData)

      } catch (error) {
        console.error('Error fetching ghg metrics:', error);
      }
      console.log('Gender metrics fetched:', genderData);
      console.log('Age metrics fetched:', ageData);
    };

    fetchData();
  }, [company]);


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Diversity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Users className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Gender Diversity</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderDiversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              <Bar dataKey="female" stackId="a" fill="#059669" />
              <Bar dataKey="male" stackId="a" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            <span>Female</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Male</span>
          </div>
        </div>
      </motion.div>

        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <UserCircle className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Age Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="age" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="current" stackId="a" fill="#059669" name="Current Employees" />
                <Bar dataKey="newHires" stackId="a" fill="#0ea5e9" name="New Hires" />
                <Bar dataKey="turnover" stackId="a" fill="#f43f5e" name="Turnover" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span>Current Employees</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>New Hires</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Turnover</span>
            </div>
          </div>
        </motion.div>

        {/* Training & Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <GraduationCap className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Training & Development</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trainingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {trainingData.map((entry, index) => (
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
        </motion.div>

        {/* Occupational Health & Safety */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Heart className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Occupational Health & Safety</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthSafetyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="OHS" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              <span>Fatalities</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>High-consequence Injuries</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Recordable Injuries</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Work-Related Ill Health Cases</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};