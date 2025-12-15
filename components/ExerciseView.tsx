import React, { useState, useEffect } from 'react';
import { EXERCISES } from '../data';
import { Exercise, ExerciseType } from '../types';
import AudioButton from './AudioButton';

const ExerciseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExerciseType>('order');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  
  // Filter exercises based on active tab
  const filteredExercises = EXERCISES.filter(ex => ex.type === activeTab);
  const currentExercise = filteredExercises[currentIndex];

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const handleNext = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const markCompleted = () => {
    if (currentExercise && !completed.includes(currentExercise.id)) {
      setCompleted([...completed, currentExercise.id]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header and Tabs */}
      <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Practice Exercises</h2>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 ${
              activeTab === 'order' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            🧩 Put in Order
          </button>
          <button
            onClick={() => setActiveTab('complete')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 ${
              activeTab === 'complete' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            ✍️ Complete
          </button>
        </div>

        {/* Progress */}
        <p className="text-slate-500 mt-2 font-medium">
          Question {currentIndex + 1} of {filteredExercises.length}
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: filteredExercises.length ? `${((currentIndex + 1) / filteredExercises.length) * 100}%` : '0%' }}
          ></div>
        </div>
      </header>

      {/* Exercise Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 min-h-[400px] flex flex-col justify-center">
        {filteredExercises.length > 0 ? (
          activeTab === 'order' ? (
            <OrderExercise 
              key={currentExercise.id} 
              exercise={currentExercise} 
              onSuccess={markCompleted} 
            />
          ) : (
            <CompleteExercise 
              key={currentExercise.id} 
              exercise={currentExercise} 
              onSuccess={markCompleted}
            />
          )
        ) : (
          <div className="text-center text-slate-500 py-10">
            <p className="text-lg">No exercises available for this section.</p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-xl text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= filteredExercises.length - 1}
          className="px-6 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- Order Exercise Component ---
const OrderExercise: React.FC<{ exercise: Exercise; onSuccess: () => void }> = ({ exercise, onSuccess }) => {
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(exercise.scrambled || []);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Reset state when exercise changes
  useEffect(() => {
    setUserOrder([]);
    setAvailableWords(exercise.scrambled || []);
    setStatus('idle');
  }, [exercise]);

  const handleWordClick = (word: string, index: number) => {
    if (status === 'correct') return;
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setUserOrder([...userOrder, word]);
    setStatus('idle');
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (status === 'correct') return;
    const newUserOrder = [...userOrder];
    newUserOrder.splice(index, 1);
    setUserOrder(newUserOrder);
    setAvailableWords([...availableWords, word]);
    setStatus('idle');
  };

  const checkAnswer = () => {
    const userAnswer = userOrder.join(' ');
    const cleanQuestion = exercise.question.replace(/[.,?!;:]/g, '').trim().toLowerCase().replace(/\s+/g, ' ');
    const cleanUser = userAnswer.replace(/[.,?!;:]/g, '').trim().toLowerCase().replace(/\s+/g, ' ');
    
    if (cleanQuestion === cleanUser) {
        setStatus('correct');
        onSuccess();
    } else {
        setStatus('incorrect');
    }
  };

  const reset = () => {
    setUserOrder([]);
    setAvailableWords(exercise.scrambled || []);
    setStatus('idle');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wide">
          Put in Order
        </span>
        <h3 className="text-xl font-medium text-slate-700">Arrange the words to form a correct sentence.</h3>
      </div>

      <div className={`min-h-[80px] p-4 rounded-xl border-2 flex flex-wrap gap-2 items-center justify-center transition-all duration-300 ${
        status === 'correct' ? 'border-emerald-200 bg-emerald-50' : 
        status === 'incorrect' ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50'
      }`}>
        {userOrder.length === 0 && <span className="text-slate-400 italic">Tap words below...</span>}
        {userOrder.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => handleRemoveWord(word, idx)}
            className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      {status === 'incorrect' && (
        <div className="text-center text-rose-600 font-medium animate-shake">
          Incorrect order. Try again!
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
        {availableWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => handleWordClick(word, idx)}
            className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100 font-medium text-indigo-700 hover:bg-indigo-100 hover:scale-105 transition-all active:scale-95"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button 
          onClick={reset}
          className="px-6 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={checkAnswer}
          disabled={userOrder.length === 0 || status === 'correct'}
          className={`px-8 py-2 rounded-xl font-bold text-white shadow-md transition-all ${
            status === 'correct' ? 'bg-emerald-500' : 
            status === 'incorrect' ? 'bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {status === 'correct' ? 'Correct! ✅' : status === 'incorrect' ? 'Try Again ❌' : 'Check'}
        </button>
      </div>
      
       {status === 'correct' && (
          <div className="flex flex-col items-center animate-fade-in mt-4 gap-2">
             <p className="text-emerald-700 font-medium">Excellent! Listen to the sentence:</p>
             <AudioButton text={exercise.question} label="Play Audio" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200" />
          </div>
       )}
    </div>
  );
};

// --- Complete Sentence Exercise Component ---
const CompleteExercise: React.FC<{ exercise: Exercise; onSuccess: () => void }> = ({ exercise, onSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  useEffect(() => {
    setSelectedOption(null);
    setStatus('idle');
  }, [exercise]);

  const checkAnswer = () => {
    if (!selectedOption) return;
    
    if (selectedOption === exercise.correctAnswer) {
      setStatus('correct');
      onSuccess();
    } else {
      setStatus('incorrect');
    }
  };

  // Render question text, replacing '_____' with the selected answer or a blank line
  const renderQuestion = () => {
    const parts = exercise.question.split('_____');
    if (parts.length === 1) return exercise.question;

    return (
      <span className="text-2xl font-bold text-slate-800 leading-relaxed">
        {parts[0]}
        <span className={`inline-block border-b-2 px-2 min-w-[80px] text-center transition-colors ${
          status === 'correct' ? 'border-emerald-500 text-emerald-600' : 
          status === 'incorrect' ? 'border-rose-500 text-rose-600' : 'border-slate-400 text-indigo-600'
        }`}>
          {selectedOption || '_____'}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wide">
          Complete the Sentence
        </span>
        <h3 className="text-xl font-medium text-slate-700">Select the correct word to complete the sentence.</h3>
      </div>

      <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center min-h-[120px] flex items-center justify-center">
         {renderQuestion()}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mx-auto">
        {exercise.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (status !== 'correct') {
                setSelectedOption(option);
                setStatus('idle');
              }
            }}
            disabled={status === 'correct'}
            className={`py-3 px-4 rounded-xl font-medium text-lg border-2 transition-all ${
              selectedOption === option
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
            } disabled:opacity-70`}
          >
            {option}
          </button>
        ))}
      </div>

      {status === 'incorrect' && (
        <div className="text-center text-rose-600 font-medium animate-shake">
          Incorrect. Try again!
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button 
          onClick={checkAnswer}
          disabled={!selectedOption || status === 'correct'}
          className={`px-10 py-3 rounded-xl font-bold text-white shadow-md text-lg transition-all transform active:scale-95 ${
            status === 'correct' ? 'bg-emerald-500' : 
            status === 'incorrect' ? 'bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
          }`}
        >
          {status === 'correct' ? 'Correct! ✅' : status === 'incorrect' ? 'Try Again ❌' : 'Check'}
        </button>
      </div>

      {status === 'correct' && (
         <div className="flex flex-col items-center animate-fade-in mt-4 gap-2">
            <p className="text-emerald-700 font-medium">Perfect! Listen to the full sentence:</p>
            {/* Construct full sentence for audio */}
            <AudioButton 
              text={exercise.question.replace('_____', exercise.correctAnswer || '')} 
              label="Play Audio" 
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
            />
         </div>
      )}
    </div>
  );
};

export default ExerciseView;
