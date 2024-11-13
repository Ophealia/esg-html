import React, { useEffect, useState } from 'react';
import { m, motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TreePine, Droplets, Trash2, Factory } from 'lucide-react';

interface ESGData {
  dimensions: Array<{
    aspect: string;
    score: number;
  }>;
}

interface GHGMetrics {
  label: string;
  total: number;
  density: number;
}

interface energyMetrics{
  label: string;
  total: number;
  density: number;
}

interface waterMetrics{
  label: string;
  total: number;
  density: number;
}

interface EnvironmentalMetricsProps {
  company: string;
}

const COLORS = ['#059669', '#34d399', '#0ea5e9', '#dc2626'];

const ScoreCard = ({ title, icon: Icon, score }: {
  title: string;
  icon: React.ElementType;
  score: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900 p-6 rounded-xl border border-green-800 hover:border-green-600 transition-colors"
  >
    <div className="flex items-center gap-3 mb-6 mt-2">
      <Icon className="text-green-500 h-8 w-8" />
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">Score</p>
      <p className="text-3xl font-bold text-green-400">
        {score.toLocaleString()}
      </p>
    </div>
  </motion.div>
);

export const EnvironmentalMetrics: React.FC<EnvironmentalMetricsProps> = ({ company })  => {
  const [esgData, setEsgData] = useState<ESGData>({
    dimensions: []
  });
  const [ghgMetricsData, setGhgMetricsData] = useState<GHGMetrics[]>([]);
  const [energyMetricsData, setEnergyMetricsData] = useState<energyMetrics[]>([]);
  const [waterMetricsData, setWaterMetricsData] = useState<waterMetrics[]>([]);

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
        const reducedData = parsedData.reduce(
          (acc: ESGData, item: any) => {
            acc.dimensions.push(
              { aspect: 'GHG', score: item['ENV_GHG'] || 0 },
              { aspect: 'Energy', score: item['ENV_Energy'] || 0 },
              { aspect: 'Water', score: item['ENV_Water'] || 0 },
              { aspect: 'Waste', score: item['ENV_Waste'] || 0 }
            );
            return acc;
          },
          {
            dimensions: []
          } as ESGData
        );
        
        setEsgData(reducedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log('Data fetched:', esgData);

      try {
        const metricsResponse = await fetch(`http://localhost:3002/company-metrics?company=${company}`);
        if (!metricsResponse.ok) {
          throw new Error(`Error fetching company metrics: ${metricsResponse.statusText}`);
        }
        const metricsData = await metricsResponse.json();

        //get green gas emissions(ghg) data
        const getGHGData = (data: Record<string, { value: string; unit: string }>): GHGMetrics[] => {
          const total = parseFloat(data['B-ENV_GHG_AET'].value) || 0;
          const density = parseFloat(data['B-ENV_GHG_EIT'].value) || 0;

          return [
            {
              label: 'Absolute Emissions',
              total,
              density
            }
          ];
        };

        const transformedData = getGHGData(metricsData);
        setGhgMetricsData(transformedData);

        //get energy consumption data
        const getEnergyData = (data: Record<string, { value: string; unit: string }>): energyMetrics[] => {
          const total = parseFloat(data['B-ENV_ENC_TEC'].value) || 0;
          const density = parseFloat(data['B-ENV_ENC_ECI'].value) || 0;

          return [
            {
              label: 'Energy Consumption',
              total: total,
              density: density
            }
          ];
        }

        const engData = getEnergyData(metricsData);
        setEnergyMetricsData(engData);

        //get water consumption data
        const getWaterData = (data: Record<string, { value: string; unit: string }>): energyMetrics[] => {
          const total = parseFloat(data['B-ENV_WAC_TWC'].value) || 0;
          const density = parseFloat(data['B-ENV_WAC_WCI'].value) || 0;

          return [
            {
              label: 'Water Consumption',
              total: total,
              density: density
            }
          ];
        }

        const wtrData = getWaterData(metricsData);
        setWaterMetricsData(wtrData);

      } catch (error) {
        console.error('Error fetching ghg metrics:', error);
      }
      console.log('GHG metrics fetched:', ghgMetricsData);

    };

    fetchData();
  }, [company]);

  return (
      <div className="max-w-screen mx-auto">
        <div className="grid grid-cols-4 gap-6">
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
  
        <div className="mt-4 space-y-6">
          {/* Overall Scores */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-6 rounded-xl border border-green-800"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">Overall Environmental Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={esgData.dimensions}
                  dataKey="score"
                  nameKey="aspect"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  label = {({ aspect }) => `${aspect}`} 
                >
                  {esgData.dimensions.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                {/* Custom Legend */}
                <Legend/>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GHG Emissions Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-green-800"
            >
              <div className="flex items-center mb-4">
                <Factory className="text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">GHG Emissions Metrics</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ghgMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis yAxisId="left" orientation="left" stroke="#34d399" />
                  <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="total" fill="#34d399" name="Total Emissions" />
                  <Bar yAxisId="right" dataKey="density" fill="#059669" name="Emission Density" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
  
            {/* Energy Consumption Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-green-800"
            >
              <div className="flex items-center mb-4">
                <TreePine className="text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Energy Consumption</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={energyMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis yAxisId="left" orientation="left" stroke="#34d399" />
                  <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="total" fill="#34d399" name="Total Energy" />
                  <Bar yAxisId="right" dataKey="density" fill="#059669" name="Energy Density" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
  
            {/* Water Management Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-green-800"
            >
              <div className="flex items-center mb-4">
                <Droplets className="text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Water Management</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={waterMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                  <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="total" fill="#0ea5e9" name="Total Water" />
                  <Bar yAxisId="right" dataKey="density" fill="#059669" name="Water Density" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
  
          </div>
        </div>
      </div>
    );
  };