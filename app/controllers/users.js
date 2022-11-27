const UserModel = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUsers();

    res.json({
      message: 'GET all users success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.name || !body.address) {
    return res.status(400).json({
      message: 'Data yang dikirimkan tidak lengkap',
      data: null,
    });
  }

  try {
    await UserModel.createNewUser(body);
    res.status(201).json({
      message: 'CREATE new user success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  try {
    await UserModel.updateUser(body, userId);
    res.json({
      message: 'UPDATE user success',
      data: {
        id: userId,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.deleteUser(userId);
    res.json({
      message: 'DELETE user success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
