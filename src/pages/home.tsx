import React, { useState } from 'react';
import Head from 'next/head';
import ChatInterface from '@/components/ChatInterface';
import SportsResults from '@/components/SportsResults';
import GroupsPanel from '@/components/GroupsPanel';
import SocialLeaderboard from '@/components/SocialLeaderboard';
import ClansPanel from '@/components/ClansPanel';
import LiveFeed from '@/components/LiveFeed';
import Assistance from '@/components/Assistance';
import { PanelType } from '@/types';
import { useTheme } from '@/context/ThemeContext';

const Home: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelType>('home');
  const { theme, toggleTheme } = useTheme();

  const navigateTo = (panel: PanelType) => {
    setActivePanel(panel);
  };

  // Common back button component to avoid repetition
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button 
        onClick={() => navigateTo('home')} 
        className="bg-background-darker text-text-primary p-2 rounded-full shadow-md hover:bg-opacity-80 transition-colors"
      >
        ← Back
      </button>
    </div>
  );
  
  // Theme Toggle Button Component
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 bg-background-darker p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-text-light relative">
      <Head>
        <title>HoopStack App</title>
        <meta name="description" content="Your social fantasy sports experience" />
      </Head>
      
      {/* Always render the theme toggle button on the home screen base layer */}
      {activePanel === 'home' && <ThemeToggleButton />}

      {activePanel === 'home' && (
        <div className="flex flex-col h-screen">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-1 text-text-primary">Game Night</h1>
                <p className="text-base text-text-light opacity-80">Monday, February 12</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-light bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-10 py-1 px-2 rounded-full">
                  8 Friends Online
                </span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background-dark text-xs font-bold text-white">JD</div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-dark text-xs font-bold text-white">TK</div>
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background-dark text-xs font-bold text-white">+6</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 rounded-custom p-4 shadow-sm border border-white border-opacity-5 dark:border-black dark:border-opacity-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-primary">Tonight's Game Night</h3>
                  <span className="bg-notification px-2 py-1 rounded-full text-xs font-semibold text-white">LIVE</span>
                </div>
                <p className="text-sm text-text-light mb-4">NBA All-Stars Showdown • 8 Friends Playing</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      <span>🏀</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Monday Night Hoopers</p>
                      <p className="text-xs text-text-light opacity-80">Your clan is watching</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigateTo('live')} 
                    className="bg-primary hover:bg-primary-light text-white text-sm font-semibold py-2 px-4 rounded-custom transition-colors"
                  >
                    Join Stream
                  </button>
                </div>
              </div>

              <div className="flex items-center bg-white bg-opacity-5 dark:bg-black dark:bg-opacity-10 rounded-custom p-4 gap-4 shadow-sm border border-white border-opacity-5 dark:border-black dark:border-opacity-5">
                <div className="w-10 h-10 rounded-full bg-notification flex items-center justify-center text-2xl">
                  <span>🔥</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1 text-text-primary">New Taunt from StatGuru</h3>
                  <p className="text-sm text-text-light opacity-80">"My lineup is crushing yours tonight! 🏆"</p>
                </div>
                <button 
                  onClick={() => navigateTo('chat')} 
                  className="bg-accent hover:bg-opacity-80 text-white text-xs font-semibold py-1 px-3 rounded-full transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>

            {/* Navigation Grid - Updated to include Assistance */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[ 
                { panel: 'groups', icon: '👥', label: 'Friend Groups', color: 'primary' },
                { panel: 'clans', icon: '🛡️', label: 'Clans', color: 'secondary' },
                { panel: 'chat', icon: '💬', label: 'Game Chat', color: 'accent' },
                { panel: 'leaderboard', icon: '🏆', label: 'Leaderboard', color: 'notification' },
                { panel: 'results', icon: '📊', label: 'Results', color: 'success' },
                { panel: 'assistance', icon: '❓', label: 'Help', color: 'primary-light' } // Added Assistance
              ].map(item => (
                <button 
                  key={item.panel}
                  onClick={() => navigateTo(item.panel as PanelType)} 
                  className={`bg-[var(--${item.color})] hover:opacity-80 text-white p-4 rounded-custom flex flex-col items-center justify-center transition-opacity shadow-md aspect-square`}
                  style={{ backgroundColor: `var(--${item.color})` }}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-sm font-bold text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Panel Rendering (Groups, Chat, Results, etc.) */}
      {activePanel !== 'home' && (
        <div className="absolute inset-0 z-20 bg-background-dark">
          <BackButton />
          {/* Render the active panel component */}
          {activePanel === 'groups' && <GroupsPanel onJoinGroup={() => navigateTo('chat')} />}
          {activePanel === 'chat' && (
            <>
              <ChatInterface />
              {/* Button to navigate to results from chat */}
              <button 
                onClick={() => navigateTo('results')} 
                className="absolute bottom-6 right-6 z-30 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-light transition-colors"
              >
                📊
              </button>
            </>
          )}
          {activePanel === 'results' && (
            <>
              <SportsResults />
              {/* Button to navigate to leaderboard from results */}
              <button 
                onClick={() => navigateTo('leaderboard')} 
                className="absolute top-4 right-4 z-30 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-light transition-colors"
              >
                🏆
              </button>
            </>
          )}
          {activePanel === 'leaderboard' && <SocialLeaderboard />}
          {activePanel === 'clans' && <ClansPanel />}
          {activePanel === 'live' && <LiveFeed />}
          {activePanel === 'assistance' && <Assistance />}
        </div>
      )}
    </div>
  );
};

export default Home;