const express = require('express');
const app = express();


app.use(express.json());
const cors = require('cors');
app.use(cors())

require('dotenv').config();
const dbConnData = {
  host: process.env.MONGO_HOST || 'my-mongo',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'spis'
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

