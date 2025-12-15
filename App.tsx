import React, { useState } from 'react';
import { LESSONS } from './data';
import { LessonId } from './types';
import LessonView from './components/LessonView';
import ExerciseView from './components/ExerciseView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<LessonId>('16');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems: { id: LessonId; label: string; icon: string }[] = [
    { id: '16', label: '16. Know / Learn', icon: '🧠' },
    { id: '17', label: '17. Travel / Go', icon: '✈️' },
    { id: '18', label: '18. Try / Begin', icon: '🚀' },
    { id: '19', label: '19. Modal Should', icon: '⚖️' },
    { id: '20', label: '20. Would Like', icon: '🍽️' },
    { id: 'exercises', label: 'Exercises', icon: '🎯' },
  ];

  const handleNavClick = (id: LessonId) => {
    setCurrentView(id);
    setIsSidebarOpen(false); // Close mobile sidebar on select
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <h1 className="text-xl font-extrabold text-indigo-600 tracking-tight">English Master</h1>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${currentView === item.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
            Pack 4 &copy; 2024
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar for Mobile */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-10 shrink-0">
          <span className="font-bold text-slate-700">
             {menuItems.find(i => i.id === currentView)?.label}
          </span>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           {currentView === 'exercises' ? (
             <ExerciseView />
           ) : (
             <LessonView lesson={LESSONS[currentView]} />
           )}
           <div className="h-12"></div> {/* Bottom spacer */}
        </div>
      </main>
    </div>
  );
};

export default App;
