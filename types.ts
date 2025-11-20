export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL'
}

export interface ReviewAnalysis {
  originalText: string;
  sentiment: Sentiment;
  summary: string;
  keywords: string[];
}

export interface AnalysisResult {
  totalReviews: number;
  sentimentCounts: {
    positive: number;
    negative: number;
    neutral: number;
  };
  frequentComplaints: string[];
  frequentPraises: string[];
  reviews: ReviewAnalysis[];
}
