import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award, FileCheck, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';


interface GovernanceMetricsProps {
  company: string;
}

interface boardCompositionData {
  name: string;
  value: number;
}

const boardCompositionData = [
  { name: 'Independent', value: 65 },
  { name: 'Executive', value: 25 },
  { name: 'Non-Executive', value: 10 },
];

const managementDiversityData = [
  { position: 'C-Suite', female: 35, male: 65 },
  { position: 'SVP', female: 40, male: 60 },
  { position: 'VP', female: 45, male: 55 },
  { position: 'Director', female: 48, male: 52 },
  { position: 'Manager', female: 50, male: 50 },
];

const certificationData = [
  { name: 'ISO 27001', value: 95 },
  { name: 'ISO 14001', value: 90 },
  { name: 'ISO 9001', value: 100 },
  { name: 'ISO 45001', value: 85 },
];

const frameworkAlignmentData = [
  { framework: 'GRI', compliance: 95 },
  { framework: 'SASB', compliance: 90 },
  { framework: 'TCFD', compliance: 85 },
  { framework: 'SDGs', compliance: 88 },
];

const COLORS = ['#059669', '#0ea5e9', '#6366f1'];

export const GovernanceMetrics: React.FC<GovernanceMetricsProps> = ({ company })  => {
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
            <h3 className="text-lg font-semibold">Board Composition</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={boardCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {boardCompositionData.map((entry, index) => (
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
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            {boardCompositionData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Management Diversity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Users className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Management Diversity</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={managementDiversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="position" stroke="#9ca3af" />
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

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Award className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Certifications</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={certificationData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="name" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar name="Compliance" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.6} />
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

        {/* Framework Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-xl border border-green-800"
        >
          <div className="flex items-center mb-4">
            <Shield className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Framework Alignment</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frameworkAlignmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="framework" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="compliance" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};