import React, { useState, useEffect, useRef } from 'react';
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
            onClick={() => setActiveTab('speaking')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 ${
              activeTab === 'speaking' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            🎤 Pronunciation
          </button>
        </div>

        {/* Progress */}
        <p className="text-slate-500 mt-2 font-medium">
          Question {currentIndex + 1} of {filteredExercises.length}
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredExercises.length) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Exercise Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 min-h-[400px] flex flex-col justify-center">
        {currentExercise ? (
          activeTab === 'order' ? (
            <OrderExercise 
              key={currentExercise.id} 
              exercise={currentExercise} 
              onSuccess={markCompleted} 
            />
          ) : (
            <SpeakingExercise 
              key={currentExercise.id} 
              exercise={currentExercise} 
              onSuccess={markCompleted}
            />
          )
        ) : (
          <div className="text-center text-slate-500">
            No exercises found for this category.
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
          disabled={currentIndex === filteredExercises.length - 1}
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
    // Validation: remove punctuation and case-insensitive check
    const cleanQuestion = exercise.question.replace(/[.,?!]/g, '').trim().toLowerCase();
    const cleanUser = userAnswer.replace(/[.,?!]/g, '').trim().toLowerCase();
    
    // Strict punctuation check fallback?
    // Let's stick to content matching.
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

      {/* Answer Area */}
      <div className={`min-h-[80px] p-4 rounded-xl border-2 flex flex-wrap gap-2 items-center justify-center transition-all duration-300 ${
        status === 'correct' ? 'border-emerald-200 bg-emerald-50' : 
        status === 'incorrect' ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50'
      }`}>
        {userOrder.length === 0 && <span className="text-slate-400 italic">Tap words below to build sentence...</span>}
        {userOrder.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => handleRemoveWord(word, idx)}
            className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors animate-pop-in"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Feedback Message */}
      {status === 'incorrect' && (
        <div className="text-center text-rose-600 font-medium animate-shake">
          Incorrect order. Try again!
        </div>
      )}

      {/* Word Bank */}
      <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
        {availableWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => handleWordClick(word, idx)}
            className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100 font-medium text-indigo-700 hover:bg-indigo-100 hover:scale-105 transition-all active:scale-95 animate-pop-in"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Controls */}
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
          className={`px-8 py-2 rounded-xl font-bold text-white shadow-md transition-all transform active:scale-95 ${
            status === 'correct' ? 'bg-emerald-500' : 
            status === 'incorrect' ? 'bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
          }`}
        >
          {status === 'correct' ? 'Correct! ✅' : status === 'incorrect' ? 'Try Again ❌' : 'Check'}
        </button>
      </div>
      
       {/* Audio Hint only after success */}
       {status === 'correct' && (
          <div className="flex flex-col items-center animate-fade-in mt-4 gap-2">
             <p className="text-emerald-700 font-medium">Great job! Listen to the pronunciation:</p>
             <AudioButton text={exercise.question} label="Play Audio" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200" />
          </div>
       )}
    </div>
  );
};

// --- Speaking Exercise Component ---

const SpeakingExercise: React.FC<{ exercise: Exercise; onSuccess: () => void }> = ({ exercise, onSuccess }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'correct' | 'incorrect'>('idle');
  const [browserSupport, setBrowserSupport] = useState(true);

  // Use refs for recognition instance to avoid re-creation
  const recognitionRef = useRef<any>(null);

  // Reset state on exercise change
  useEffect(() => {
    setTranscript('');
    setStatus('idle');
    setIsListening(false);
  }, [exercise]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setStatus('listening');
        };

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          validateSpeech(text);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          // Only reset if we were actively listening, otherwise it might be a silent error
          if (status === 'listening') {
             setStatus('idle');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (status === 'listening') { 
              setStatus('idle'); 
          }
        };

        recognitionRef.current = recognition;
      } else {
        setBrowserSupport(false);
      }
    }
  }, [exercise.id]);

  const toggleListening = () => {
    if (!browserSupport) return;
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setStatus('listening');
      recognitionRef.current?.start();
    }
  };

  const validateSpeech = (spokenText: string) => {
    setStatus('processing');
    const cleanSpoken = spokenText.toLowerCase().replace(/[.,?!]/g, '').trim();
    const cleanTarget = exercise.question.toLowerCase().replace(/[.,?!]/g, '').trim();

    if (cleanSpoken === cleanTarget) {
      setStatus('correct');
      onSuccess();
    } else {
      setStatus('incorrect');
    }
  };

  if (!browserSupport) {
      return (
          <div className="flex flex-col items-center justify-center p-8 bg-amber-50 rounded-xl text-amber-800 border border-amber-200 text-center space-y-4">
              <span className="text-4xl">⚠️</span>
              <h3 className="font-bold text-lg">Microphone Not Supported</h3>
              <p>Your browser doesn't support speech recognition.</p>
              <p className="text-sm">Please try using Google Chrome, Edge, or Safari.</p>
          </div>
      )
  }

  return (
    <div className="space-y-8 flex flex-col items-center animate-fade-in">
       <div className="text-center space-y-2">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wide">
          Speaking Practice
        </span>
        <h3 className="text-xl font-medium text-slate-700">Read and record the sentence below.</h3>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center w-full transition-shadow hover:shadow-md">
         <div className="flex flex-col items-center gap-3">
             <p className="text-2xl font-bold text-slate-800">{exercise.question}</p>
             <AudioButton text={exercise.question} label="Listen first" size="sm" />
         </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggleListening}
          disabled={status === 'correct'}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isListening ? 'bg-rose-500 animate-pulse ring-4 ring-rose-200' : 
            status === 'correct' ? 'bg-emerald-500 ring-4 ring-emerald-200' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 focus:ring-indigo-200'
          }`}
        >
          {status === 'correct' ? (
              <span className="text-4xl">✅</span>
          ) : (
            <svg className={`w-10 h-10 text-white ${isListening ? 'animate-bounce' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
        <div className="text-center h-8">
            <p className={`text-sm font-bold transition-colors ${
                isListening ? 'text-rose-500' : 
                status === 'correct' ? 'text-emerald-600' : 
                status === 'incorrect' ? 'text-rose-600' : 'text-slate-500'
            }`}>
                {isListening ? 'Listening...' : 
                 status === 'correct' ? 'Perfect Pronunciation!' : 
                 status === 'incorrect' ? 'Not quite right. Try again!' : 
                 'Tap microphone to speak'}
            </p>
        </div>
      </div>

      {transcript && (
          <div className={`w-full p-4 rounded-xl border text-center transition-colors animate-fade-in ${
              status === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 
              status === 'incorrect' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50'
          }`}>
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">You said:</p>
              <p className="text-lg font-medium">"{transcript}"</p>
          </div>
      )}
    </div>
  );
};

export default ExerciseView;
