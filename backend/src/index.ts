import app from './app.js';
import { env } from './config/env.js';
import { db } from './config/database.js';

async function start() {
  try {
    await db.raw('SELECT 1');
    console.log('Database connected');

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
