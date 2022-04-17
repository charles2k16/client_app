const express = require('express');
const {
  getProviders,
  addProvider,
  getProvider,
  updateProvider,
  deleteProvider,
} = require('../controllers/providers');

const Provider = require('../models/Provider');

const router = express.Router();
const getQuerryFilters = require('../middleware/getQuerryFilters');

router
  .route('/')
  .get(getQuerryFilters(Provider), getProviders)
  .post(addProvider);

router
  .route('/:id')
  .get(getProvider)
  .put(updateProvider)
  .delete(deleteProvider);

module.exports = router;
