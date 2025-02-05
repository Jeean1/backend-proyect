import { readDbQuery } from "../config/db/dbQuery.js";

export async function getUserByEmailQuery(email) {
  const sqlSelect = `SELECT * FROM USERS WHERE EMAIL = $1`;

  try {
    const { rows } = await readDbQuery.query(sqlSelect, [email]);
    return rows[0];
  } catch (error) {
    console.error("SQL error: " + error);
    return false;
  }
}
