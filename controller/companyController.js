const { loadCompanyCollection } = require('../config/db');
const { ObjectId } = require('mongodb')

// Get company list
const getCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const companies = await companyCollection.find({}).toArray();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Create Company
const createCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const { logo, name, status } = req.body;

    if (!logo && !name && !status) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    const companyName = await companyCollection.findOne({ name });
    if (companyName) {
      return res.status(409).json({ message: 'Company already exists.' });
    }

    const counter = await companyCollection.countDocuments();
    const newCompany = {
      id: counter + 1,
      logo,
      name,
      status
    };

    await companyCollection.insertOne(newCompany);
    res.status(201).json({
      data: { company: newCompany },
      metadata: { message: 'Company created successfully.' }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit company
const editCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const { _id } = req.params;
    const { logo, name, status } = req.body;

    if (!logo || !name || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const newId = new ObjectId(_id);
    const company = await companyCollection.findOne({ _id: newId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    };

    const updateCompany = {
      logo,
      name,
      status
    };
    await companyCollection.updateOne(
      { _id: newId },
      { $set: updateCompany }
    );
    res.status(200).json({
      data: { ...updateCompany },
      metadata: { message: 'Company updated successfully' }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getCompany, createCompany, editCompany };
