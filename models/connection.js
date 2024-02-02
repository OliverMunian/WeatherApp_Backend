const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://omalahel1:4LMDMJ1cbtbPRFky@cluster0.hz5hiza.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
