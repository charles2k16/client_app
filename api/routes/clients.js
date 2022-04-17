const express = require('express');
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clients');

const Client = require('../models/Client');
const router = express.Router();
const getQuerryFilters = require('../middleware/getQuerryFilters');

router
  .route('/')
  .get(getQuerryFilters(Client, 'providers'), getClients)
  .post(createClient);

router.route('/:id').get(getClient).put(updateClient).delete(deleteClient);

module.exports = router;
