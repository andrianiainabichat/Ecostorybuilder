// Détection de l'environnement Vercel
const isVercel = process.env.VERCEL === '1';

export interface Story {
  id?: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  location_name: string;
  theme: string;
  author: string;
  points: number;
  created_at?: string;
}

export interface User {
  id?: number;
  username: string;
  total_points: number;
  stories_count: number;
}

// Variables partagées
let _initDatabase: () => void;
let _getDatabase: () => unknown;
let _createStory: (story: {
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  location_name: string;
  theme: string;
  author: string;
  points: number;
}) => number | bigint;
let _getAllStories: () => Story[];
let _getLeaderboard: () => User[];

if (isVercel) {
  // Base de données en mémoire pour Vercel
  const stories: Story[] = [];
  const users: User[] = [];
  let storyIdCounter = 1;
  let userIdCounter = 1;

  _initDatabase = () => {
    console.log('Database initialized (in-memory for Vercel)');
  };

  _getDatabase = () => {
    return null;
  };

  _createStory = (story: {
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    location_name: string;
    theme: string;
    author: string;
    points: number;
  }) => {
    const newStory: Story = {
      id: storyIdCounter++,
      ...story,
      created_at: new Date().toISOString(),
    };
    
    stories.push(newStory);

    const existingUser = users.find(u => u.username === story.author);
    if (existingUser) {
      existingUser.total_points += story.points;
      existingUser.stories_count += 1;
    } else {
      users.push({
        id: userIdCounter++,
        username: story.author,
        total_points: story.points,
        stories_count: 1,
      });
    }

    return newStory.id as number;
  };

  _getAllStories = (): Story[] => {
    return [...stories].sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });
  };

  _getLeaderboard = (): User[] => {
    return [...users]
      .sort((a, b) => b.total_points - a.total_points)
      .slice(0, 10);
  };
} else {
  // SQLite pour développement local
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');

  const dbPath = path.join(process.cwd(), 'database.db');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let db: any = null;
  let initialized = false;

  _getDatabase = () => {
    if (!db) {
      db = new Database(dbPath);
      db.pragma('journal_mode = WAL');
      
      if (!initialized) {
        _initDatabase();
        initialized = true;
      }
    }
    return db;
  };

  _initDatabase = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const database = _getDatabase() as any;
    
    database.exec(`
      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        location_name TEXT NOT NULL,
        theme TEXT NOT NULL,
        author TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        total_points INTEGER DEFAULT 0,
        stories_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_stories_location ON stories(latitude, longitude);
      CREATE INDEX IF NOT EXISTS idx_users_points ON users(total_points DESC);
    `);

    console.log('Database initialized successfully');
  };

  _createStory = (story: {
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    location_name: string;
    theme: string;
    author: string;
    points: number;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const database = _getDatabase() as any;
    const stmt = database.prepare(`
      INSERT INTO stories (title, content, latitude, longitude, location_name, theme, author, points)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      story.title,
      story.content,
      story.latitude,
      story.longitude,
      story.location_name,
      story.theme,
      story.author,
      story.points
    );

    const userStmt = database.prepare(`
      INSERT INTO users (username, total_points, stories_count)
      VALUES (?, ?, 1)
      ON CONFLICT(username) DO UPDATE SET
        total_points = total_points + ?,
        stories_count = stories_count + 1
    `);
    
    userStmt.run(story.author, story.points, story.points);

    return result.lastInsertRowid;
  };

  _getAllStories = (): Story[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const database = _getDatabase() as any;
    const stmt = database.prepare('SELECT * FROM stories ORDER BY created_at DESC');
    return stmt.all() as Story[];
  };

  _getLeaderboard = (): User[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const database = _getDatabase() as any;
    const stmt = database.prepare('SELECT * FROM users ORDER BY total_points DESC LIMIT 10');
    return stmt.all() as User[];
  };
}

// Export des fonctions
export const initDatabase = _initDatabase;
export const getDatabase = _getDatabase;
export const createStory = _createStory;
export const getAllStories = _getAllStories;
export const getLeaderboard = _getLeaderboard;