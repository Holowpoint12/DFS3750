declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Common types for the application

// Sports Results Types
export interface Player {
  position: string;
  name: string;
  team: string;
  opponent: string;
  points: number;
  stats: string;
  image: string;
}

export interface FriendResult {
  name: string;
  avatar: string;
  total: number;
  position: number;
  bestPlayer: string;
  worstPlayer: string;
}

// Clans Types
export interface ClanMember {
  id: number;
  name: string;
  avatar: string;
  role: 'leader' | 'co-leader' | 'member';
  status: 'online' | 'offline';
  wins: number;
  bestPick: string;
}

export interface Clan {
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

export interface ClanChallenge {
  id: number;
  challenger: string;
  challengerIcon: string;
  type: string;
  date: string;
  isNew: boolean;
}

// Navigation Types
export type PanelType = 'home' | 'groups' | 'chat' | 'results' | 'leaderboard' | 'clans' | 'live' | 'assistance'; 