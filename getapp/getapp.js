const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;

// MongoDB connection URL
const mongoURL = 'mongodb://db.modernmenu.in:27017'; 
const dbName = 'mydatabase';
const collectionName = 'mycollection';

// Middleware to parse JSON
app.use(express.json());

// GET endpoint to retrieve data
app.get('/getData', async (req, res) => {
  try {
    // Create MongoDB client
    const mongoClient = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();

    // Access the database and collection
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve data
    const data = await collection.find({}).toArray();

    res.status(200).json(data);
    mongoClient.close();
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
