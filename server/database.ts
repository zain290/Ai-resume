import Database from 'better-sqlite3'

const db = new Database('resumes.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    job_description TEXT,
    overall_score INTEGER,
    xyz_feedback TEXT,
    missing_keywords TEXT,
    matched_keywords TEXT,
    overall_summary TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS rate_limits (
    device_key TEXT NOT NULL,
    window_start TEXT NOT NULL,
    request_count INTEGER DEFAULT 0,
    PRIMARY KEY (device_key, window_start)
  )
`)

export default db
