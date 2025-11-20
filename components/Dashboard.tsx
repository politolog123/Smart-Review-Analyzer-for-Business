import React, { useMemo } from 'react';
import { AnalysisResult } from '../types';
import { ReviewList } from './ReviewList';
import { Charts } from './Charts';
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  
  const total = result.totalReviews;
  const posPct = total ? Math.round((result.sentimentCounts.positive / total) * 100) : 0;
  const negPct = total ? Math.round((result.sentimentCounts.negative / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-colors"
        >
          <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200 group-hover:border-brand-200 group-hover:bg-brand-50 transition-all">
            <ArrowLeft size={18} />
          </div>
          Back to Input
        </button>
        <div className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
          Analyzed {result.totalReviews} review{result.totalReviews !== 1 ? 's' : ''}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-50 rounded-full z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-green-700 font-medium">
              <ThumbsUp size={20} /> Positive
            </div>
            <div className="text-4xl font-bold text-slate-800">{result.sentimentCounts.positive}</div>
            <div className="text-sm text-green-600 mt-1">{posPct}% of total</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-50 rounded-full z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-red-700 font-medium">
              <ThumbsDown size={20} /> Negative
            </div>
            <div className="text-4xl font-bold text-slate-800">{result.sentimentCounts.negative}</div>
            <div className="text-sm text-red-600 mt-1">{negPct}% of total</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-slate-600 font-medium">
              <Minus size={20} /> Neutral
            </div>
            <div className="text-4xl font-bold text-slate-800">{result.sentimentCounts.neutral}</div>
            <div className="text-sm text-slate-500 mt-1">Balanced views</div>
          </div>
        </div>
      </div>

      {/* Top Insights & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Charts sentimentCounts={result.sentimentCounts} />
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-red-500 rounded-full"></span>
              Frequent Complaints
            </h3>
            {result.frequentComplaints.length > 0 ? (
               <ul className="space-y-3">
                {result.frequentComplaints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 bg-red-50/50 p-3 rounded-lg border border-red-100/50">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No major complaints detected.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-green-500 rounded-full"></span>
              Frequent Praises
            </h3>
             {result.frequentPraises.length > 0 ? (
              <ul className="space-y-3">
                {result.frequentPraises.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                     <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
             ) : (
               <p className="text-slate-500 italic">No major praises detected.</p>
             )}
          </div>
        </div>
      </div>

      {/* Detailed List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Detailed Analysis</h3>
        </div>
        <ReviewList reviews={result.reviews} />
      </div>
    </div>
  );
};
