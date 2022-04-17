const asyncHandler = require('../handlers/async');
const Client = require('../models/Client');
const controllerHandler = require('../handlers/controllerHandler');

// @desc      Get all clients
// @route     GET /api/v1/clients
exports.getClients = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.getQuerryFilters);
});

// @desc      Get single client
// @route     GET /api/v1/clients/:id
exports.getClient = asyncHandler(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate({
    path: 'providers',
  });

  res.status(200).json({
    success: true,
    data: client,
  });
});

// @desc      Create client
// @route     POST /api/v1/clients
exports.createClient = asyncHandler(async (req, res, next) => {
  await Client.create(req.body);

  res.status(200).json({
    success: true,
  });
});

// @desc      Update client
// @route     PUT /api/v1/clients/:id
exports.updateClient = asyncHandler(async (req, res, next) => {
  await Client.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

// @desc      Delete client
// @route     DELETE /api/v1/clients/:id
exports.deleteClient = controllerHandler.deleteOne(Client);
