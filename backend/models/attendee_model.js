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
  static async update (id,params,userId) {
    const result = await PostgresStore.client.query({
      text: `UPDATE ${Attendee.tableName} SET fullname = $1, age=$2
        WHERE id=$3 and user_id=$4 RETURNING *`,
      values: [params.fullname,params.age, id,userId]
    }); 
    if(result){
      return result.rows[0];
    }
    return null;
  }

  /**
   * @param {{name: String}} params
   * @returns {Promise<Attendee>}
   */
  static async create (params, userId) {
    const result = await PostgresStore.client.query({
      text: `INSERT INTO ${Attendee.tableName} (fullname, age, user_id) VALUES ($1, $2,$3)
        RETURNING *`,
      values: [params.fullname, params.age, userId]
    });
    return result.rows[0];
  }

  
  /**
   * @param {Number} userId
   * @param {Number} id
   */
  static async remove (id, userId) {
    const result= await PostgresStore.client.query({
      text: `DELETE FROM ${Attendee.tableName} WHERE id=$1 and user_id=$2 RETURNING *`,
      values: [id, userId]
    });
    if(result){
      return result.rows[0];
    }
    return null;
  }
 
} 
/** @type {String} */
Attendee.tableName = 'attendees';
module.exports = Attendee;
