import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ReadingType } from '../types';
import * as Icons from 'lucide-react';

interface HomeProps {
  onSelect: (type: ReadingType) => void;
}

export default function Home({ onSelect }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif text-amber-400 mb-6 tracking-tight">
          Aura Mystic
        </h1>
        <p className="text-lg text-indigo-200 max-w-2xl mx-auto font-light leading-relaxed">
          Khám phá bản thân và vận mệnh qua các hệ thống huyền học cổ xưa và hiện đại.
          Hãy chọn một cánh cửa để bắt đầu hành trình của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category, index) => {
          const IconComponent = (Icons as any)[category.icon];
          return (
            <motion.button
              key={category.id}
              onClick={() => onSelect(category.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-left overflow-hidden hover:border-amber-400/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-indigo-950/80 flex items-center justify-center mb-6 border border-indigo-500/30 group-hover:border-amber-400/50 transition-colors">
                  {IconComponent && <IconComponent className="w-6 h-6 text-amber-400" />}
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-amber-300 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
