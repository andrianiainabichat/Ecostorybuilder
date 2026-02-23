/* eslint-disable @typescript-eslint/no-require-imports */
const { initDatabase } = require('../lib/db');

console.log('Initializing database...');
initDatabase();
console.log('Database initialized successfully!');