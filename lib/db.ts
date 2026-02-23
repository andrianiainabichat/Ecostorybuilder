import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');
let db: Database.Database | null = null;
let initialized = false;

export function getDatabase() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    
    // Auto-initialize on first connection
    if (!initialized) {
      initDatabase();
      initialized = true;
    }
  }
  return db;
}

export function initDatabase() {
  const database = getDatabase();
  
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
}

export function createStory(story: {
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  location_name: string;
  theme: string;
  author: string;
  points: number;
}) {
  const database = getDatabase();
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
}

export function getAllStories() {
  const database = getDatabase();
  const stmt = database.prepare('SELECT * FROM stories ORDER BY created_at DESC');
  return stmt.all();
}

export function getLeaderboard() {
  const database = getDatabase();
  const stmt = database.prepare('SELECT * FROM users ORDER BY total_points DESC LIMIT 10');
  return stmt.all();
}