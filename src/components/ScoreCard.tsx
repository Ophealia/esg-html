import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCardProps {
  title: string;
  score: number;
  change: number;
  icon: React.ReactNode;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-6 rounded-xl border-2 border-green-800"
    >
      <div className="flex items-center justify-between">
        <div className="text-green-500">{icon}</div>
      </div>
      <h3 className="text-white text-2xl font-bold mt-4">{title}</h3>
      <div className="flex items-end mt-2">
        <span className="text-4xl font-bold text-custom-green">{score}</span>
        <span className="text-white ml-2">/10</span>
      </div>
    </motion.div>
  );
};