import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const enterApp = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-darker">
      <Head>
        <title>HoopStack Fantasy Sports</title>
        <meta name="description" content="Join the ultimate daily fantasy sports experience" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen p-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-text-primary">
            <span className="text-primary">Hoop</span>Stack
          </h1>
          <p className="text-xl text-text-light max-w-lg mx-auto">
            Fantasy sports reimagined. Play with friends, chat live, and share the excitement.
          </p>
        </div>
        
        <div className="flex flex-col gap-8 items-center mb-12 w-full max-w-md">
          <div className="bg-black bg-opacity-20 rounded-custom p-6 w-full">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-semibold text-primary">FRIENDS GAME NIGHT</span>
              <span className="text-sm font-semibold text-notification">STARTING SOON</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-text-primary">NBA All-Stars Showdown</h2>
            <p className="text-text-light text-sm mb-4">Tonight at 7:00 PM ET • 8 Friends Playing</p>
            <div className="flex justify-between text-xs">
              <span className="text-text-light">Casual Mode • No Entry Fee</span>
              <span className="text-success">Join Now</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center w-full bg-black bg-opacity-20 rounded-custom p-4">
            <div className="flex space-x-1 -space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background-darker text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background-darker text-xs font-bold">TK</div>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background-darker text-xs font-bold">MP</div>
              <div className="w-8 h-8 rounded-full bg-notification flex items-center justify-center border-2 border-background-darker text-xs font-bold">+5</div>
            </div>
            <p className="text-text-light text-xs">Your friends are already playing!</p>
          </div>
          
          <button 
            onClick={enterApp}
            className="bg-primary hover:bg-primary-light text-white text-xl font-bold py-5 px-8 rounded-custom w-full transition-colors duration-300 transform hover:scale-105"
          >
            Enter App
          </button>
        </div>
        
        <div className="flex gap-6 justify-center mb-6">
          <div className="bg-black bg-opacity-20 p-4 rounded-custom flex flex-col items-center">
            <span className="text-3xl mb-2">👥</span>
            <span className="text-sm font-semibold">Play with Friends</span>
          </div>
          <div className="bg-black bg-opacity-20 p-4 rounded-custom flex flex-col items-center">
            <span className="text-3xl mb-2">💬</span>
            <span className="text-sm font-semibold">Live Chat</span>
          </div>
          <div className="bg-black bg-opacity-20 p-4 rounded-custom flex flex-col items-center">
            <span className="text-3xl mb-2">🏆</span>
            <span className="text-sm font-semibold">Social Leaderboards</span>
          </div>
        </div>
        
        <p className="text-text-light text-sm max-w-md">
          HoopStack is designed for fun social gameplay with friends - no real money required!
        </p>
      </main>
      
      <footer className="p-4 text-center text-text-light opacity-70 text-sm">
        <p>© 2025 HoopStack Fantasy Sports. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 