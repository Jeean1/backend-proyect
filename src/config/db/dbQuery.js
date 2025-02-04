import { db, readDb } from './pool.js';

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {Promise} promise
   */
  async query(queryText, params) {
    return await db.result(queryText, params);
  }
};

export const readDbQuery = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {Promise} promise
   */
  async query(queryText, params) {
    return await readDb.result(queryText, params);
  }
};

export { db };
