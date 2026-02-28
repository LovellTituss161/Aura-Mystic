import { useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ReadingType, UserInput } from '../types';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ReadingFormProps {
  type: ReadingType;
  onBack: () => void;
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

export default function ReadingForm({ type, onBack, onSubmit, isLoading }: ReadingFormProps) {
  const category = CATEGORIES.find((c) => c.id === type);
  const [formData, setFormData] = useState<UserInput>({});

  if (!category) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: string) => {
    switch (field) {
      case 'fullName':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Họ và Tên</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName || ''}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              placeholder="Nhập họ và tên đầy đủ..."
            />
          </div>
        );
      case 'dob':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Ngày Tháng Năm Sinh</label>
            <input
              type="date"
              name="dob"
              required
              value={formData.dob || ''}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all [color-scheme:dark]"
            />
          </div>
        );
      case 'tob':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Giờ Sinh (Nếu biết)</label>
            <input
              type="time"
              name="tob"
              value={formData.tob || ''}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all [color-scheme:dark]"
            />
          </div>
        );
      case 'pob':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Nơi Sinh</label>
            <input
              type="text"
              name="pob"
              required
              value={formData.pob || ''}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              placeholder="Thành phố, Tỉnh, Quốc gia..."
            />
          </div>
        );
      case 'gender':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Giới Tính</label>
            <select
              name="gender"
              required
              value={formData.gender || ''}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all appearance-none"
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        );
      case 'question':
        return (
          <div key={field} className="mb-6">
            <label className="block text-sm font-medium text-indigo-200 mb-2">Câu Hỏi / Vấn Đề Quan Tâm</label>
            <textarea
              name="question"
              required
              value={formData.question || ''}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-900/50 border border-indigo-500/30 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all resize-none"
              placeholder="Hãy tập trung vào vấn đề bạn muốn hỏi..."
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-4 py-12"
    >
      <button
        onClick={onBack}
        className="flex items-center text-indigo-300 hover:text-amber-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Quay lại chọn môn khác
      </button>

      <div className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-400 mb-4">
            {category.title}
          </h2>
          <p className="text-indigo-200/80 font-light">
            Vui lòng cung cấp thông tin để chúng tôi có thể kết nối với năng lượng của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {category.requiredFields.map(renderField)}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                Đang kết nối vũ trụ...
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-amber-300" />
                Bắt đầu xem
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
