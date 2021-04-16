const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Loaded variables
dotenv.config({ path: './config/config.env' });

connectDB();

// Route files
const entries = require('./routes/entries');

const app = express();

// Parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') { app.use(morgan('dev')); }

app.use('/api/v1/entries', entries);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Global handler for rejected promises
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});