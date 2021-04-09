const express = require('express');
const app = express();
const form = require('./routes/Citizen');
const account = require('./routes/Admin');

app.use(express.json());
const cors = require('cors');
app.use(cors())
app.use('/form', form);
app.use('/account', account);

app.post('/ping', (req, res) => {
  res.send("pong");
})


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

