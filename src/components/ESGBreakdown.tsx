import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#059669', '#047857', '#065f46'];

interface ESGBreakdownProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const ESGBreakdown: React.FC<ESGBreakdownProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-green-800">
      <h3 className="text-white text-lg mb-4">ESG Score Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};