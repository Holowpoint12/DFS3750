import React, { useState } from 'react';

interface UserRank {
  id: number;
  name: string;
  avatar: string;
  points: number;
  position: number;
  isFriend: boolean;
  isYou: boolean;
  streak: number;
  bestPick: string;
  clan?: string;
  clanIcon?: string;
}

interface ClanRank {
  id: number;
  name: string;
  icon: string;
  points: number;
  position: number;
  memberCount: number;
  winRate: number;
  isYourClan: boolean;
}

const SocialLeaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'friends' | 'all'>('friends');
  const [view, setView] = useState<'players' | 'clans'>('players');
  
  const leaderboard: UserRank[] = [
    { 
      id: 1, 
      name: 'You', 
      avatar: '👤', 
      points: 272.5, 
      position: 1, 
      isFriend: true, 
      isYou: true,
      streak: 3,
      bestPick: 'Nikola Jokić',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    { 
      id: 2, 
      name: 'JasonDFS', 
      avatar: 'JD', 
      points: 258.3, 
      position: 2, 
      isFriend: true, 
      isYou: false,
      streak: 2,
      bestPick: 'Steph Curry',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    { 
      id: 3, 
      name: 'HoopMaster', 
      avatar: 'HM', 
      points: 245.7, 
      position: 3, 
      isFriend: true, 
      isYou: false,
      streak: 1,
      bestPick: 'LeBron James',
      clan: 'Monday Night Hoopers',
      clanIcon: '🏀'
    },
    { 
      id: 4, 
      name: 'StatGuru', 
      avatar: 'SG', 
      points: 230.2, 
      position: 4, 
      isFriend: true, 
      isYou: false,
      streak: 0,
      bestPick: 'Giannis Antetokounmpo',
      clan: 'Triple Double Squad',
      clanIcon: '🔥'
    },
    { 
      id: 5, 
      name: 'BballFan', 
      avatar: 'BF', 
      points: 225.8, 
      position: 5, 
      isFriend: true, 
      isYou: false,
      streak: 1,
      bestPick: 'Kevin Durant',
      clan: 'Fantasy Legends',
      clanIcon: '⭐'
    },
    { 
      id: 6, 
      name: 'DunkMaster', 
      avatar: 'DM', 
      points: 218.9, 
      position: 6, 
      isFriend: false, 
      isYou: false,
      streak: 0,
      bestPick: 'Ja Morant',
      clan: 'Triple Double Squad',
      clanIcon: '🔥'
    },
    { 
      id: 7, 
      name: 'CourtVision', 
      avatar: 'CV', 
      points: 211.5, 
      position: 7, 
      isFriend: false, 
      isYou: false,
      streak: 0,
      bestPick: 'Jayson Tatum',
      clan: 'Three-Point Snipers',
      clanIcon: '🎯'
    },
  ];

  const clanLeaderboard: ClanRank[] = [
    {
      id: 1,
      name: 'Monday Night Hoopers',
      icon: '🏀',
      points: 776.5,
      position: 1,
      memberCount: 8,
      winRate: 75,
      isYourClan: true
    },
    {
      id: 2,
      name: 'Triple Double Squad',
      icon: '🔥',
      points: 724.3,
      position: 2,
      memberCount: 12,
      winRate: 60,
      isYourClan: true
    },
    {
      id: 3,
      name: 'Three-Point Snipers',
      icon: '🎯',
      points: 689.2,
      position: 3,
      memberCount: 15,
      winRate: 66,
      isYourClan: false
    },
    {
      id: 4,
      name: 'Fantasy All-Stars',
      icon: '🌟',
      points: 642.7,
      position: 4,
      memberCount: 20,
      winRate: 64,
      isYourClan: false
    },
    {
      id: 5,
      name: 'Fantasy Legends',
      icon: '⭐',
      points: 602.5,
      position: 5,
      memberCount: 6,
      winRate: 66,
      isYourClan: true
    }
  ];

  const filteredLeaderboard = filter === 'friends' 
    ? leaderboard.filter(user => user.isFriend)
    : leaderboard;

  return (
    <div className="flex flex-col h-screen bg-background-darker p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          {view === 'players' ? 'Friends Leaderboard' : 'Clan Rankings'}
        </h1>
        <p className="text-text-light text-sm">NBA All-Stars Showdown • February 12</p>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('friends')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${filter === 'friends' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            Friends Only
          </button>
          <button 
            onClick={() => setFilter('all')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            All Players
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setView('players')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${view === 'players' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            Players
          </button>
          <button 
            onClick={() => setView('clans')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${view === 'clans' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            Clans
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-black bg-opacity-20 rounded-custom mb-4 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-text-light">
              {view === 'players' ? "This Week's Winner Takes Home" : "Top Clan Gets"}
            </span>
            <span className="text-lg font-bold text-success">🏆 Bragging Rights</span>
          </div>
          <p className="text-xs text-text-light opacity-80">
            {view === 'players' 
              ? "No money involved - just compete with friends for fun!" 
              : "Clans compete for glory and prestige in the fantasy community!"}
          </p>
        </div>

        {view === 'players' ? (
          <div className="space-y-3">
            {filteredLeaderboard.map((user) => (
              <div 
                key={user.id} 
                className={`flex items-center p-4 rounded-custom ${user.isYou ? 'bg-success bg-opacity-20' : 'bg-black bg-opacity-20'}`}
              >
                <div className="w-8 text-center font-bold mr-3">
                  <span className={user.isYou ? 'text-success' : 'text-text-light'}>{user.position}</span>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold mr-3 flex-shrink-0">
                  <span>{user.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium text-text-primary">{user.name}</p>
                    {user.isYou && <span className="ml-2 text-xs bg-success text-white px-2 py-0.5 rounded-full">You</span>}
                    {user.streak > 0 && <span className="ml-2 text-xs bg-notification text-white px-2 py-0.5 rounded-full">🔥 {user.streak}</span>}
                  </div>
                  <div className="flex items-center text-xs text-text-light">
                    <span>Best pick: {user.bestPick}</span>
                    {user.clan && (
                      <div className="flex items-center ml-2 border-l border-text-light border-opacity-20 pl-2">
                        <span className="mr-1">{user.clanIcon}</span>
                        <span>{user.clan}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="font-bold text-xl text-text-primary">{user.points}</div>
                
                {!user.isYou && (
                  <button className="ml-3 text-primary text-lg">
                    🎭
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {clanLeaderboard.map((clan) => (
              <div 
                key={clan.id} 
                className={`flex items-center p-4 rounded-custom ${clan.isYourClan ? 'bg-success bg-opacity-20' : 'bg-black bg-opacity-20'}`}
              >
                <div className="w-8 text-center font-bold mr-3">
                  <span className={clan.isYourClan ? 'text-success' : 'text-text-light'}>{clan.position}</span>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl mr-3 flex-shrink-0">
                  <span>{clan.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium text-text-primary">{clan.name}</p>
                    {clan.isYourClan && <span className="ml-2 text-xs bg-success text-white px-2 py-0.5 rounded-full">Your Clan</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-light">
                    <span>{clan.memberCount} members</span>
                    <span>•</span>
                    <span>{clan.winRate}% win rate</span>
                  </div>
                </div>
                
                <div className="font-bold text-xl text-text-primary">{clan.points}</div>
                
                {!clan.isYourClan && (
                  <button className="ml-3 bg-primary text-white py-1 px-3 rounded-custom text-xs font-medium">
                    Challenge
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {view === 'clans' && (
          <div className="mt-4 bg-black bg-opacity-20 rounded-custom p-4">
            <h3 className="text-text-primary font-semibold mb-3">Upcoming Clan Matches</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-black bg-opacity-20 p-3 rounded-custom">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm mr-2">
                    <span>🏀</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">Monday Night Hoopers</span>
                </div>
                <span className="text-xs text-primary">VS</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-text-primary mr-2">Court Jesters</span>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                    <span>🃏</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-black bg-opacity-20 p-3 rounded-custom">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm mr-2">
                    <span>🔥</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">Triple Double Squad</span>
                </div>
                <span className="text-xs text-primary">VS</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-text-primary mr-2">Slam Dunkers</span>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                    <span>💪</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-black bg-opacity-30 rounded-custom">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-text-primary">
              {view === 'players' 
                ? "Your Weekly Rank" 
                : "Your Clan's Standing"}
            </p>
            <p className="text-xs text-text-light">
              {view === 'players' 
                ? "You've been #1 for 2 weeks!" 
                : "Monday Night Hoopers is leading the league!"}
            </p>
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded-full text-sm font-medium">
            Share Results 🔗
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLeaderboard; 