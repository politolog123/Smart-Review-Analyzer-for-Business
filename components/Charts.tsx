import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ChartsProps {
  sentimentCounts: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const Charts: React.FC<ChartsProps> = ({ sentimentCounts }) => {
  const data = [
    { name: 'Positive', value: sentimentCounts.positive, color: '#22c55e' }, // green-500
    { name: 'Negative', value: sentimentCounts.negative, color: '#ef4444' }, // red-500
    { name: 'Neutral', value: sentimentCounts.neutral, color: '#94a3b8' },   // slate-400
  ];

  // Filter out zero values to look cleaner
  const activeData = data.filter(d => d.value > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-slate-800 w-full mb-2">Sentiment Distribution</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {activeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#334155', fontWeight: 600 }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
