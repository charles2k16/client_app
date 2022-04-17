const ErrorResponse = require('./errorResponse');
const asyncHandler = require('./async');

exports.deleteOne = Model =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new ErrorResponse(`Doc not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
    });
  });
