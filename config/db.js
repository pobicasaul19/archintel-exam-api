const mongodb = require('mongodb');
const uri = process.env.uri;

// Helper function to get a MongoDB collection dynamically
const getCollection = async (collectionName) => {
  try {
    const client = await mongodb.MongoClient.connect(uri);
    return client.db('DB').collection(collectionName);
  } catch (error) {
    console.log(error)
    throw new Error('Failed to connect to the database.');
  }
};

// Predefined collection loaders for common collections
const loadUserCollection = () => getCollection('user');
const loadCompanyCollection = () => getCollection('company');
const loadArticleCollection = () => getCollection('article');

module.exports = {
  getCollection,
  loadUserCollection,
  loadCompanyCollection,
  loadArticleCollection,
};
