import React, { useState } from 'react';
import { Player, FriendResult } from '@/types';

const SportsResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lineup' | 'friends'>('lineup');
  const [showTauntMenu, setShowTauntMenu] = useState(false);
  
  const tauntEmojis = [
    '🔥', '💯', '👑', '🏆', '💪', '😎', '🎯', '🚀', '💣', '😂', 
    '👏', '🙌', '🤡', '🤦‍♂️', '😱', '🍀', '🧠', '👊', '🎪', '🎭'
  ];

  const lineup: Player[] = [
    {
      position: 'PG',
      name: 'Stephen Curry',
      team: 'GSW',
      opponent: 'LAL',
      points: 52.4,
      stats: '32pts, 8ast, 5reb',
      image: 'SC'
    },
    {
      position: 'SG',
      name: 'Donovan Mitchell',
      team: 'CLE',
      opponent: 'CHI',
      points: 43.2,
      stats: '28pts, 4ast, 6reb',
      image: 'DM'
    },
    {
      position: 'SF',
      name: 'Jayson Tatum',
      team: 'BOS',
      opponent: 'MIA',
      points: 45.8,
      stats: '27pts, 3ast, 11reb',
      image: 'JT'
    },
    {
      position: 'PF',
      name: 'Giannis Antetokounmpo',
      team: 'MIL',
      opponent: 'PHI',
      points: 62.7,
      stats: '36pts, 8ast, 12reb',
      image: 'GA'
    },
    {
      position: 'C',
      name: 'Nikola Jokić',
      team: 'DEN',
      opponent: 'MIN',
      points: 68.4,
      stats: '24pts, 14ast, 15reb',
      image: 'NJ'
    }
  ];
  
  const friends: FriendResult[] = [
    {
      name: 'You',
      avatar: 'YO',
      total: 272.5,
      position: 1,
      bestPlayer: 'Nikola Jokić',
      worstPlayer: 'Donovan Mitchell'
    },
    {
      name: 'JasonDFS',
      avatar: 'JD',
      total: 258.3,
      position: 2,
      bestPlayer: 'Stephen Curry',
      worstPlayer: 'Jayson Tatum'
    },
    {
      name: 'HoopMaster',
      avatar: 'HM',
      total: 245.7,
      position: 3,
      bestPlayer: 'LeBron James',
      worstPlayer: 'Devin Booker'
    },
    {
      name: 'StatGuru',
      avatar: 'SG',
      total: 230.2,
      position: 4,
      bestPlayer: 'Giannis Antetokounmpo',
      worstPlayer: 'Kyrie Irving'
    },
    {
      name: 'CourtVision',
      avatar: 'CV',
      total: 211.5,
      position: 5,
      bestPlayer: 'Luka Dončić',
      worstPlayer: 'Anthony Edwards'
    }
  ];

  const totalPoints = lineup.reduce((sum, player) => sum + player.points, 0);

  return (
    <div className="flex flex-col h-screen bg-background-darker p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Monday Night Hoopers</h1>
        <p className="text-text-light text-sm">Contest Results • February 12</p>
      </div>

      <div className="flex border-b border-white border-opacity-10 mb-6">
        <button 
          onClick={() => setActiveTab('lineup')} 
          className={`py-3 px-4 font-medium text-sm ${activeTab === 'lineup' ? 'border-b-2 border-primary text-primary' : 'text-text-light'}`}
        >
          Your Lineup
        </button>
        <button 
          onClick={() => setActiveTab('friends')} 
          className={`py-3 px-4 font-medium text-sm ${activeTab === 'friends' ? 'border-b-2 border-primary text-primary' : 'text-text-light'}`}
        >
          Friend Results
        </button>
      </div>

      {activeTab === 'lineup' && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Your Lineup</h2>
            <div className="bg-primary px-3 py-1 rounded-full text-white text-sm font-medium flex items-center gap-1">
              <span className="text-xs">TOTAL</span>
              <span>{totalPoints.toFixed(1)}</span>
            </div>
          </div>

          <div className="bg-black bg-opacity-20 rounded-custom mb-6">
            {lineup.map((player, index) => (
              <div key={index} className="flex justify-between items-center p-4 border-b border-white border-opacity-10 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-white">
                    {player.image}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">{player.position}</span>
                      <p className="font-medium text-text-primary">{player.name}</p>
                    </div>
                    <p className="text-xs text-text-light">{player.team} vs {player.opponent}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-primary">{player.points.toFixed(1)}</p>
                  <p className="text-xs text-text-light">{player.stats}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black bg-opacity-20 rounded-custom p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-text-primary">Performance</h3>
              <span className="text-xs text-success">Rank 1 of 5</span>
            </div>
            <div className="h-4 bg-black bg-opacity-30 rounded-full overflow-hidden">
              <div className="h-full bg-success" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-text-light">0</span>
              <span className="text-xs text-success font-medium">{totalPoints.toFixed(1)}</span>
            </div>
          </div>
        </>
      )}

      {activeTab === 'friends' && (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Friend Results</h2>
            <p className="text-sm text-text-light">See how your friends performed in this contest</p>
          </div>

          <div className="space-y-3 mb-6">
            {friends.map((friend, index) => (
              <div 
                key={index} 
                className={`flex items-center p-4 rounded-custom ${friend.name === 'You' ? 'bg-success bg-opacity-20' : 'bg-black bg-opacity-20'}`}
              >
                <div className="w-8 text-center font-bold mr-3">
                  <span className={friend.name === 'You' ? 'text-success' : 'text-text-light'}>#{friend.position}</span>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold mr-3 flex-shrink-0 text-white">
                  <span>{friend.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium text-text-primary">{friend.name}</p>
                    {friend.name === 'You' && <span className="ml-2 text-xs bg-success text-white px-2 py-0.5 rounded-full">Winner</span>}
                  </div>
                  <div className="flex justify-between text-xs text-text-light mt-1">
                    <span>Best: {friend.bestPlayer}</span>
                    <span>Worst: {friend.worstPlayer}</span>
                  </div>
                </div>
                
                <div className="font-bold text-xl text-text-primary ml-3">{friend.total.toFixed(1)}</div>
              </div>
            ))}
          </div>

          <div className="bg-black bg-opacity-20 rounded-custom p-4 mb-6">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Everyone's Lineups</h3>
            <p className="text-sm text-text-light mb-3">Interesting stat: 4 out of 5 friends had Giannis in their lineup!</p>
            <button className="w-full bg-primary text-white py-3 rounded-custom text-sm font-medium">
              Compare Lineups
            </button>
          </div>
        </>
      )}

      <div className="mt-auto flex gap-4 relative">
        <button 
          onClick={() => setShowTauntMenu(!showTauntMenu)}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-custom font-semibold flex items-center justify-center gap-2 relative"
        >
          <span>🎭</span>
          <span>Send Taunt</span>
          
          {showTauntMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-background-dark rounded-xl shadow-medium overflow-hidden p-2">
              <h4 className="text-xs font-semibold text-notification flex items-center gap-1 mb-2 px-2">
                <span>🔥</span>
                <span>SELECT AN EMOJI TAUNT</span>
              </h4>
              <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                {tauntEmojis.map((emoji, index) => (
                  <button 
                    key={index}
                    className="w-10 h-10 bg-black bg-opacity-30 hover:bg-notification hover:bg-opacity-20 rounded-lg flex items-center justify-center text-xl transition-all transform hover:scale-110"
                  >
                    <span className="taunt-message">{emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </button>
        <button className="flex-1 bg-black bg-opacity-30 text-text-light py-3 px-6 rounded-custom font-semibold flex items-center justify-center gap-2">
          <span>🔄</span>
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};

export default SportsResults; 