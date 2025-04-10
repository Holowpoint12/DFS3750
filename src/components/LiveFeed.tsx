import React, { useState } from 'react';
import YouTubePlayer from './YouTubePlayer';

interface LiveMessage {
  id: number;
  user: string;
  text: string;
  time: string;
  isHighlighted?: boolean;
  isClanMessage?: boolean;
  clan?: string;
  clanIcon?: string;
}

interface Reaction {
  emoji: string;
  count: number;
}

interface ClanStats {
  name: string;
  icon: string;
  score: number;
  members: number;
  memberList: string[];
}

const LiveFeed: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [showReactions, setShowReactions] = useState(false);
  const [showClanStats, setShowClanStats] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'clan'>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // The video ID from the YouTube URL: https://www.youtube.com/watch?v=uHgt8giw1LY
  const videoId = 'uHgt8giw1LY';
  
  const clans: ClanStats[] = [
    {
      name: 'Monday Night Hoopers',
      icon: '🏀',
      score: 142.5,
      members: 8,
      memberList: ['You', 'JasonDFS', 'HoopMaster', 'StatGuru', 'BballFan']
    },
    {
      name: 'Court Jesters',
      icon: '🃏',
      score: 129.8,
      members: 6,
      memberList: ['DunkMaster', 'CourtVision', 'Shooter98', 'PointGuardPro']
    }
  ];
  
  const liveMessages: LiveMessage[] = [
    {
      id: 1,
      user: 'HostJames',
      text: "Welcome to the Monday Night Hoopers live stream! The game is about to start! 🏀",
      time: '7:00 PM',
      isHighlighted: true
    },
    {
      id: 2,
      user: 'JasonDFS',
      text: "Let's go! My lineup is stacked tonight.",
      time: '7:01 PM',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    {
      id: 3,
      user: 'StatGuru',
      text: "Curry needs to hit 5 threes for me to win my matchup.",
      time: '7:02 PM',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    {
      id: 4,
      user: 'HoopMaster',
      text: "BOOM! Curry starts with a deep three! 👌",
      time: '7:04 PM',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    {
      id: 5,
      user: 'System',
      text: "🏀 GAME ALERT: Stephen Curry hits a three-pointer (+3 pts)",
      time: '7:04 PM',
      isHighlighted: true
    },
    {
      id: 6,
      user: 'CourtVision',
      text: "That's 3 points for everyone who has Curry in their lineup!",
      time: '7:05 PM',
      clan: 'Court Jesters',
      clanIcon: '🃏'
    },
    {
      id: 7,
      user: 'System',
      text: "🏀 GAME ALERT: Giannis with the monster dunk! (+2 pts)",
      time: '7:06 PM',
      isHighlighted: true
    },
    {
      id: 8,
      user: 'System',
      text: "⚔️ CLAN CHALLENGE UPDATE: Monday Night Hoopers takes the lead over Court Jesters! (142.5 vs 129.8)",
      time: '7:08 PM',
      isHighlighted: true,
      isClanMessage: true
    },
    {
      id: 9,
      user: 'DunkMaster',
      text: "We'll catch up in the second half! Morant still needs to play! 💪",
      time: '7:08 PM',
      clan: 'Court Jesters',
      clanIcon: '🃏'
    },
    {
      id: 10,
      user: 'You',
      text: "Our clan is crushing it tonight! Keep it up everyone! 🔥",
      time: '7:09 PM',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    }
  ];

  const reactions: Reaction[] = [
    { emoji: '🔥', count: 24 },
    { emoji: '👍', count: 18 },
    { emoji: '😮', count: 12 },
    { emoji: '💯', count: 8 },
    { emoji: '👏', count: 15 }
  ];

  const sendMessage = () => {
    if (inputMessage.trim()) {
      // In a real app, this would add the message to the feed
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const filteredMessages = activeTab === 'clan'
    ? liveMessages.filter(msg => msg.clan === 'Monday Night Hoopers' || msg.isClanMessage)
    : liveMessages;

  const yourClan = clans[0]; // Monday Night Hoopers
  const rivalClan = clans[1]; // Court Jesters

  return (
    <div className="flex flex-col h-screen bg-background-darker">
      <div className="p-4 bg-black bg-opacity-30 border-b border-white border-opacity-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Clan Challenge</h2>
            <div className="flex items-center">
              <span className="text-xs text-text-light mr-1">Monday Night Hoopers vs Court Jesters •</span>
              <span className="text-xs text-text-light"> Live with 8 friends</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-notification px-2 py-1 rounded-full text-xs font-semibold animate-pulse">LIVE</span>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background-darker text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-darker text-xs font-bold">SG</div>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background-darker text-xs font-bold">+6</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Video Stream */}
        <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'md:w-2/3'} bg-black flex flex-col p-2 transition-all duration-300`}>
          <div className="relative w-full h-64 md:h-full bg-black flex items-center justify-center rounded-lg overflow-hidden">
            <YouTubePlayer 
              videoId={videoId} 
              autoplay={true} 
              className="w-full h-full"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold text-sm">Warriors vs Lakers</h3>
                  <p className="text-gray-300 text-xs">Q2 - 6:42 • GSW 54 - 48 LAL</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowReactions(!showReactions)}
                    className="bg-primary bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
                  >
                    {showReactions ? '✕' : '👍'}
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-primary bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-primary bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
                  >
                    {isFullscreen ? '↙' : '↗'}
                  </button>
                </div>
              </div>
              
              {showReactions && (
                <div className="mt-2 flex gap-2 animate-fadeIn">
                  {reactions.map((reaction, index) => (
                    <button 
                      key={index}
                      className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full px-2 py-1 flex items-center gap-1 transition-all"
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-xs text-white">{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Clan Challenge Banner */}
            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 px-4 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xl mr-2">
                    <span>{yourClan.icon}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs">{yourClan.name}</p>
                    <p className="text-primary font-bold">{yourClan.score}</p>
                  </div>
                </div>
                
                <div className="px-2">
                  <p className="text-white text-xs font-semibold">VS</p>
                </div>
                
                <div className="flex items-center">
                  <div>
                    <p className="text-white text-xs">{rivalClan.name}</p>
                    <p className="text-secondary font-bold">{rivalClan.score}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xl ml-2">
                    <span>{rivalClan.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2 bg-black bg-opacity-30 p-2 rounded-lg hidden md:flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="bg-success px-2 py-1 rounded-full text-xs font-semibold">GAME STATS</span>
              <span className="text-xs text-text-light">Curry: 18 PTS, 5 AST • LeBron: 15 PTS, 7 REB, 4 AST</span>
            </div>
            <button 
              onClick={() => setShowClanStats(!showClanStats)}
              className="bg-primary px-3 py-1 rounded-full text-xs font-semibold"
            >
              {showClanStats ? 'Hide Clan Stats' : 'Show Clan Stats'}
            </button>
          </div>
          
          {isFullscreen && (
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={() => setIsFullscreen(false)}
            >
              Exit Fullscreen
            </button>
          )}
        </div>
        
        {/* Live Chat */}
        {!isFullscreen && (
          <div className="md:w-1/3 flex flex-col">
            <div className="p-3 border-b border-white border-opacity-10">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-2 rounded text-sm font-medium ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                >
                  All Chat
                </button>
                <button 
                  onClick={() => setActiveTab('clan')}
                  className={`flex-1 py-2 rounded text-sm font-medium ${activeTab === 'clan' ? 'bg-primary text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                >
                  Clan Only
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`${message.isHighlighted ? 'bg-black bg-opacity-40 border-l-4 border-notification' : ''} rounded-lg p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.clan && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{message.clanIcon}</span>
                        <span className="text-xs text-text-light">{message.clan}</span>
                        <span className="text-xs text-text-light">•</span>
                      </div>
                    )}
                    <span className={`font-semibold text-sm ${message.isHighlighted ? 'text-notification' : 'text-text-primary'}`}>
                      {message.user}
                    </span>
                    <span className="text-xs text-text-light opacity-60">{message.time}</span>
                  </div>
                  <p className={`text-sm ${message.isHighlighted ? 'text-white' : 'text-text-light'}`}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Clan Stats Panel */}
            {showClanStats && (
              <div className="bg-background-dark rounded-lg p-4 m-3 border border-white border-opacity-5">
                <h3 className="text-text-primary font-semibold mb-3">Clan Challenge Stats</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black bg-opacity-40 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xl mr-2">
                        <span>{yourClan.icon}</span>
                      </div>
                      <h4 className="text-text-primary font-medium">{yourClan.name}</h4>
                    </div>
                    
                    <div className="text-xs text-text-light">
                      <p className="mb-1">Active Members: {yourClan.members}</p>
                      <p className="flex flex-wrap gap-1">
                        {yourClan.memberList.map((member, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded ${member === 'You' ? 'bg-primary text-white' : 'bg-black bg-opacity-30'}`}>
                            {member}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-black bg-opacity-40 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xl mr-2">
                        <span>{rivalClan.icon}</span>
                      </div>
                      <h4 className="text-text-primary font-medium">{rivalClan.name}</h4>
                    </div>
                    
                    <div className="text-xs text-text-light">
                      <p className="mb-1">Active Members: {rivalClan.members}</p>
                      <p className="flex flex-wrap gap-1">
                        {rivalClan.memberList.map((member, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-black bg-opacity-30">
                            {member}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Chat Input */}
            <div className="p-3 border-t border-white border-opacity-10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-black bg-opacity-30 text-text-primary rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={sendMessage}
                  className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <span className="transform rotate-90">➤</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveFeed; 