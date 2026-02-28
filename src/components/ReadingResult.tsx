import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { CATEGORIES } from '../constants';
import { ReadingType } from '../types';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ReadingResultProps {
  type: ReadingType;
  result: string;
  onBack: () => void;
  onReset: () => void;
}

export default function ReadingResult({ type, result, onBack, onReset }: ReadingResultProps) {
  const category = CATEGORIES.find((c) => c.id === type);

  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={onBack}
          className="flex items-center text-indigo-300 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </button>
        <button
          onClick={onReset}
          className="flex items-center text-indigo-300 hover:text-amber-400 transition-colors group"
        >
          <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Xem môn khác
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500" />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mb-4 tracking-wide">
            Kết Quả {category.title}
          </h2>
          <div className="w-24 h-1 bg-indigo-500/30 mx-auto rounded-full" />
        </div>

        <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-serif prose-headings:text-amber-300 prose-a:text-indigo-400 prose-strong:text-amber-200 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300">
          <Markdown>{result}</Markdown>
        </div>
      </div>
    </motion.div>
  );
}
