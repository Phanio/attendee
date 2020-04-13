const PostgresStore = require('../utils/PostgresStore.js') 

class Attendee {
  /** @type {Number} */
  id;
  /** @type {String} */
  name; 
  /** @type {Number}  */
  age;

  /**
   * @param {Number} id
   * @returns {Promise<Attendee>}
   */
  static async getById (id) {
    const result = await PostgresStore.client.query({
      text: `SELECT * FROM ${Attendee.tableName} WHERE id=$1`,
      values: [id]
    });
    return result.rows[0];
  }

  static async getAll () {
    const result = await PostgresStore.client.query(
      `SELECT * FROM ${Attendee.tableName}`
    );
    return result.rows;
  }

  /**
   * @param {Number} userId
   * @returns {Promise<Attendee[]>}
   */
  static async getByUserId (userId) {
    const result = await PostgresStore.client.query({
      text: `
      SELECT * FROM ${Attendee.tableName}  
      WHERE user_id=$1`,
      values: [userId]
    });
    return result.rows;
  }

  /**
    * @param {{name: String}} params 
    * @returns {Promise<Attendee>}
    */
  static async update (params) {
    const result = await PostgresStore.client.query({
      text: `UPDATE ${Attendee.tableName} SET name = $1, age=$2
        WHERE id=$3 RETURNING *`,
      values: [params.name,params.age, params.id]
    });
    debug('result', result.rows[0]);
    return result.rows[0];
  }

  /**
   * @param {{name: String}} params
   * @returns {Promise<Attendee>}
   */
  static async create (params, userId) {
    const result = await PostgresStore.client.query({
      text: `INSERT INTO ${Attendee.tableName} (name, age, user_id) VALUES ($1, $2,$3)
        RETURNING *`,
      values: [params.name, params.age, userId]
    });
    return result.rows[0];
  }

  
  /**
   * @param {Number} userId
   * @param {Number} id
   */
  static async remove (id, userId) {
    await PostgresStore.client.query({
      text: `DELETE FROM ${Attendee.tableName} WHERE and id=$1 and user_id=$2`,
      values: [id, userId]
    });
  }
 
} 
/** @type {String} */
Attendee.tableName = 'attendees';
Attendee.exports = Attendee
