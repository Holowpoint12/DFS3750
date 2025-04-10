import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  reactions?: number;
  isTaunt?: boolean;
  tauntEmojis?: string[];
  isNew?: boolean;
  replyTo?: number;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  role?: 'admin' | 'moderator' | 'member';
}

const ChatInterface: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'CoachJames',
      text: "Who should I start as my flex this week? I'm torn between Cooper Kupp and Austin Ekeler 🤔",
      time: '10:23 AM',
      reactions: 3
    },
    {
      id: 2,
      user: 'FantasyKing',
      text: "Definitely Ekeler against that weak run defense! Kupp is still recovering from injury.",
      time: '10:24 AM',
      reactions: 5
    },
    {
      id: 3,
      user: 'DraftWizard',
      text: "I disagree. Kupp will get at least 10 targets with Stafford back. High floor in PPR.",
      time: '10:26 AM',
      reactions: 4
    },
    {
      id: 4,
      user: 'StatGuru',
      text: "The stats favor Kupp here. 11.3 projected points vs 9.7 for Ekeler. Volume is king! 📊",
      time: '10:28 AM',
      reactions: 7,
      isTaunt: true,
      tauntEmojis: ['📊', '🔥', '📈']
    }
  ]);

  const [activeUsers, setActiveUsers] = useState<ChatUser[]>([
    { id: 1, name: 'CoachJames', avatar: 'CJ', status: 'online', role: 'admin' },
    { id: 2, name: 'FantasyKing', avatar: 'FK', status: 'online' },
    { id: 3, name: 'DraftWizard', avatar: 'DW', status: 'online' },
    { id: 4, name: 'StatGuru', avatar: 'SG', status: 'away' },
    { id: 5, name: 'HoopMaster', avatar: 'HM', status: 'offline' },
    { id: 6, name: 'You', avatar: 'YO', status: 'online' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showTauntMenu, setShowTauntMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'game' | 'taunts'>('all');

  // Taunt categories
  const tauntCategories = {
    savage: [
      "Your fantasy strategy is laughable! 🤣",
      "My lineup is destroying yours tonight! 💣",
      "Did you even check the injury report? 🚑",
      "My grandma could've made a better lineup! 👵",
      "Can't believe you're starting THAT player! 😱"
    ],
    funny: [
      "Your team fell harder than that viral basketball fail! 🏀",
      "Is your fantasy app glitching or is that really your lineup? 🤔",
      "The only triple-double you'll see is in your loss column! 📉",
      "You're getting benched from your own fantasy team! 🪑",
      "Your roster looks like a hospital waiting room! 🤕"
    ],
    boasting: [
      "My lineup is crushing yours tonight! 🏆",
      "I'm up by 50 points already! 🔥",
      "My sleeper pick is going off! 💯",
      "This is what fantasy expertise looks like! 📈",
      "MVP in my lineup, benchwarmer in yours! 💪"
    ],
    gameSpecific: [
      "Jokić's triple-double just buried your chances! 🃏",
      "My guards are dropping 3s while yours drop passes! 🎯",
      "That's another 30-point game for my captain! 🚀",
      "Did you see that crossover? Your defense is non-existent! 👟",
      "My center is dominating the paint against your lineup! 🛡️"
    ]
  };

  // Combine all taunts for the 'all' tab
  const allTaunts = [
    ...tauntCategories.savage,
    ...tauntCategories.funny,
    ...tauntCategories.boasting,
    ...tauntCategories.gameSpecific
  ];

  // Common emojis for quick reactions
  const commonEmojis = ['👍', '❤️', '😂', '😮', '🔥', '👏', '🙌', '🏆', '😢', '👎'];
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
    
    // Mark new messages as not new after animation completes
    const timer = setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => ({ ...msg, isNew: false }))
      );
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [messages]);
  
  // Simulate other users sending messages
  useEffect(() => {
    const gameUpdates = [
      "Curry just hit his 6th three-pointer! 🔥",
      "Giannis with another monster dunk! 15 points already.",
      "Jokić is flirting with a triple-double in the first half!",
      "Mitchell is heating up! Back-to-back buckets.",
      "Tatum with the clutch steal and dunk! +4 fantasy points."
    ];
    
    const timer = setInterval(() => {
      // 20% chance of sending a game update message
      if (Math.random() < 0.2) {
        const randomUser = activeUsers.filter(user => user.name !== 'You')[
          Math.floor(Math.random() * (activeUsers.length - 1))
        ];
        const gameUpdate = gameUpdates[Math.floor(Math.random() * gameUpdates.length)];
        
        const newMsg: Message = {
          id: messages.length + 1,
          user: randomUser.name,
          text: gameUpdate,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reactions: 0,
          isNew: true
        };
        
        setMessages(prev => [...prev, newMsg]);
      }
    }, 20000); // Every 20 seconds
    
    return () => clearInterval(timer);
  }, [activeUsers, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text = newMessage, isTaunt = false) => {
    if (text.trim()) {
      // Generate random taunt emojis if this is a taunt
      const tauntEmojis = isTaunt ? 
        ['🔥', '💥', '😎', '🏆', '👑', '📊', '🚀', '⚡', '💪', '🎯']
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 2) + 3) : 
        undefined;
      
      const newMsg: Message = {
        id: messages.length + 1,
        user: 'You',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: 0,
        isTaunt,
        tauntEmojis,
        isNew: true,
        replyTo: replyingTo || undefined
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setShowTauntMenu(false);
      setShowEmojiPicker(false);
      setReplyingTo(null);
      
      // Simulate reaction to taunt after a short delay
      if (isTaunt) {
        setTimeout(() => {
          const randomUser = activeUsers.filter(user => user.name !== 'You')[
            Math.floor(Math.random() * (activeUsers.length - 1))
          ];
          
          const responses = [
            "Nice try with that taunt! My lineup will have the last laugh 😏",
            "Taunt all you want, the game's not over yet! 🔄",
            "Wow, someone's feeling confident today! Let's see how it ends 🧐",
            "I'm saving this message for when the tables turn 📱",
            "Bold words for someone in comeback range! ⚠️"
          ];
          
          const responseMsg: Message = {
            id: messages.length + 2,
            user: randomUser.name,
            text: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reactions: 0,
            isNew: true,
            replyTo: messages.length + 1
          };
          
          setMessages(prev => [...prev, responseMsg]);
        }, 4000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const sendTaunt = (taunt: string) => {
    handleSendMessage(taunt, true);
  };
  
  const handleReaction = (messageId: number) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, reactions: (msg.reactions || 0) + 1 } : msg
      )
    );
  };
  
  const handleReply = (messageId: number) => {
    setReplyingTo(messageId);
  };
  
  const cancelReply = () => {
    setReplyingTo(null);
  };
  
  const getMessageById = (id: number | undefined) => {
    if (!id) return null;
    return messages.find(msg => msg.id === id);
  };

  return (
    <div className="flex flex-col h-screen bg-background-darker">
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-20 border-b border-white border-opacity-5">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-text-primary">Monday Night Hoopers</h2>
          <p className="text-xs text-text-light opacity-80">Fantasy Basketball • 8 members • Live Game Chat</p>
        </div>
        <div className="flex gap-2">
          <div className="flex -space-x-2">
            {activeUsers.filter(user => user.status === 'online').slice(0, 3).map((user, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background-dark text-xs font-bold text-white">
                {user.avatar}
              </div>
            ))}
            {activeUsers.filter(user => user.status === 'online').length > 3 && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-dark text-xs font-bold text-white">
                +{activeUsers.filter(user => user.status === 'online').length - 3}
              </div>
            )}
          </div>
          <span className="bg-success px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="h-2 w-2 bg-white rounded-full"></span>
            <span>LIVE</span>
          </span>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-10 px-4 py-2 flex border-b border-white border-opacity-5">
        <button 
          onClick={() => setActiveTab('all')}
          className={`mr-4 text-sm font-medium ${activeTab === 'all' ? 'text-primary' : 'text-text-light'}`}
        >
          All Chat
        </button>
        <button 
          onClick={() => setActiveTab('game')}
          className={`mr-4 text-sm font-medium ${activeTab === 'game' ? 'text-primary' : 'text-text-light'}`}
        >
          Game Updates
        </button>
        <button 
          onClick={() => setActiveTab('taunts')}
          className={`text-sm font-medium ${activeTab === 'taunts' ? 'text-primary' : 'text-text-light'}`}
        >
          Taunts Only
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages
          .filter(msg => {
            if (activeTab === 'all') return true;
            if (activeTab === 'game') return !msg.isTaunt;
            if (activeTab === 'taunts') return msg.isTaunt;
            return true;
          })
          .map((message) => (
            <div 
              key={message.id} 
              className={`flex gap-3 ${message.isTaunt ? 'shadow-md rounded-lg p-2' : ''} ${message.isNew ? 'chat-message-new' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                message.isTaunt 
                  ? 'bg-notification border-2 border-notification border-opacity-30 taunt-avatar' 
                  : 'bg-primary'
                } text-text-primary`}
              >
                <span>{message.user.charAt(0)}</span>
              </div>
              <div className={`flex-1 ${message.isTaunt ? 'transform hover:scale-105 transition-transform' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${message.isTaunt ? 'text-notification' : 'text-text-primary'}`}>{message.user}</span>
                  <span className="text-xs text-text-light opacity-60">{message.time}</span>
                  {message.isTaunt && (
                    <span className="text-xs bg-notification text-white px-2 py-0.5 rounded-full flex items-center gap-1 taunt-badge">
                      <span>🔥</span>
                      <span>TAUNT</span>
                    </span>
                  )}
                </div>
                
                {message.replyTo && (
                  <div className="bg-black bg-opacity-20 px-3 py-1 rounded-lg mb-2 text-xs text-text-light border-l-2 border-primary">
                    <span className="font-medium text-primary">@{getMessageById(message.replyTo)?.user}</span>: {getMessageById(message.replyTo)?.text.length! > 40 ? 
                      `${getMessageById(message.replyTo)?.text.substring(0, 40)}...` : 
                      getMessageById(message.replyTo)?.text}
                  </div>
                )}
                
                <p className={`mb-2 leading-relaxed ${
                  message.isTaunt 
                    ? 'text-notification font-medium bg-notification bg-opacity-10 p-2 rounded-lg border-l-4 border-notification taunt-message'
                    : ''
                }`}>{message.text}</p>
                
                {message.isTaunt && message.tauntEmojis && (
                  <div className="flex justify-end mb-2 -mt-1">
                    {message.tauntEmojis.map((emoji, i) => (
                      <span 
                        key={i} 
                        className="text-xl taunt-emoji" 
                        style={{ 
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${1.5 + i * 0.5}s`
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <div 
                    className="text-xs py-1 px-2 bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-10 rounded-xl text-text-light flex items-center cursor-pointer"
                    onClick={() => handleReaction(message.id)}
                  >
                    <span className="mr-1">👍</span>
                    <span>{message.reactions}</span>
                  </div>
                  <button 
                    className="bg-white bg-opacity-10 hover:bg-opacity-15 text-text-light text-xs font-semibold py-1 px-2 rounded"
                    onClick={() => handleReply(message.id)}
                  >
                    REPLY
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {replyingTo && (
        <div className="p-2 mx-4 mb-2 bg-black bg-opacity-20 rounded-lg border-l-2 border-primary flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-primary font-medium mr-2">Replying to @{getMessageById(replyingTo)?.user}</span>
            <span className="text-xs text-text-light truncate">{getMessageById(replyingTo)?.text}</span>
          </div>
          <button onClick={cancelReply} className="text-text-light hover:text-primary text-xs">✕</button>
        </div>
      )}

      <div className="p-4 flex items-center gap-2 border-t border-white border-opacity-5">
        <button 
          className="bg-transparent border-none text-text-light text-xl flex items-center justify-center w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            setShowTauntMenu(!showTauntMenu);
            setShowEmojiPicker(false);
          }}
        >
          <span>🔥</span>
        </button>
        
        <button 
          className="bg-transparent border-none text-text-light text-xl flex items-center justify-center w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowTauntMenu(false);
          }}
        >
          <span>😀</span>
        </button>
        
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder={replyingTo ? "Type your reply..." : "Type a message..."}
            className="w-full bg-white bg-opacity-5 border-none rounded-full py-3 px-4 text-text-primary text-sm focus:outline-none focus:bg-white focus:bg-opacity-10"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 bg-background-dark rounded-xl shadow-medium overflow-hidden p-2 w-72">
              <h4 className="text-xs font-semibold text-primary mb-2 px-2">Quick Emoji Reactions</h4>
              <div className="grid grid-cols-5 gap-2">
                {commonEmojis.map((emoji, index) => (
                  <button 
                    key={index}
                    className="w-10 h-10 bg-black bg-opacity-30 hover:bg-primary hover:bg-opacity-20 rounded-lg flex items-center justify-center text-xl transition-all"
                    onClick={() => setNewMessage(prev => prev + emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {showTauntMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-background-dark rounded-xl shadow-medium overflow-hidden">
              <div className="p-2 border-b border-white border-opacity-10">
                <h4 className="text-xs font-semibold text-notification flex items-center gap-1">
                  <span>🔥</span>
                  <span>SEND A TAUNT</span>
                </h4>
                <div className="flex mt-2 gap-1">
                  <button 
                    className={`p-1 rounded flex-1 text-xs ${activeTab === 'savage' ? 'bg-notification text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                    onClick={() => setActiveTab('savage' as any)}
                  >
                    🔥 Savage
                  </button>
                  <button 
                    className={`p-1 rounded flex-1 text-xs ${activeTab === 'funny' ? 'bg-notification text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                    onClick={() => setActiveTab('funny' as any)}
                  >
                    🤣 Funny
                  </button>
                  <button 
                    className={`p-1 rounded flex-1 text-xs ${activeTab === 'boasting' ? 'bg-notification text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                    onClick={() => setActiveTab('boasting' as any)}
                  >
                    🏆 Boasting
                  </button>
                  <button 
                    className={`p-1 rounded flex-1 text-xs ${activeTab === 'gameSpecific' ? 'bg-notification text-white' : 'bg-black bg-opacity-30 text-text-light'}`}
                    onClick={() => setActiveTab('gameSpecific' as any)}
                  >
                    🏀 Game
                  </button>
                </div>
              </div>
              <div className="p-2 max-h-48 overflow-y-auto">
                {(activeTab === 'savage' || activeTab === 'funny' || activeTab === 'boasting' || activeTab === 'gameSpecific') ? (
                  <>
                    <p className="text-xs font-medium text-primary mb-1">
                      {activeTab === 'savage' && '🔥 Savage Taunts'}
                      {activeTab === 'funny' && '🤣 Funny Taunts'}
                      {activeTab === 'boasting' && '🏆 Boasting Taunts'}
                      {activeTab === 'gameSpecific' && '🏀 Game-Specific Taunts'}
                    </p>
                    <div className="space-y-1">
                      {(activeTab === 'savage' ? tauntCategories.savage :
                        activeTab === 'funny' ? tauntCategories.funny :
                        activeTab === 'boasting' ? tauntCategories.boasting :
                        tauntCategories.gameSpecific).map((taunt, index) => (
                        <button 
                          key={index}
                          className="w-full text-left bg-black bg-opacity-30 hover:bg-notification hover:bg-opacity-20 p-2 rounded text-sm text-text-light"
                          onClick={() => sendTaunt(taunt)}
                        >
                          {taunt}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-medium text-primary mb-1">All Taunts</p>
                    <div className="space-y-1">
                      {allTaunts.slice(0, 10).map((taunt, index) => (
                        <button 
                          key={index}
                          className="w-full text-left bg-black bg-opacity-30 hover:bg-notification hover:bg-opacity-20 p-2 rounded text-sm text-text-light"
                          onClick={() => sendTaunt(taunt)}
                        >
                          {taunt}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        <button 
          className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => handleSendMessage()}
        >
          <span className="transform rotate-90">➤</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface; 