const dbPool = require('../config/database');

const getAllUsers = () => {
  const SQLQuery = 'SELECT * FROM users';

  return dbPool.promise().execute(SQLQuery);
};

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (name, email, address) VALUES ('${body.name}', '${body.email}','${body.address}')`;

  return dbPool.promise().execute(SQLQuery);
};

const updateUser = (body, userId) => {
  const SQLQuery = `UPDATE users SET name='${body.name}', email='${body.email}', address='${body.address}' Where id = ?`;

  return dbPool.promise().execute(SQLQuery, [userId]);
};

const deleteUser = (userId) => {
  const SQLQuery = `DELETE FROM users Where id = ?`;

  return dbPool.promise().execute(SQLQuery, [userId]);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
