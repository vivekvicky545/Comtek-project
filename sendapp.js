const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURL = 'mongodb://54.205.172.190:27017';
const dbName = 'mydatabase';
const collectionName = 'mycollection';

// Middleware to parse JSON
app.use(express.json());

// POST endpoint to store data
app.post('/storeData', async (req, res) => {
  try {
    const data = req.body; // Data received in the request body

    // Create MongoDB client
    const mongoClient = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();

    // Access the database and collection
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    // Insert data
    await collection.insertOne(data);

    // Log success and send response
    console.log('Data stored successfully:', data);
    res.status(200).send('Data stored successfully');

    // Close the MongoDB client
    mongoClient.close();
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).send('Error storing data');
  }
});

// GET endpoint for testing purposes
app.get('/storeData', (req, res) => {
  res.status(200).send('GET request received at /storeData');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
