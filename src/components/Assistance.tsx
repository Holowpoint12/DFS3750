import React from 'react';

const Assistance: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-background-darker p-6 text-text-light overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-text-primary">App Assistance & Information</h1>

      <section className="mb-8 bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 p-4 rounded-custom shadow-sm border border-white border-opacity-5 dark:border-black dark:border-opacity-5">
        <h2 className="text-xl font-semibold mb-3 text-primary">How HoopStack Works</h2>
        <p className="mb-2">Welcome to HoopStack! Here's a quick guide to get you started:</p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Home Screen:</strong> Your central hub for game night info, taunts, and navigation.
          </li>
          <li>
            <strong>Friend Groups (👥):</strong> Manage your friend connections and see who's online.
          </li>
          <li>
            <strong>Clans (🛡️):</strong> Create or join clans to team up with friends for challenges.
          </li>
          <li>
            <strong>Game Chat (💬):</strong> Real-time chat during live games. Discuss plays, send taunts!
          </li>
          <li>
            <strong>Leaderboard (🏆):</strong> See how you stack up against your friends in contests.
          </li>
          <li>
            <strong>Live Feed (Join Stream):</strong> Watch a live stream (placeholder video) while chatting and reacting.
          </li>
          <li>
            <strong>View Results (📊):</strong> Check your fantasy lineup performance after contests end.
          </li>
           <li>
            <strong>Taunts (🔥 or 🎭):</strong> Send fun, animated emojis and messages to your friends during games or from the results screen.
          </li>
          <li>
            <strong>Theme Toggle (☀️/🌙):</strong> Switch between light and dark mode using the button on the home screen.
          </li>
        </ul>
      </section>

      <section className="mb-8 bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 p-4 rounded-custom shadow-sm border border-white border-opacity-5 dark:border-black dark:border-opacity-5">
        <h2 className="text-xl font-semibold mb-3 text-secondary">Understanding Clans</h2>
        <p className="text-sm mb-2">Clans are teams you can form with friends:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Compete together in Clan Challenges against other clans.</li>
          <li>View clan member stats and leaderboards.</li>
          <li>Coordinate strategies in your dedicated clan chat (feature coming soon!).</li>
        </ul>
      </section>
      
      <section className="mb-8 bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 p-4 rounded-custom shadow-sm border border-white border-opacity-5 dark:border-black dark:border-opacity-5">
        <h2 className="text-xl font-semibold mb-3 text-accent">Fantasy Contests</h2>
        <p className="text-sm mb-2">Join fantasy contests, set your lineup, and track your points in real-time. Remember, HoopStack is about fun and social interaction, not real-money gambling.</p>
      </section>

      <section className="mt-auto pt-6 border-t border-white border-opacity-10 text-center">
        <h2 className="text-lg font-semibold mb-2 text-warning">Responsible Play</h2>
        <p className="text-xs mb-2">While HoopStack is a social platform, we encourage responsible gaming habits. If you or someone you know has concerns about gambling, help is available.</p>
        <p className="text-sm font-medium">
          National Problem Gambling Helpline: 
          <a href="tel:1-800-522-4700" className="text-primary hover:underline ml-1">1-800-522-4700</a>
        </p>
      </section>
    </div>
  );
};

export default Assistance; 