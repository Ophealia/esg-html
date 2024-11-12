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

const genderData = [
  { name: 'Female', value: 45 },
  { name: 'Male', value: 52 },
  { name: 'Non-Binary', value: 3 },
];

const ageData = [
  { age: '18-25', value: 15 },
  { age: '26-35', value: 30 },
  { age: '36-45', value: 25 },
  { age: '46-55', value: 20 },
  { age: '56+', value: 10 },
];

const trainingData = [
  { subject: 'Technical Skills', A: 85 },
  { subject: 'Leadership', A: 75 },
  { subject: 'Soft Skills', A: 90 },
  { subject: 'Compliance', A: 95 },
  { subject: 'Innovation', A: 80 },
];

const healthSafetyData = [
  { month: 'Jan', incidents: 2, nearMisses: 5 },
  { month: 'Feb', incidents: 1, nearMisses: 4 },
  { month: 'Mar', incidents: 1, nearMisses: 3 },
  { month: 'Apr', incidents: 0, nearMisses: 2 },
  { month: 'May', incidents: 0, nearMisses: 2 },
  { month: 'Jun', incidents: 0, nearMisses: 1 },
];

const COLORS = ['#059669', '#0ea5e9', '#6366f1'];

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
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            {genderData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                <span>{entry.name}</span>
              </div>
            ))}
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
                <Bar dataKey="value" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
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
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={trainingData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name="Skills" dataKey="A" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Health & Safety */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Heart className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Health & Safety</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthSafetyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="incidents" fill="#dc2626" />
                <Bar dataKey="nearMisses" fill="#eab308" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              <span>Incidents</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Near Misses</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};