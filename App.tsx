import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { Dashboard } from './components/Dashboard';
import { analyzeReviews } from './services/geminiService';
import { AnalysisResult } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError("Please enter some reviews or upload a file.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // We add a small delay to ensure UI updates before heavy async work if any
      const analysis = await analyzeReviews(text);
      setResult(analysis);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred while analyzing reviews.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {!result && !isAnalyzing && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Understand Your Customers</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Paste customer reviews or upload a text file. Our AI will analyze sentiment, 
                extract key topics, and summarize feedback instantly.
              </p>
            </div>
            <InputSection onAnalyze={handleAnalyze} error={error} />
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-16 h-16 text-brand-600 animate-spin mb-6" />
            <h3 className="text-xl font-semibold text-slate-800">Analyzing Reviews...</h3>
            <p className="text-slate-500 mt-2">Consulting the AI model for insights.</p>
          </div>
        )}

        {result && (
          <div className="animate-fade-in-up">
            <Dashboard result={result} onReset={handleReset} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ReviewPulse. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;