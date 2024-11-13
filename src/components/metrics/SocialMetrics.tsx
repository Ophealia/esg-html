import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCircle, GraduationCap, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';


interface SocialMetricsProps {
  company: string;
}

interface GenderDiversityData {
  dimensions:Array<{
    category: string;
    female: number;
    male: number;
  }>;
}

interface ageData {
  age: string;
  current: number;
  newHires: number;
  turnover: number;
}

//const genderDiversityData = [
  //{ category: 'Current employees', female: 30, male: 70 },
  //{ category: 'New hires', female: 40, male: 60 },
  //{ category: 'Employee turnover', female: 50, male: 50 },
//];

interface TrainingData {
  name: string;
  value: number;
}

const COLORS = ['#059669', '#0ea5e9']; // 定义颜色数组，男和女各自的颜色

const healthSafetyData = [
  { OHS: 'Fatalities', value:3 },
  { OHS: 'High-consequence injuries',value:2 },
  { OHS: 'Recordable injuries', value:1 },
  { OHS: 'Recordable work-related ill health cases',value:4},
];


export const SocialMetrics:  React.FC<SocialMetricsProps> = ({ company }) => {
  const [genderData, setgenderData] = useState<GenderDiversityData>({dimensions:[]});
  const [ageData, setageData] = useState<ageData[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await fetch(`http://localhost:3002/company-metrics?company=${company}`);
        if (!metricsResponse.ok) {
          throw new Error(`Error fetching company metrics: ${metricsResponse.statusText}`);
        }
        const metricsData = await metricsResponse.json();
        // const parsedData = metricsData.flat(); // Flatten the nested array structure

        // Assuming the backend returns an array of objects with the required fields
        
        const getGenderData = (data: Record<string, { value: string; unit: string }>): GenderDiversityData => {

          const female_cur = parseFloat(data['B-SOC_GED_CEG_F'].value) || 0;
          const male_cur = parseFloat(data['B-SOC_GED_CEG_M'].value) || 0;
          const female_new = parseFloat(data['B-SOC_GED_NHG_F'].value) || 0;
          const male_new = parseFloat(data['B-SOC_GED_NHG_M'].value) || 0;
          const female_turnover = parseFloat(data['B-SOC_GED_ETG_F'].value) || 0;
          const male_turnover = parseFloat(data['B-SOC_GED_ETG_M'].value) || 0;

          return {
            dimensions: [
              { category: 'Current employees', female: female_cur , male: male_cur },
              { category: 'New hires', female: female_new, male: male_new},
              { category: 'Employee turnover', female: female_turnover , male: male_turnover}
            ]
          }
        }
        const reducedData = getGenderData(metricsData);
        setgenderData(reducedData);

        //get age distribution data
        const getAgeData = (data: Record<string, { value: string; unit: string }>): ageData[] => {
          const value_30 = parseFloat(data['B-SOC_AGD_CEA_U30'].value) || 0;
          const value_35_50 = parseFloat(data['B-SOC_AGD_CEA_B35'].value) || 0;
          const value_50 = parseFloat(data['B-SOC_AGD_CEA_A50'].value) || 0;

          const new_hire_30 = parseFloat(data['B-SOC_AGD_NHI_U30'].value) || 0;
          const new_hire_35_50 = parseFloat(data['B-SOC_AGD_NHI_B35'].value) || 0;
          const new_hire_50 = parseFloat(data['B-SOC_AGD_NHI_A50'].value) || 0;

          const turnover_30 = parseFloat(data['B-SOC_AGD_TOR_U30'].value) || 0;
          const turnover_35_50 = parseFloat(data['B-SOC_AGD_TOR_B35'].value) || 0;
          const turnover_50 = parseFloat(data['B-SOC_AGD_TOR_A50'].value) || 0;


          return [
            { age: 'Under 30', current: value_30, newHires: new_hire_30, turnover: turnover_30 },
            { age: '30-50', current: value_35_50, newHires: new_hire_35_50, turnover: turnover_35_50 },
            { age: 'Above 50', current: value_50, newHires: new_hire_50, turnover: turnover_50 }
          ];
        }

        const ageData = getAgeData(metricsData);
        setageData(ageData);

        //get training data
        const getTrainingData = (data: Record<string, { value: string; unit: string }>): TrainingData[] => {
          const female_training = parseFloat(data['B-SOC_DEV_ATH_MF'].value) || 0;
          const male_training = parseFloat(data['B-SOC_DEV_ATH_M:'].value) || 0;

          return [
            { name: 'Female', value: female_training },
            { name: 'Male', value: male_training }
          ];
        }

        const trainingData = getTrainingData(metricsData);
        setTrainingData(trainingData);

      } catch (error) {
        console.error('Error fetching company metrics:', error);
      }
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
              <BarChart data={genderData.dimensions}>
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
                  {trainingData.map((_, index) => (
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