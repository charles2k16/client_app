const asyncHandler = require('../handlers/async');
const Provider = require('../models/Provider');
const controllerHandler = require('../handlers/controllerHandler');

// @desc      Get all providers
// @route     GET /api/v1/providers
exports.getProviders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.getQuerryFilters);
});

// @desc      Add provider
exports.addProvider = asyncHandler(async (req, res, next) => {
  const provider = await Provider.create(req.body);

  res.status(200).json({
    success: true,
    data: provider,
  });
});

// @desc      Get Provider
// @route     GET /api/v1/providers/:id
exports.getProvider = asyncHandler(async (req, res, next) => {
  const provider = await Provider.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: provider,
  });
});

// @desc      Update provider
// @route     PUT /api/v1/providers/:id
exports.updateProvider = asyncHandler(async (req, res, next) => {
  await Provider.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

// @desc      Delete provider
// @route     DELETE /api/v1/providers/:id
exports.deleteProvider = controllerHandler.deleteOne(Provider);
