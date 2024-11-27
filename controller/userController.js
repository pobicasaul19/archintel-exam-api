const bcrypt = require('bcryptjs');
const { loadUserCollection } = require('../config/db');

// Get user list
const getUsers = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const users = await usersCollection
      .find({}, { projection: { password: 0 } }) // Exclude passwords
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { firstName, lastName, type, status } = req.query;

    // Validate input
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const userExist = await usersCollection.findOne({
      $or: [{ lastName }],
    });
    if (userExist) {
      return res.status(409).json({ message: 'User lastname already exist.' });
    }

    const counter = await usersCollection.countDocuments();
    const newUser = {
      id: counter + 1,
      firstName,
      lastName,
      userName: `${firstName}${lastName}`.toLowerCase(),
      type,
      status,
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({
      data: { user: { ...newUser } },
      metadata: { message: 'User created successfully.' },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { _id } = req.params;
    const { firstName, lastName, type, status } = req.query || req.body;

    // Validate input
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    // Find the user to update
    const user = await usersCollection.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user fields
    const updatedUser = {
      firstName,
      lastName,
      type,
      status,
    };

    await usersCollection.updateOne(
      { id: parseInt(_id, 10) },
      { $set: updatedUser }
    );

    res.status(200).json({
      data: { ...updatedUser, password: undefined }, // Exclude password from response
      metadata: { message: 'User updated successfully.' },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
};

module.exports = { getUsers, createUser, updateUser };
