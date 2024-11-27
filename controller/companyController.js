const { loadUserCollection } = require('../config/db');


// Create Company
const createCompany = async (req, res) => {
  try {
    const usersCollection = await loadUserCollection();
    const firstName = req.query.firstName || req.body.firstName;
    const lastName = req.query.lastName || req.body.lastName;
    const type = req.query.type || req.body.type;
    const status = req.query.status || req.body.status;
    const password = req.query.password || req.body.password

    // Validate input
    if (!firstName || !lastName || !type || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const userExist = await usersCollection.findOne({
      $or: [{ firstName }, { lastName }],
    });
    if (userExist) {
      return res.status(409).json({ message: 'User details already exist.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const counter = await usersCollection.countDocuments();
    const newUser = {
      id: counter + 1,
      firstName,
      lastName,
      userName: `${firstName}${lastName}`.toLowerCase(),
      type,
      status,
      password: hashedPassword,
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



module.exports = { createCompany };
