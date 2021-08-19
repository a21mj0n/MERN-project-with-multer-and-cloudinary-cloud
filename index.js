const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongoDB is connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}

// // Step 1:
// app.use(express.static(path.resolve(__dirname, './client/build')));
// // Step 2:


// Route
app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server is running'));
