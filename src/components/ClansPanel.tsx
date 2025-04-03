import React, { useState } from 'react';

interface ClanMember {
  id: number;
  name: string;
  avatar: string;
  role: 'leader' | 'co-leader' | 'member';
  status: 'online' | 'offline';
  wins: number;
  bestPick: string;
}

interface Clan {
  id: number;
  name: string;
  icon: string;
  members: number;
  wins: number;
  matches: number;
  isActive: boolean;
  nextMatch: string;
  description?: string;
  memberList?: ClanMember[];
  winStreak?: number;
  leagues?: string[];
}

interface ClanChallenge {
  id: number;
  challenger: string;
  challengerIcon: string;
  type: string;
  date: string;
  isNew: boolean;
}

const ClansPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'myclans' | 'discover'>('myclans');
  const [selectedClan, setSelectedClan] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const clanChallenges: ClanChallenge[] = [
    {
      id: 1,
      challenger: 'Court Jesters',
      challengerIcon: '🃏',
      type: 'Weekly Tournament',
      date: 'Tonight 8PM',
      isNew: true
    },
    {
      id: 2,
      challenger: 'Slam Dunkers',
      challengerIcon: '💪',
      type: 'Head-to-Head',
      date: 'Tomorrow 7PM',
      isNew: true
    }
  ];

  const clans: Clan[] = [
    {
      id: 1,
      name: 'Monday Night Hoopers',
      icon: '🏀',
      members: 8,
      wins: 6,
      matches: 8,
      isActive: true,
      nextMatch: 'Tonight vs. Court Jesters',
      description: 'A group of friends who love to compete in fantasy basketball every Monday night.',
      winStreak: 3,
      leagues: ['NBA', 'College'],
      memberList: [
        {
          id: 1,
          name: 'HoopMaster',
          avatar: 'HM',
          role: 'leader',
          status: 'online',
          wins: 24,
          bestPick: 'Stephen Curry'
        },
        {
          id: 2,
          name: 'StatGuru',
          avatar: 'SG',
          role: 'co-leader',
          status: 'online',
          wins: 18,
          bestPick: 'Nikola Jokić'
        },
        {
          id: 3,
          name: 'You',
          avatar: 'YO',
          role: 'member',
          status: 'online',
          wins: 15,
          bestPick: 'Giannis Antetokounmpo'
        }
      ]
    },
    {
      id: 2,
      name: 'Triple Double Squad',
      icon: '🔥',
      members: 12,
      wins: 9,
      matches: 15,
      isActive: true,
      nextMatch: 'Tomorrow vs. Slam Dunkers',
      description: 'We value versatility in our fantasy picks. Always hunting for triple-doubles!',
      winStreak: 0,
      leagues: ['NBA', 'WNBA'],
      memberList: [
        {
          id: 4,
          name: 'TripleD',
          avatar: 'TD',
          role: 'leader',
          status: 'offline',
          wins: 32,
          bestPick: 'Luka Dončić'
        },
        {
          id: 5,
          name: 'You',
          avatar: 'YO',
          role: 'co-leader',
          status: 'online',
          wins: 15,
          bestPick: 'Giannis Antetokounmpo'
        }
      ]
    },
    {
      id: 3,
      name: 'Fantasy Legends',
      icon: '⭐',
      members: 6,
      wins: 4,
      matches: 6,
      isActive: false,
      nextMatch: 'No upcoming matches',
      description: 'The original fantasy sports group from our college days.',
      winStreak: 0,
      leagues: ['NFL', 'NBA'],
      memberList: [
        {
          id: 6,
          name: 'LegendX',
          avatar: 'LX',
          role: 'leader',
          status: 'offline',
          wins: 9,
          bestPick: 'Josh Allen'
        },
        {
          id: 7,
          name: 'You',
          avatar: 'YO',
          role: 'member',
          status: 'online',
          wins: 15,
          bestPick: 'Giannis Antetokounmpo'
        }
      ]
    }
  ];

  const discoverClans: Clan[] = [
    {
      id: 4,
      name: 'Three-Point Snipers',
      icon: '🎯',
      members: 15,
      wins: 12,
      matches: 18,
      isActive: true,
      nextMatch: 'Tonight vs. Pick & Roll Masters',
      description: 'We focus on the sharpshooters. 3-pointers only!'
    },
    {
      id: 5,
      name: 'Fantasy All-Stars',
      icon: '🌟',
      members: 20,
      wins: 16,
      matches: 25,
      isActive: true,
      nextMatch: 'Saturday vs. Stat Crushers',
      description: 'The largest and most competitive fantasy clan in the league.'
    },
    {
      id: 6,
      name: 'The Rookies',
      icon: '🎓',
      members: 5,
      wins: 2,
      matches: 4,
      isActive: true,
      nextMatch: 'Looking for challengers',
      description: 'New to fantasy sports but eager to learn and compete!'
    }
  ];

  const displayedClans = activeTab === 'myclans' ? clans : discoverClans;
  
  // Get selected clan details
  const selectedClanDetails = selectedClan 
    ? [...clans, ...discoverClans].find(clan => clan.id === selectedClan) 
    : null;

  return (
    <div className="flex flex-col h-screen bg-background-darker">
      {!selectedClan ? (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-text-primary">Fantasy Clans</h1>
          <p className="text-text-light text-sm mb-6">Join forces with friends and compete as a team</p>
          
          <div className="flex border-b border-white border-opacity-10 mb-6">
            <button 
              onClick={() => setActiveTab('myclans')} 
              className={`py-3 px-4 font-medium text-sm ${activeTab === 'myclans' ? 'border-b-2 border-primary text-primary' : 'text-text-light'}`}
            >
              My Clans
            </button>
            <button 
              onClick={() => setActiveTab('discover')} 
              className={`py-3 px-4 font-medium text-sm ${activeTab === 'discover' ? 'border-b-2 border-primary text-primary' : 'text-text-light'}`}
            >
              Discover Clans
            </button>
          </div>

          {activeTab === 'myclans' && clanChallenges.length > 0 && (
            <div className="mb-6 bg-black bg-opacity-20 rounded-custom p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-primary font-semibold">Clan Challenges</h3>
                <span className="text-xs bg-notification text-white px-2 py-1 rounded-full animate-pulse">
                  {clanChallenges.filter(c => c.isNew).length} NEW
                </span>
              </div>
              
              <div className="space-y-3">
                {clanChallenges.map(challenge => (
                  <div key={challenge.id} className="bg-black bg-opacity-30 rounded-custom p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xl mr-3">
                          <span>{challenge.challengerIcon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{challenge.challenger}</p>
                          <p className="text-xs text-text-light">{challenge.type} • {challenge.date}</p>
                        </div>
                      </div>
                      {challenge.isNew && (
                        <span className="text-xs bg-notification text-white px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="bg-primary text-white py-1.5 px-3 rounded-custom text-xs font-medium flex-1">
                        Accept
                      </button>
                      <button className="bg-black bg-opacity-30 text-text-light py-1.5 px-3 rounded-custom text-xs font-medium flex-1">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {displayedClans.map((clan) => (
              <div 
                key={clan.id} 
                className="bg-black bg-opacity-20 rounded-custom p-4 hover:bg-opacity-30 transition-all cursor-pointer"
                onClick={() => setSelectedClan(clan.id)}
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl mr-3">
                    <span>{clan.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-text-primary font-semibold flex items-center">
                      {clan.name}
                      {clan.winStreak && clan.winStreak > 2 && (
                        <span className="ml-2 text-xs bg-success text-white px-2 py-0.5 rounded-full flex items-center">
                          <span className="mr-1">🔥</span>
                          <span>{clan.winStreak} streak</span>
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-text-light">{clan.members} members • {clan.wins}/{clan.matches} wins</p>
                    {clan.description && (
                      <p className="text-xs text-text-light mt-1 line-clamp-1">{clan.description}</p>
                    )}
                  </div>
                  {activeTab === 'myclans' ? (
                    <button 
                      className="bg-primary text-white py-2 px-4 rounded-custom text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Chat functionality would go here
                      }}
                    >
                      Chat
                    </button>
                  ) : (
                    <button 
                      className="bg-primary text-white py-2 px-4 rounded-custom text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Join functionality would go here
                      }}
                    >
                      Join
                    </button>
                  )}
                </div>
                
                <div className="flex items-center justify-between bg-black bg-opacity-20 p-3 rounded-custom">
                  <span className="text-xs font-medium text-text-light">Next Match:</span>
                  <span className={`text-xs font-medium ${clan.isActive ? 'text-success' : 'text-text-light opacity-50'}`}>
                    {clan.nextMatch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Clan Detail View
        <div className="flex flex-col h-full">
          <div className="p-6">
            <button 
              className="flex items-center text-text-light mb-4"
              onClick={() => setSelectedClan(null)}
            >
              <span className="mr-1">←</span>
              <span>Back to Clans</span>
            </button>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl mr-4">
                <span>{selectedClanDetails?.icon}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{selectedClanDetails?.name}</h1>
                <p className="text-sm text-text-light">{selectedClanDetails?.description}</p>
                <div className="flex items-center mt-1 gap-2">
                  {selectedClanDetails?.leagues?.map((league, index) => (
                    <span key={index} className="text-xs bg-black bg-opacity-50 text-text-light px-2 py-0.5 rounded">
                      {league}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-black bg-opacity-20 rounded-custom p-3 text-center">
                <p className="text-primary text-xl font-bold">{selectedClanDetails?.members}</p>
                <p className="text-xs text-text-light">Members</p>
              </div>
              <div className="bg-black bg-opacity-20 rounded-custom p-3 text-center">
                <p className="text-primary text-xl font-bold">{selectedClanDetails?.wins}</p>
                <p className="text-xs text-text-light">Wins</p>
              </div>
              <div className="bg-black bg-opacity-20 rounded-custom p-3 text-center">
                <p className="text-primary text-xl font-bold">
                  {selectedClanDetails?.wins && selectedClanDetails?.matches 
                    ? Math.round((selectedClanDetails.wins / selectedClanDetails.matches) * 100) 
                    : 0}%
                </p>
                <p className="text-xs text-text-light">Win Rate</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-text-primary font-semibold mb-3">Members</h2>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {selectedClanDetails?.memberList?.map(member => (
                  <div key={member.id} className="flex items-center justify-between bg-black bg-opacity-20 p-3 rounded-custom">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold mr-3">
                        <span>{member.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary flex items-center">
                          {member.name}
                          {member.role === 'leader' && (
                            <span className="ml-1 text-yellow-500">👑</span>
                          )}
                          {member.role === 'co-leader' && (
                            <span className="ml-1 text-yellow-300">⭐</span>
                          )}
                        </p>
                        <p className="text-xs text-text-light">Best pick: {member.bestPick}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-1 ${member.status === 'online' ? 'bg-success' : 'bg-text-light opacity-50'}`}></span>
                      <span className="text-xs text-text-light">{member.wins} wins</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-text-primary font-semibold mb-3">Next Match</h2>
              {selectedClanDetails?.isActive ? (
                <div className="bg-black bg-opacity-20 p-4 rounded-custom">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl mr-2">
                          <span>{selectedClanDetails.icon}</span>
                        </div>
                        <span className="text-text-primary font-medium">{selectedClanDetails.name}</span>
                      </div>
                      <p className="text-center text-xs text-success mt-1">Your Clan</p>
                    </div>
                    <div className="text-center">
                      <p className="text-primary font-bold">VS</p>
                      <p className="text-xs text-text-light">{selectedClanDetails.nextMatch.split(' vs. ')[1]}</p>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-text-primary font-medium mr-2">
                          {selectedClanDetails.nextMatch.split(' vs. ')[1]}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                          <span>🏆</span>
                        </div>
                      </div>
                      <p className="text-center text-xs text-text-light mt-1">Challenger</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-text-light text-center mb-2">
                      Match starts {selectedClanDetails.nextMatch.includes('Tonight') ? 'tonight at 8PM' : 'tomorrow at 7PM'}
                    </p>
                    <button className="w-full bg-primary text-white py-2 rounded-custom text-sm font-medium">
                      Set Lineup
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-black bg-opacity-20 p-4 rounded-custom text-center">
                  <p className="text-text-light">No upcoming matches</p>
                  <button className="mt-3 bg-primary text-white py-2 px-4 rounded-custom text-sm font-medium">
                    Challenge Another Clan
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-auto p-6 bg-black bg-opacity-10 border-t border-white border-opacity-5">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-primary text-white py-3 rounded-custom font-medium flex items-center justify-center gap-2">
                <span>💬</span>
                <span>Clan Chat</span>
              </button>
              <button className="bg-black bg-opacity-30 text-text-light py-3 rounded-custom font-medium flex items-center justify-center gap-2">
                <span>📊</span>
                <span>View Stats</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'myclans' && !selectedClan && (
        <div className="mt-auto p-6 bg-black bg-opacity-10 border-t border-white border-opacity-5">
          <button 
            className="bg-primary text-white py-3 px-6 rounded-custom font-medium w-full flex items-center justify-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <span>🛡️</span>
            <span>Create New Clan</span>
          </button>
        </div>
      )}
      
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-background-dark rounded-custom p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Create New Clan</h2>
            
            <div className="mb-4">
              <label className="block text-text-light text-sm mb-1">Clan Name</label>
              <input 
                type="text" 
                className="w-full bg-black bg-opacity-30 border border-white border-opacity-10 rounded-custom p-3 text-text-primary"
                placeholder="Enter clan name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-text-light text-sm mb-1">Clan Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {['🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🏒', '🎯', '🏆', '⭐'].map((emoji, i) => (
                  <button 
                    key={i} 
                    className="w-10 h-10 bg-black bg-opacity-30 hover:bg-primary rounded-lg flex items-center justify-center text-xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-text-light text-sm mb-1">Description</label>
              <textarea 
                className="w-full bg-black bg-opacity-30 border border-white border-opacity-10 rounded-custom p-3 text-text-primary"
                rows={3}
                placeholder="Describe your clan"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-text-light text-sm mb-1">Sports Leagues</label>
              <div className="flex flex-wrap gap-2">
                {['NBA', 'NFL', 'MLB', 'NHL', 'Soccer', 'WNBA'].map((league, i) => (
                  <button 
                    key={i} 
                    className="bg-black bg-opacity-30 hover:bg-primary text-text-light hover:text-white rounded-full px-3 py-1 text-xs"
                  >
                    {league}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 bg-black bg-opacity-30 text-text-light py-3 rounded-custom font-medium"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button className="flex-1 bg-primary text-white py-3 rounded-custom font-medium">
                Create Clan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClansPanel; 