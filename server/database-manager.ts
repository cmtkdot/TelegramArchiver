import { Pool } from 'pg';

export class DatabaseManager {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async get_channels() {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM channels');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async get_media() {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM media');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async get_channel_stats() {
    const client = await this.pool.connect();
    try {
      const result = await client.query(`
        SELECT 
          COUNT(DISTINCT c.id) as channel_count,
          COUNT(m.id) as media_count,
          COALESCE(SUM(m.file_size), 0) as total_size
        FROM channels c
        LEFT JOIN media m ON c.id = m.channel_id
      `);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
} 