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

export default db
