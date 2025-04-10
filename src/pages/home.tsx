import React, { useState } from 'react';
import Head from 'next/head';
import ChatInterface from '@/components/ChatInterface';
import SportsResults from '@/components/SportsResults';
import GroupsPanel from '@/components/GroupsPanel';
import SocialLeaderboard from '@/components/SocialLeaderboard';
import ClansPanel from '@/components/ClansPanel';
import LiveFeed from '@/components/LiveFeed';
import { PanelType } from '@/types';

const Home: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelType>('home');

  const navigateTo = (panel: PanelType) => {
    setActivePanel(panel);
  };

  // Common back button component to avoid repetition
  const BackButton = () => (
    <div className="absolute top-4 left-4 z-10">
      <button 
        onClick={() => navigateTo('home')} 
        className="bg-background-darker text-white p-2 rounded-full"
      >
        ← Back
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Head>
        <title>HoopStack App</title>
        <meta name="description" content="Your social fantasy sports experience" />
      </Head>

      {activePanel === 'home' && (
        <div className="flex flex-col h-screen">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-1 text-text-primary">Game Night</h1>
                <p className="text-base text-text-light opacity-80">Monday, February 12</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-light bg-black bg-opacity-30 py-1 px-2 rounded-full">
                  8 Friends Online
                </span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background-dark text-xs font-bold">JD</div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-dark text-xs font-bold">TK</div>
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background-dark text-xs font-bold">+6</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="bg-black bg-opacity-20 rounded-custom p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-primary">Tonight's Game Night</h3>
                  <span className="bg-notification px-2 py-1 rounded-full text-xs font-semibold">LIVE</span>
                </div>
                <p className="text-sm text-text-light mb-4">NBA All-Stars Showdown • 8 Friends Playing</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      <span>🏀</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Monday Night Hoopers</p>
                      <p className="text-xs text-text-light opacity-80">Your clan is watching</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigateTo('live')} 
                    className="bg-primary text-white text-sm font-semibold py-2 px-4 rounded-custom"
                  >
                    Join Stream
                  </button>
                </div>
              </div>

              <div className="flex items-center bg-white bg-opacity-5 rounded-custom p-4 gap-4">
                <div className="w-10 h-10 rounded-full bg-notification flex items-center justify-center text-2xl">
                  <span>🔥</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1">New Taunt from StatGuru</h3>
                  <p className="text-sm text-text-light opacity-80">"My lineup is crushing yours tonight! 🏆"</p>
                </div>
                <button 
                  onClick={() => navigateTo('chat')} 
                  className="bg-accent text-white text-xs font-semibold py-1 px-3 rounded-full"
                >
                  Reply
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => navigateTo('groups')} 
                className="bg-primary hover:bg-primary-light text-white p-4 rounded-custom flex flex-col items-center"
              >
                <span className="text-2xl mb-1">👥</span>
                <span className="text-base font-bold">Friend Groups</span>
              </button>
              <button 
                onClick={() => navigateTo('clans')} 
                className="bg-secondary hover:bg-accent text-white p-4 rounded-custom flex flex-col items-center"
              >
                <span className="text-2xl mb-1">🛡️</span>
                <span className="text-base font-bold">Clans</span>
              </button>
              <button 
                onClick={() => navigateTo('chat')} 
                className="bg-accent hover:bg-accent text-white p-4 rounded-custom flex flex-col items-center"
              >
                <span className="text-2xl mb-1">💬</span>
                <span className="text-base font-bold">Game Chat</span>
              </button>
              <button 
                onClick={() => navigateTo('leaderboard')} 
                className="bg-notification hover:bg-success text-white p-4 rounded-custom flex flex-col items-center"
              >
                <span className="text-2xl mb-1">🏆</span>
                <span className="text-base font-bold">Leaderboard</span>
              </button>
            </div>

            <button 
              onClick={() => navigateTo('results')} 
              className="bg-background-darker hover:bg-black w-full text-white p-4 rounded-custom flex items-center justify-center gap-2"
            >
              <span className="text-xl">📊</span>
              <span className="text-base font-bold">View Your Results</span>
            </button>
          </div>
        </div>
      )}
      
      {activePanel === 'groups' && (
        <div className="h-screen">
          <BackButton />
          <GroupsPanel onJoinGroup={() => navigateTo('chat')} />
        </div>
      )}
      
      {activePanel === 'chat' && (
        <div className="h-screen">
          <BackButton />
          <div className="absolute bottom-4 right-4 z-10">
            <button 
              onClick={() => navigateTo('results')} 
              className="bg-primary text-white p-3 rounded-full shadow-medium"
            >
              📊
            </button>
          </div>
          <ChatInterface />
        </div>
      )}
      
      {activePanel === 'results' && (
        <div className="h-screen">
          <BackButton />
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={() => navigateTo('leaderboard')} 
              className="bg-primary text-white p-2 rounded-full shadow-medium"
            >
              🏆
            </button>
          </div>
          <SportsResults />
        </div>
      )}

      {activePanel === 'leaderboard' && (
        <div className="h-screen">
          <BackButton />
          <SocialLeaderboard />
        </div>
      )}

      {activePanel === 'clans' && (
        <div className="h-screen">
          <BackButton />
          <ClansPanel />
        </div>
      )}

      {activePanel === 'live' && (
        <div className="h-screen">
          <BackButton />
          <LiveFeed />
        </div>
      )}
    </div>
  );
};

export default Home; 