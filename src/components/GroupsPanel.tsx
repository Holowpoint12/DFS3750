import React, { useState } from 'react';

interface GroupsPanelProps {
  onJoinGroup?: () => void;
}

interface FriendGroup {
  id: number;
  name: string;
  emoji: string;
  members: number;
  sport: string;
  description: string;
  hasFriends: boolean;
  friendsPlaying: string[];
}

const GroupsPanel: React.FC<GroupsPanelProps> = ({ onJoinGroup }) => {
  const [filter, setFilter] = useState<'all' | 'friends'>('friends');
  
  const groups: FriendGroup[] = [
    {
      id: 1,
      name: 'Monday Night Hoopers',
      emoji: '🏀',
      members: 8,
      sport: 'Basketball',
      description: 'Friends-only fantasy basketball. Casual play with live chat and game night streaming!',
      hasFriends: true,
      friendsPlaying: ['Jason', 'Mike', 'Sarah']
    },
    {
      id: 2,
      name: 'Soccer Stars Social',
      emoji: '⚽',
      members: 12,
      sport: 'Soccer',
      description: 'Weekly soccer contests with live scoring and friendly competition. No money involved!',
      hasFriends: true,
      friendsPlaying: ['Alex', 'Taylor']
    },
    {
      id: 3,
      name: 'Fantasy Football Friends',
      emoji: '🏈',
      members: 6,
      sport: 'Football',
      description: 'Sunday hangouts with friends. Fantasy football for bragging rights only!',
      hasFriends: false,
      friendsPlaying: []
    }
  ];

  const filteredGroups = filter === 'friends' 
    ? groups.filter(group => group.hasFriends) 
    : groups;

  return (
    <div className="flex flex-col h-screen bg-background-darker">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Friend Groups</h1>
        <p className="text-text-light text-sm mb-6">Play fantasy sports with your friends - no money required!</p>
        
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setFilter('friends')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${filter === 'friends' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            Friends Active
          </button>
          <button 
            onClick={() => setFilter('all')} 
            className={`py-2 px-4 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-primary text-white' : 'bg-black bg-opacity-20 text-text-light'}`}
          >
            All Groups
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-black bg-opacity-20 rounded-custom p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-3xl">
                  <span>{group.emoji}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-text-primary mb-1">{group.name}</h2>
                  <p className="text-xs text-text-light">{group.members} members • {group.sport}</p>
                </div>
                {group.hasFriends && (
                  <div className="flex -space-x-2">
                    {group.friendsPlaying.slice(0, 2).map((friend, index) => (
                      <div key={index} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-darker text-xs font-bold">
                        {friend.charAt(0)}
                      </div>
                    ))}
                    {group.friendsPlaying.length > 2 && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background-darker text-xs font-bold">
                        +{group.friendsPlaying.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-text-light mb-4">{group.description}</p>
              
              {group.hasFriends && (
                <div className="bg-success bg-opacity-10 text-success rounded-custom p-2 mb-4 text-xs font-medium">
                  {group.friendsPlaying.length} friends active in this group
                </div>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={onJoinGroup} 
                  className="flex-1 py-3 bg-primary hover:bg-primary-light text-white border-none rounded-custom text-sm font-semibold cursor-pointer transition-colors"
                >
                  Join Group
                </button>
                <button 
                  className="py-3 px-4 bg-background-dark hover:bg-black text-text-light border-none rounded-custom text-sm font-semibold cursor-pointer transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-6 bg-black bg-opacity-10 border-t border-white border-opacity-5">
        <button className="bg-primary text-white py-3 px-6 rounded-custom font-medium w-full flex items-center justify-center gap-2">
          <span>👥</span>
          <span>Create New Group</span>
        </button>
      </div>
    </div>
  );
};

export default GroupsPanel; 