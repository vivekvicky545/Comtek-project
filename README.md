# Comtek-project

Application:


So as per requirement developed these 3 api calls :
1.	service1.domain.com: Service 1 - Node.js API Application (for storing data in
MongoDB)
2.	service2.domain.com: Service 2 - Node.js API Application (for retrieving data
from MongoDB)
3.	db.domain.com: MongoDB service


So Nodejs API code for Storing the data in MongoDB:

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURL = 'mongodb://db.modernmenu.in:27017';
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



So Nodejs API code for getting  the data in MongoDB:

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



And package.json for install dependencies:


{
  "name": "nodejsapp",
  "version": "1.0.0",
  "description": "accepts data",
  "main": "app.js",
  "dependencies": {
    "express": "^4.17.1",
    "mongodb": "^4.3.1"
  }
}


And dockerfile for send request:

# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["node", "sendapp.js"]



And dockerfile for get request:


# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app
CMD ["node", "getapp.js"]









Docker-compose file for deployment:


version: '3.0'

services:
  send-api:
    container_name: send-api
    build:
      context: ./Comtek-project/sendapp  # Path to the directory containing the Dockerfile for sending data
    ports:
      - "3000:3000"  # Map the container's port 3000 to the host
    networks:
      - my-network

  get-api:
    container_name: get-api
    build:
      context: ./Comtek-project/getapp  # Path to the directory containing the Dockerfile for retrieving data
    ports:
      - "3001:3001"  # Map the container's port 3001 to the host
    networks:
      - my-network

networks:
  my-network:
    driver: bridge  # Use the bridge network driver



FYI docker image and the docker containers:


 





And setting up domain in the GoDaddy website:


 


And making the API calls for Storedata in mongodb and getting data from mongodb:

API calls for storedata:


 

 


FYI for inf in mongodb:


 


 


API calls for getdata:


 




GitHub link  for project code:

Repo link:    https://github.com/vivekvicky545/Comtek-project.git

And accessing links:  

storedata:

http://service1.modernmenu.in:3000/storeData

input json:


{
  "name": "sampleinput1",
  "age": 25,
  "email": "vivek545@example.com",
  "address": {
    "street": "Gachibowli",
    "city": "Hyderabad",
    "country": "India"
  }
}



Retrieve data:

http://service2.modernmenu.in:3001/getData


