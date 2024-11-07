import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TreePine, Droplets, Trash2, Factory } from 'lucide-react';

const COLORS = ['#059669', '#34d399', '#0ea5e9', '#dc2626'];

const overallScoresData = [
  { aspect: 'GHG', score: 85 },
  { aspect: 'Energy', score: 78 },
  { aspect: 'Water', score: 88 },
  { aspect: 'Waste', score: 76 },
];

const ghgMetricsData = [
  { label: 'Absolute Emissions', total: 2000, density: 50 },
];

const energyMetricsData = [
  { label: 'Renewable Energy', total: 600, density: 60 },
  { label: 'Non-Renewable Energy', total: 400, density: 40 },
];

const waterMetricsData = [
  { label: 'Total Consumption', total: 850, density: 30 },
  { label: 'Recycled Water', total: 300, density: 25 },
];

const wasteMetricsData = [
  { label: 'Recycled Waste', total: 500, density: 70 },
  { label: 'Landfill Waste', total: 200, density: 30 },
];

export const EnvironmentalMetrics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-6 rounded-xl border border-green-800"
      >
        <h3 className="text-lg font-semibold text-center mb-4">Overall Environmental Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={overallScoresData}
              dataKey="score"
              nameKey="aspect"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {overallScoresData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* Custom Legend */}
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              content={({ payload }) => (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  {payload?.map((entry, index) => {
                    // First, check if payload is of the expected type
                    const { payload: entryData } = entry;
                    if (!entryData || !('aspect' in entryData) || !('score' in entryData)) return null;

                    const { aspect, score } = entryData; // Destructure the aspect and score
                    const color = COLORS[index % COLORS.length]; // Set color from COLORS array

                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '30px',  // Add spacing between legend items
                        }}
                      >
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: color, // Use color here
                            marginRight: '8px',
                          }}
                        />
                        <span>{aspect}: {score}</span> {/* Display aspect and score */}
                      </div>
                    );
                  })}
                </div>
              )}
            />
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

        {/* Waste Management Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Trash2 className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Waste Management</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="label" stroke="#9ca3af" />
              <YAxis yAxisId="left" orientation="left" stroke="#34d399" />
              <YAxis yAxisId="right" orientation="right" stroke="#dc2626" />
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="total" fill="#34d399" name="Total Waste" />
              <Bar yAxisId="right" dataKey="density" fill="#dc2626" name="Waste Density" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};
