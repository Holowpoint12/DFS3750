import React, { useState } from 'react';

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
        <div className="md:w-2/3 bg-black flex flex-col p-2">
          <div className="relative w-full h-64 md:h-full bg-black flex items-center justify-center rounded-lg overflow-hidden">
            <img 
              src="https://via.placeholder.com/800x450/091A0A/F8F8F8?text=LIVE+GAME+STREAM" 
              alt="Game Stream" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold text-sm">Warriors vs Lakers</h3>
                  <p className="text-gray-300 text-xs">Q2 - 6:42 • GSW 54 - 48 LAL</p>
                </div>
                <div>
                  <button 
                    onClick={() => setShowReactions(!showReactions)}
                    className="bg-primary bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
                  >
                    😀
                  </button>
                </div>
              </div>
              
              {showReactions && (
                <div className="flex gap-2 mt-2">
                  {reactions.map((reaction, index) => (
                    <button 
                      key={index}
                      className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full py-1 px-2 text-xs text-white flex items-center gap-1"
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
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
          
          <div className="flex gap-2 py-2">
            <button 
              onClick={() => setShowClanStats(!showClanStats)}
              className="flex-1 bg-background-dark hover:bg-primary text-text-light hover:text-white py-2 rounded text-sm font-medium transition-colors"
            >
              Clan Stats
            </button>
            <button className="flex-1 bg-background-dark hover:bg-primary text-text-light hover:text-white py-2 rounded text-sm font-medium transition-colors">
              Leaderboard
            </button>
            <button className="flex-1 bg-background-dark hover:bg-primary text-text-light hover:text-white py-2 rounded text-sm font-medium transition-colors">
              Settings
            </button>
          </div>
          
          {/* Clan Stats Panel */}
          {showClanStats && (
            <div className="bg-background-dark rounded-lg p-4 mt-2 border border-white border-opacity-5">
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
              
              <div className="bg-black bg-opacity-40 rounded-lg p-3">
                <h4 className="text-text-primary font-medium mb-2">Challenge Details</h4>
                <div className="text-xs text-text-light">
                  <p className="mb-1">🏆 Winning Clan gets 100 prestige points</p>
                  <p className="mb-1">📊 Individual clan member stats contribute to total score</p>
                  <p>⚔️ Challenge ends after tonight's games</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Live Chat */}
        <div className="md:w-1/3 border-l border-white border-opacity-10 flex flex-col">
          <div className="p-3 border-b border-white border-opacity-10">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-text-primary">Live Chat</h3>
              <div className="flex">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 text-xs font-medium rounded-l-full ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('clan')}
                  className={`px-3 py-1 text-xs font-medium rounded-r-full ${activeTab === 'clan' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
                >
                  Clan
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-2 rounded ${
                  message.isHighlighted && message.isClanMessage 
                    ? 'bg-primary bg-opacity-20 border border-primary border-opacity-30' 
                    : message.isHighlighted 
                      ? 'bg-primary bg-opacity-20' 
                      : 'bg-black bg-opacity-20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium text-sm text-text-primary">{message.user}</span>
                    {message.clan && (
                      <span className="ml-2 text-xs bg-black bg-opacity-30 rounded px-1 flex items-center">
                        <span className="mr-0.5">{message.clanIcon}</span>
                        <span className="opacity-70">{message.clan}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-light opacity-60">{message.time}</span>
                </div>
                <p className={`text-sm ${message.isClanMessage ? 'text-primary font-medium' : 'text-text-light'}`}>
                  {message.text}
                </p>
                {message.isClanMessage && (
                  <div className="mt-1 flex gap-1">
                    <button className="text-xs bg-black bg-opacity-30 hover:bg-primary hover:bg-opacity-20 rounded px-2 py-0.5 text-text-light hover:text-primary transition-colors">
                      🏆 Cheer
                    </button>
                    <button className="text-xs bg-black bg-opacity-30 hover:bg-primary hover:bg-opacity-20 rounded px-2 py-0.5 text-text-light hover:text-primary transition-colors">
                      🔔 Alert Me
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-white border-opacity-10">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Send a message..." 
                className="flex-1 bg-black bg-opacity-30 border-none rounded-full py-2 px-4 text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                onClick={sendMessage}
                className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
              >
                <span>📤</span>
              </button>
            </div>
            
            <div className="flex justify-between mt-2">
              <button className="text-xs bg-black bg-opacity-30 hover:bg-primary hover:bg-opacity-20 rounded px-2 py-1 text-text-light hover:text-primary transition-colors flex items-center">
                <span className="mr-1">🏀</span>
                <span>Clan Chat</span>
              </button>
              <button className="text-xs bg-black bg-opacity-30 hover:bg-primary hover:bg-opacity-20 rounded px-2 py-1 text-text-light hover:text-primary transition-colors flex items-center">
                <span className="mr-1">🎭</span>
                <span>Taunt Rival Clan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed; 