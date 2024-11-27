import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import path from 'path';
import logger from './logger';

const envFile = ".env";
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true, // Ensure numeric precision for decimal values
};

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
      const [result] = await pool.query('SELECT 1');
      logger.info('Database connection successful');
  } catch (err: any) {
      logger.error('Database connection error');
      process.exit(1);
  }
})();

export { pool };