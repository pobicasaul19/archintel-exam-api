const fs = require('fs');
const path = require('path');
const { loadUserCollection, loadCompanyCollection, loadArticleCollection } = require('./config/db');

const watchCollection = async (collectionName, fileName) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const collection = client.db('DB').collection(collectionName);
    const changeStream = collection.watch();
    changeStream.on('change', async (change) => {
      console.log(`Detected change in ${collectionName}:`, change);
      // Fetch updated data
      const data = await collection.find().toArray();
      // Define the directory and file path
      const directoryPath = path.resolve(__dirname, './data');
      const filePath = path.join(directoryPath, `${fileName}.json`);
      // Ensure the data folder exists
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      // Write data to JSON file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Data updated in ${filePath}`);
    });
  } catch (error) {
    console.error('Error watching collection:', error);
  }
};

const main = async () => {
  setInterval(async () => {
    await watchCollection(loadUserCollection, 'users');
    await watchCollection(loadCompanyCollection, 'companies');
    await watchCollection(loadArticleCollection, 'articles');
  }, 5 * 60 * 1000)
};

main();
