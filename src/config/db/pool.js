import dotenv from 'dotenv';
import pgpDB from 'pg-promise';

dotenv.config();

const pgp = pgpDB({
  // Initialization Options
});
const readPgp = pgpDB({
  // Initialization Options
});

export const db = pgp(process.env.DATABASE_URL);

export const readDb = readPgp(process.env.READ_DATABASE_URL);
