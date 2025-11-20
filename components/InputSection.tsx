import React, { useState, useRef, ChangeEvent } from 'react';
import { UploadCloud, Play, FileText, X } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (text: string) => void;
  error: string | null;
}

const SAMPLE_DATA = `The product quality is amazing, I love the sleek design!
Shipping was terrible, it arrived 3 days late and the box was crushed.
Customer support was helpful but the wait time was too long.
Best purchase I've made this year, highly recommended.
The battery life is not as advertised, very disappointing.
Easy to set up and use right out of the box.
The price is a bit high for what you get.
I'm neutral about this, it does the job but nothing special.`;

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, error }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setText(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setText(SAMPLE_DATA);
  };

  const handleClear = () => {
    setText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <FileText size={20} className="text-brand-600" />
          Input Reviews
        </h3>
        <div className="flex gap-2">
           <button
            onClick={handleLoadSample}
            className="text-xs font-medium text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-md transition-colors border border-brand-200"
          >
            Load Sample Data
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-medium text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors border border-slate-300 flex items-center gap-1.5"
          >
            <UploadCloud size={14} />
            Upload .txt
          </button>
          <input
            type="file"
            accept=".txt"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste reviews here (one per line works best)..."
            className="w-full h-64 p-4 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none resize-none text-slate-700 placeholder:text-slate-400 bg-slate-50/50 font-mono text-sm leading-relaxed transition-all"
          />
          {text && (
             <button 
                onClick={handleClear}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm border border-slate-200 transition-all"
                title="Clear text"
             >
                <X size={16} />
             </button>
          )}
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <span className="font-bold block">Error:</span> {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onAnalyze(text)}
            disabled={!text.trim()}
            className="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Play size={18} fill="currentColor" />
            Analyze Reviews
          </button>
        </div>
      </div>
    </div>
  );
};
