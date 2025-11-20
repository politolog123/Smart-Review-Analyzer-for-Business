import React, { useState } from 'react';
import { ReviewAnalysis, Sentiment } from '../types';
import { BadgeCheck, AlertCircle, HelpCircle, Filter } from 'lucide-react';

interface ReviewListProps {
  reviews: ReviewAnalysis[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [filter, setFilter] = useState<'ALL' | Sentiment>('ALL');

  const filteredReviews = reviews.filter(
    (r) => filter === 'ALL' || r.sentiment === filter
  );

  const getSentimentIcon = (sentiment: Sentiment) => {
    switch (sentiment) {
      case Sentiment.POSITIVE: return <BadgeCheck className="text-green-500" size={20} />;
      case Sentiment.NEGATIVE: return <AlertCircle className="text-red-500" size={20} />;
      case Sentiment.NEUTRAL: return <HelpCircle className="text-slate-400" size={20} />;
    }
  };

  const getSentimentBadgeClass = (sentiment: Sentiment) => {
    switch (sentiment) {
      case Sentiment.POSITIVE: return "bg-green-50 text-green-700 border-green-200";
      case Sentiment.NEGATIVE: return "bg-red-50 text-red-700 border-red-200";
      case Sentiment.NEUTRAL: return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
          <Filter size={16} />
          Filter:
        </div>
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            filter === 'ALL' 
              ? 'bg-brand-100 text-brand-700 border-brand-200' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilter(Sentiment.POSITIVE)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            filter === Sentiment.POSITIVE
              ? 'bg-green-100 text-green-800 border-green-200'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Positive
        </button>
        <button
          onClick={() => setFilter(Sentiment.NEGATIVE)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            filter === Sentiment.NEGATIVE
              ? 'bg-red-100 text-red-800 border-red-200'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Negative
        </button>
        <button
          onClick={() => setFilter(Sentiment.NEUTRAL)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            filter === Sentiment.NEUTRAL
              ? 'bg-slate-200 text-slate-800 border-slate-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Neutral
        </button>
      </div>

      {/* List */}
      <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100">
        {filteredReviews.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No reviews found for this filter.
          </div>
        ) : (
          filteredReviews.map((review, idx) => (
            <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${getSentimentBadgeClass(review.sentiment)}`}>
                  {getSentimentIcon(review.sentiment)}
                  {review.sentiment}
                </div>
              </div>
              
              <p className="text-slate-800 text-base mb-3 leading-relaxed">"{review.originalText}"</p>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Summary</span>
                <p className="text-slate-700 text-sm">{review.summary}</p>
              </div>

              {review.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {review.keywords.map((keyword, kIdx) => (
                    <span key={kIdx} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md">
                      #{keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
