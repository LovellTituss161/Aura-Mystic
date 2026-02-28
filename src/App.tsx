import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ReadingType, UserInput } from './types';
import { generateReading } from './services/gemini';
import Home from './components/Home';
import ReadingForm from './components/ReadingForm';
import ReadingResult from './components/ReadingResult';
import Footer from './components/Footer';

export default function App() {
  const [step, setStep] = useState<'home' | 'form' | 'result'>('home');
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSelectType = (type: ReadingType) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleBackToHome = () => {
    setStep('home');
    setSelectedType(null);
    setResult(null);
  };

  const handleBackToForm = () => {
    setStep('form');
    setResult(null);
  };

  const handleSubmitForm = async (input: UserInput) => {
    if (!selectedType) return;
    setIsLoading(true);
    try {
      const readingResult = await generateReading(selectedType, input);
      setResult(readingResult);
      setStep('result');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-400/30 selection:text-amber-200 flex flex-col relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="flex-grow relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {step === 'home' && <Home key="home" onSelect={handleSelectType} />}
          {step === 'form' && selectedType && (
            <ReadingForm
              key="form"
              type={selectedType}
              onBack={handleBackToHome}
              onSubmit={handleSubmitForm}
              isLoading={isLoading}
            />
          )}
          {step === 'result' && selectedType && result && (
            <ReadingResult
              key="result"
              type={selectedType}
              result={result}
              onBack={handleBackToForm}
              onReset={handleBackToHome}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
