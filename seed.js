/**
 * Either imports data from local file to database
 * or deletes all data from the database itself
 * 
 * To import file (specified on line 31), run: $ node seed -importData
 * To delete data from database, run: $ node seed -deleteData
 * 
 * Change flags on line 57 and 58
 */
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Load models
const Entry = require('./models/Entry');

// Connect database
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read data files
const entries = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/data_import.json`, 'utf-8')
);


// Import method
const importData = async () => {
  try {
    await Entry.create(entries);

    console.log(` Data successfully imported to database... `.green.inverse);
    process.exit();
  } catch (err) { console.error(err); }
}

// Delete method
/* This will delete ALL data from database */
const deleteData = async () => {
  try {
    await Entry.deleteMany();

    console.log(` Data successfully deleted from database... `.red.inverse);
    process.exit();
  } catch (err) { console.error(err); }
}

// 3rd terminal argument
if (process.argv[2] === '-importData') { importData(); }
else if (process.argv[2] === '-deleteData') { deleteData(); }
