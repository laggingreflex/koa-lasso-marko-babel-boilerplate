import { createClient } from 'then-redis';

export const db = createClient();

db.on('ready', () => {
  console.log('Redis db ready!')
  db.select(1, function(err, res) {});
});

db.on('error', err => {
  console.log('Redis db error:', err.message);
  process.exit(1);
});
