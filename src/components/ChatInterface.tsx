import React, { useState } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  reactions?: number;
  isTaunt?: boolean;
  tauntEmojis?: string[];
}

const ChatInterface: React.FC = () => {
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
      isTaunt: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showTauntMenu, setShowTauntMenu] = useState(false);

  const taunts = [
    "My lineup is crushing yours tonight! 🏆",
    "That player choice is going to haunt you! 👻",
    "I'm up by 50 points already! 🔥",
    "My sleeper pick is going off! 💯",
    "Better luck next week! 🍀",
    "Your team is getting destroyed! 💣",
    "Should have drafted who I told you! 🧠",
    "This isn't even fair anymore! ⚖️",
    "Did you even check the injury report? 🚑",
    "My grandma could've made a better lineup! 👵",
    "This is what fantasy expertise looks like! 📈",
    "Your fantasy strategy is laughable! 🤣",
    "I knew you'd fall for that trade bait! 🎣",
    "MVP in my lineup, benchwarmer in yours! 🪑",
    "Can't believe you're starting THAT player! 😱"
  ];

  const handleSendMessage = (text = newMessage, isTaunt = false) => {
    if (text.trim()) {
      // Generate random taunt emojis if this is a taunt
      const tauntEmojis = isTaunt ? 
        ['🔥', '💥', '😎', '🏆', '👑'].sort(() => 0.5 - Math.random()).slice(0, 3) : 
        undefined;
      
      const newMsg: Message = {
        id: messages.length + 1,
        user: 'You',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: 0,
        isTaunt,
        tauntEmojis
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setShowTauntMenu(false);
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

  return (
    <div className="flex flex-col h-screen bg-background-darker">
      <div className="flex items-center justify-between p-4 bg-black bg-opacity-20 border-b border-white border-opacity-5">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-text-primary">Monday Night Hoopers</h2>
          <p className="text-xs text-text-light opacity-80">Fantasy Basketball • 8 members</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-primary px-2 py-1 rounded text-xs font-semibold">1000 coins</span>
          <span className="bg-success px-2 py-1 rounded text-xs font-semibold">Active Contest</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.isTaunt ? 'shadow-lg' : ''}`}>
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
                      className="text-lg animate-bounce" 
                      style={{ 
                        animationDelay: `${i * 0.15}s`,
                        transform: `rotate(${(i - 1) * 15}deg)`
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="text-xs py-1 px-2 bg-white bg-opacity-5 rounded-xl text-text-light flex items-center">
                  <span className="mr-1">👍</span>
                  <span>{message.reactions}</span>
                </div>
                <button className="bg-white bg-opacity-10 text-text-light text-xs font-semibold py-1 px-2 rounded">
                  REPLY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 flex items-center gap-2 border-t border-white border-opacity-5">
        <button 
          className="bg-transparent border-none text-text-light text-xl flex items-center justify-center w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10"
          onClick={() => setShowTauntMenu(!showTauntMenu)}
        >
          <span>🔥</span>
        </button>
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="w-full bg-white bg-opacity-5 border-none rounded-full py-3 px-4 text-text-primary text-sm focus:outline-none focus:bg-white focus:bg-opacity-10"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {showTauntMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-background-dark rounded-xl shadow-medium overflow-hidden">
              <div className="p-2 border-b border-white border-opacity-10">
                <h4 className="text-xs font-semibold text-notification flex items-center gap-1">
                  <span>🔥</span>
                  <span>SEND A TAUNT</span>
                </h4>
                <div className="flex mt-2 gap-1">
                  <button className="bg-black bg-opacity-30 p-1 rounded flex-1 text-xs text-text-light">🔥 Savage</button>
                  <button className="bg-black bg-opacity-30 p-1 rounded flex-1 text-xs text-text-light">🤣 Funny</button>
                  <button className="bg-black bg-opacity-30 p-1 rounded flex-1 text-xs text-text-light">🏆 Boasting</button>
                </div>
              </div>
              <div className="p-2 max-h-48 overflow-y-auto">
                <div className="mb-2">
                  <p className="text-xs font-medium text-primary mb-1">🔥 Savage Taunts</p>
                  <button 
                    onClick={() => sendTaunt("Your team is getting destroyed! 💣")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Your team is getting destroyed! 💣
                  </button>
                  <button 
                    onClick={() => sendTaunt("My grandma could've made a better lineup! 👵")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    My grandma could've made a better lineup! 👵
                  </button>
                  <button 
                    onClick={() => sendTaunt("Your fantasy strategy is laughable! 🤣")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Your fantasy strategy is laughable! 🤣
                  </button>
                  <button 
                    onClick={() => sendTaunt("Can't believe you're starting THAT player! 😱")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Can't believe you're starting THAT player! 😱
                  </button>
                </div>
                
                <div className="mb-2">
                  <p className="text-xs font-medium text-secondary mb-1">🏆 Boasting Taunts</p>
                  <button 
                    onClick={() => sendTaunt("My lineup is crushing yours tonight! 🏆")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    My lineup is crushing yours tonight! 🏆
                  </button>
                  <button 
                    onClick={() => sendTaunt("I'm up by 50 points already! 🔥")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    I'm up by 50 points already! 🔥
                  </button>
                  <button 
                    onClick={() => sendTaunt("My sleeper pick is going off! 💯")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    My sleeper pick is going off! 💯
                  </button>
                  <button 
                    onClick={() => sendTaunt("This is what fantasy expertise looks like! 📈")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    This is what fantasy expertise looks like! 📈
                  </button>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-accent mb-1">😈 Trash Talk</p>
                  <button 
                    onClick={() => sendTaunt("That player choice is going to haunt you! 👻")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    That player choice is going to haunt you! 👻
                  </button>
                  <button 
                    onClick={() => sendTaunt("Better luck next week! 🍀")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Better luck next week! 🍀
                  </button>
                  <button 
                    onClick={() => sendTaunt("Should have drafted who I told you! 🧠")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Should have drafted who I told you! 🧠
                  </button>
                  <button 
                    onClick={() => sendTaunt("Did you even check the injury report? 🚑")}
                    className="w-full text-left p-2 hover:bg-white hover:bg-opacity-5 rounded text-sm text-text-light"
                  >
                    Did you even check the injury report? 🚑
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button 
          className="bg-primary border-none text-text-primary text-xl flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary-light"
          onClick={() => handleSendMessage()}
        >
          <span>📤</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface; 