const express = require('express');
const app = express(); // take express library and run it
const path = require('path');
const PORT = 5000;
const cors = require('cors'); // different domain application to interact with each other

app.use(express.json()); // Get data from client side and give us access to request.body object, which let us use req.body
app.use(express.urlencoded({ extended: true }));
// app.use(cors()); // allow localhost 3000 and 5000 to interact
app.use(cors());

const userRoute = require('./routes/users');

app.use('/api/user', userRoute); //UserRoute

// Unknown route Handler
app.use((req, res) => res.status(404).send('You are in the wrong place :O'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
