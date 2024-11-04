import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCardProps {
  title: string;
  score: number;
  change: number;
  icon: React.ReactNode;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, change, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-6 rounded-xl border border-green-800"
    >
      <div className="flex items-center justify-between">
        <div className="text-green-500">{icon}</div>
        <div className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-white text-lg mt-4">{title}</h3>
      <div className="flex items-end mt-2">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-green-500 ml-2">/100</span>
      </div>
    </motion.div>
  );
};