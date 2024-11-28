const { loadCompanyCollection, loadArticleCollection, loadUserCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get article lists
const getArticles = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const article = await articleCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create article
const createArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { company, image, title, link, date, content, status, writer, editor } = req.body;

    // Validate required fields
    if (!company && !image && !title && !link && !content) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate URL format
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(link)) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Validate Company
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = await companyCollection.findOne({ id: company });

    // Check for image file upload
    const imageUrl = image;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required (either upload a file or provide a URL)' });
    }

    // Prepare article data
    const counter = await articleCollection.countDocuments();
    const newArticle = {
      id: counter + 1,
      company: selectedCompany?.name,
      image: imageUrl,
      title,
      link,
      date: date ? new Date(date) : new Date(),
      content,
      status: status || 'For Edit',
      writer: writer || null,
      editor: editor || null,
    };

    await articleCollection.insertOne(newArticle);
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Edit article
const editArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { _id } = req.params;
    const { company, image, title, link, date, content, status, writer, editor } = req.body;

    // Validate Article ID
    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid article ID' });
    }

    const companyCollection = await loadCompanyCollection();
    const selectedCompany = await companyCollection.findOne({ name: company });
    if (!selectedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Update Article
    const newId = new ObjectId(_id);
    const article = await articleCollection.findOne({ _id: newId })
    if (!article) {
      return res.status(404).json({ message: 'Article ID not found' });
    }

    // Prepare update data
    const updateData = {
      ...(company && { company }),
      ...(image && { image }),
      ...(title && { title }),
      ...(link && { link }),
      ...(date && { date: date ? new Date(date) : new Date() }),
      ...(content && { content }),
      ...(status && { status }),
      ...(writer && { writer }),
      ...(editor && { editor }),
    };
    await articleCollection.updateOne(
      { _id: newId },
      { $set: updateData }
    );

    res.status(200).json({
      data: { ...updateData },
      metadata: { message: 'Article updated successfully' }
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getArticles, createArticle, editArticle }