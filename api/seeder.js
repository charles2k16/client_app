const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const Client = require('./models/Client');
const Provider = require('./models/Provider');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read default JSON files
const clients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/clients.json`, 'utf-8')
);

const providers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/providers.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Client.create(clients);
    await Provider.create(providers);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Client.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
