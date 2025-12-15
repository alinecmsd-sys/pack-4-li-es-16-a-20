import React from 'react';
import { LessonData } from '../types';
import AudioButton from './AudioButton';

interface LessonViewProps {
  lesson: LessonData;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{lesson.title}</h2>
          <p className="text-lg text-slate-500 font-medium">{lesson.subtitle}</p>
        </div>
      </header>

      {/* Vocabulary Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-indigo-600 mb-6 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-lg">📝</span>
          Vocabulary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lesson.vocabulary.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-slate-100"
            >
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">{item.word}</span>
                <span className="text-sm text-slate-500">{item.translation}</span>
              </div>
              <AudioButton text={item.word} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Phrases Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-emerald-600 mb-6 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 text-lg">💬</span>
          Phrases
        </h3>
        <div className="space-y-3">
          {lesson.phrases.map((phrase, idx) => (
            <div 
              key={idx}
              className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-100"
            >
              <div className="flex flex-col">
                <span className="text-lg text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                  {phrase.text}
                </span>
                <span className="text-sm text-slate-500 mt-1">
                  {phrase.translation}
                </span>
              </div>
              <AudioButton text={phrase.text} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LessonView;