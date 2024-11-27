const bcrypt = require('bcryptjs')
const { loadUserCollection } = require('../config/db');
const { ObjectId } = require('mongodb')

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
    const { firstName, lastName, type, status, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    // Check if the user already exists
    const userExist = await usersCollection.findOne({ firstName });
    if (userExist) {
      return res.status(409).json({ message: 'User lastname already exists.' });
    }

    // Count existing documents to generate a unique ID
    const counter = await usersCollection.countDocuments();
    const newUser = {
      id: counter + 1,
      firstName,
      lastName,
      userName: `${firstName}${lastName}`.toLowerCase(),
      type,
      status,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
    };

    // Insert the new user into the database
    await usersCollection.insertOne(newUser);
    res.status(201).json({
      data: { user: newUser },
      metadata: { message: 'User created successfully.' },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof SomeCustomError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: error.message || 'An error occurred while processing your request.'
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const { _id } = req.params;
    const { firstName, lastName, type, status } = req.body;

    // Validate input
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }
    // Find the user to update
    const newId = new ObjectId(_id);
    const user = await usersCollection.findOne({ _id: newId });
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
      { _id: newId },
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
