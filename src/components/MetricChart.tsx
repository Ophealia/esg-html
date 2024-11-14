import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricChartProps {
  data: any[];
  dataKey: string;
  title: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({ data, dataKey, title }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-green-800">
      <h3 className="text-white text-2xl mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              interval={0} // Ensure all labels are displayed
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
            />
            <Bar
              dataKey={dataKey}
              fill="#059669"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
