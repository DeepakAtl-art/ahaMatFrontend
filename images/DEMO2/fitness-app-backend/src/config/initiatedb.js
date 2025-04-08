import { pool } from '../config/db.js';
import fs from 'fs';
import path from 'path';

export const initializeDatabase = async () => {
  try {
    const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    await pool.query(schema);
    console.log('✅ Database schema initialized.');
  } catch (error) {
    console.error('❌ Error initializing DB schema:', error);
  }
};
