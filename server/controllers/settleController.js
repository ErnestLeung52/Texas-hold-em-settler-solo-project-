const db = require('../models/dbModels');

const settleController = {};

// GET all users
settleController.getUser = async (req, res, next) => {
  try {
    const getUserQuery = `
        SELECT * FROM accounts;
        `;
    const allUser = await db.query(getUserQuery);
    res.json(allUser.rows);
    return next();
  } catch (error) {
    return next({
      log: 'Express error in getUser middleware',
      status: 400,
      message: {
        err: `settleController.getUser: ERROR: ${error}`,
      },
    });
  }
};

// GET one user
settleController.getOneUser = async (request, response) => {
  const { id } = request.params;
  const param = [id];
  try {
    const getOneUser = `
      SELECT * FROM accounts
      WHERE user_id = $1;
    `;

    const targetUser = await db.query(getOneUser, param);

    response.status(200).json(targetUser.rows); // array
  } catch (error) {
    return next({
      log: 'Express error in getOneUser middleware',
      status: 400,
      message: {
        err: `settleController.getOneUser: ERROR: ${JSON.stringify(error)}`,
      },
    });
  }
};

// UPDATE one user with Closing Price
settleController.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { balance } = req.body;
  const param = [balance, id];
  try {
    const updateUserQuery = `
      UPDATE accounts
      SET balance = $1
      WHERE user_id = $2
      `;
    const updateUser = await db.query(updateUserQuery, param);
    res.json(updateUser.rows);
    return next();
  } catch (error) {
    return next({
      log: 'Express error in updateUser middleware',
      status: 400,
      message: {
        err: `settleController.updateUser: ERROR: ${error}`,
      },
    });
  }
};

// CREATE one user
settleController.createUser = async (req, res) => {
  // Receive corresponding data from client's entry
  const { fullname, buyin, ending } = req.body.user;
  const profit = ending - buyin;
  const balance = profit;
  const param = [fullname, buyin, ending, profit, balance];
  try {
    const newUserQuery = `
    INSERT INTO accounts(fullname, buyin, ending, profit, balance)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `;
    // RETURNING * to get data back
    const newUser = await db.query(newUserQuery, param);

    res.json({ user: newUser });
    // return next();
  } catch (error) {
    return {
      log: 'Express error in createUser middleware',
      status: 400,
      message: {
        err: `settleController.createUser: ERROR: ${error}`,
      },
    };
  }
};

settleController.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const param = [id];
  try {
    const deleteUserQuery = `
        DELETE FROM accounts
        WHERE user_id = $1;
        `;
    const deleteUser = await db.query(deleteUserQuery, param);
    res.json(deleteUser.rows);
    return next();
  } catch (error) {
    return next({
      log: 'Express error in deleteUser middleware',
      status: 400,
      message: {
        err: `settleController.deleteUser: ERROR: ${error}`,
      },
    });
  }
};

module.exports = settleController;
