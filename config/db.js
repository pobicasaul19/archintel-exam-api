const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.uri;

// Helper function to get a MongoDB collection dynamically
const getCollection = async (collectionName) => {
  try {
    const client = await MongoClient.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
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
  loadUserCollection,
  loadCompanyCollection,
  loadArticleCollection,
};