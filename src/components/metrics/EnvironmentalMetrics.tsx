import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Droplets, Trash2, Factory } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const emissionsData = [
  { month: 'Jan', value: 12450 },
  { month: 'Feb', value: 11800 },
  { month: 'Mar', value: 11200 },
  { month: 'Apr', value: 10900 },
  { month: 'May', value: 10400 },
  { month: 'Jun', value: 9800 },
];

const energyData = [
  { month: 'Jan', renewable: 45, nonRenewable: 55 },
  { month: 'Feb', renewable: 48, nonRenewable: 52 },
  { month: 'Mar', renewable: 52, nonRenewable: 48 },
  { month: 'Apr', renewable: 55, nonRenewable: 45 },
  { month: 'May', renewable: 58, nonRenewable: 42 },
  { month: 'Jun', renewable: 62, nonRenewable: 38 },
];

const waterData = [
  { month: 'Jan', consumption: 850, recycled: 200 },
  { month: 'Feb', consumption: 820, recycled: 220 },
  { month: 'Mar', consumption: 800, recycled: 240 },
  { month: 'Apr', consumption: 780, recycled: 260 },
  { month: 'May', consumption: 760, recycled: 280 },
  { month: 'Jun', consumption: 740, recycled: 300 },
];

const wasteData = [
  { month: 'Jan', recycled: 65, landfill: 35 },
  { month: 'Feb', recycled: 68, landfill: 32 },
  { month: 'Mar', recycled: 70, landfill: 30 },
  { month: 'Apr', recycled: 73, landfill: 27 },
  { month: 'May', recycled: 75, landfill: 25 },
  { month: 'Jun', recycled: 78, landfill: 22 },
];

export const EnvironmentalMetrics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Greenhouse Gas Emissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Factory className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Greenhouse Gas Emissions</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionsData}>
                <defs>
                  <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#059669"
                  fill="url(#emissionsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Energy Consumption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <TreePine className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Energy Consumption</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
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
                <Bar dataKey="renewable" stackId="a" fill="#059669" />
                <Bar dataKey="nonRenewable" stackId="a" fill="#1f2937" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span>Renewable</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-700 rounded-full mr-2"></div>
              <span>Non-Renewable</span>
            </div>
          </div>
        </motion.div>

        {/* Water Consumption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Droplets className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Water Management</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterData}>
                <defs>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="#0ea5e9"
                  fill="url(#waterGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="recycled"
                  stroke="#059669"
                  fill="url(#emissionsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Waste Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Trash2 className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Waste Management</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
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
                <Bar dataKey="recycled" fill="#059669" />
                <Bar dataKey="landfill" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span>Recycled</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              <span>Landfill</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};